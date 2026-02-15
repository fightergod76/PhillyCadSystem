function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function createCharacter() {
  const characters = getData("characters");

  const character = {
    id: Date.now(),
    name: document.getElementById("name").value,
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value,
    citations: [],
    warrants: [],
    arrests: [],
    vehicles: []
  };

  characters.push(character);
  saveData("characters", characters);
  alert("Character Created");
}

function searchCharacter() {
  const name = document.getElementById("searchName").value.toLowerCase();
  const characters = getData("characters");

  const result = characters.find(c => c.name.toLowerCase() === name);
  if (!result) {
    document.getElementById("results").innerHTML = "No record found.";
    return;
  }

  renderRecord(result);
}

function renderRecord(character) {
  document.getElementById("results").innerHTML = `
    <div class="card">
      <h2>${character.name}</h2>
      <p>DOB: ${character.dob}</p>
      <p>Address: ${character.address}</p>

      <h3>Citations</h3>
      ${renderList(character.citations)}

      <h3>Warrants</h3>
      ${renderList(character.warrants)}

      <h3>Arrests</h3>
      ${renderList(character.arrests)}
    </div>
  `;
}

function renderList(list) {
  if (!list || list.length === 0) return "<p>None on record.</p>";

  let html = "<ul>";
  list.forEach(item => {
    html += `<li>${item.date} - ${item.details}</li>`;
  });
  html += "</ul>";
  return html;
}

function addCitation(id) {
  const characters = getData("characters");
  const character = characters.find(c => c.id === id);
  if (!character) return;

  character.citations.push({
    date: new Date().toLocaleDateString(),
    details: document.getElementById("citationDetails").value
  });

  saveData("characters", characters);
  renderRecord(character);
}
