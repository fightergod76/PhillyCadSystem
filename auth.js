function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const code = document.getElementById("officerCode").value;

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  let role = "civilian";
  if (code === "PhillyRPV3Police") {
    role = "officer";
  }

  const user = { username, password, role };

  localStorage.setItem("user_" + username, JSON.stringify(user));
  alert("Registered");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const stored = localStorage.getItem("user_" + username);
  if (!stored) return alert("User not found");

  const user = JSON.parse(stored);
  if (user.password !== password) return alert("Wrong password");

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

function requireOfficer() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== "officer") {
    alert("Access Denied");
    window.location.href = "dashboard.html";
  }
}
