var form_div;

window.onload = function(){
  form_div = document.getElementById("dynamic-form");
}


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

  window.onload = function(){

    $("#login-button").on("click", function(){
      $("#dynamic-div").load("login.html");
    });

    $("#signup-button").on("click", function(){
      $("#dynamic-div").load("signup.html");
    });

    $("#leader-button").on("click", function(){
      $("#dynamic-div").load("form.html");
    });

    $("#signup_trigger").on("click", function(){
      console.log("trigering");
      
    })
    


  }


