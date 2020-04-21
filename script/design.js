
function changeText(txt){
  document.getElementById("overlay-text").innerHTML = txt;
}

function overlayOn(txt) {
  changeText(txt)
  document.getElementById("overlay").style.display = "block";
  }

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
  }
