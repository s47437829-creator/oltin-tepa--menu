window.onload = function() {
  showMenu();
};

function showMenu() {
  document.getElementById("home").style.display = "none";
  document.getElementById("menu").style.display = "block";
  document.getElementById("map").style.display = "none";
}

function showMap() {
  document.getElementById("home").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("map").style.display = "block";
}

function goHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("menu").style.display = "none";
  document.getElementById("map").style.display = "none";
}


  