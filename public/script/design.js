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

  }

  function post_stats(){
    var request = new XMLHttpRequest()
    request.open('GET', '/leaderboard', true);
    request.onload = function(){
      var data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
        var temp = "";
        temp += "<div id = 'table-wrapper'><table id='table-stats'>"
        temp += "<tr><th>Score </th><th>Log time</th></tr>"
        for(var i = 0; i < data.length; i++){
          temp += "<tr>"
          temp += "<td>" + data[i].score + "</td>";
          temp += "<td>" + data[i].logtime + "</td>";
          temp += "</tr>"

        }
        "</table></div>"
        document.getElementById("stats_div").innerHTML = temp;
      } else {
        document.getElementById("stats_div").innerHTML = "Error"
      }
    }
    request.send()

  }

  function getLeaderboard(){
    var request = new XMLHttpRequest()
    request.open('GET', '/leaderboardpublic', true);
    request.onload = function(){
      var data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
        var temp = "";
        temp += "<div id = 'table-wrapper'><table id='table-stats' style=''>"
        temp += "<tr><th>Score </th><th>Log time</th></tr>"
        for(var i = 0; i < data.length; i++){
          temp += "<tr>"
          temp += "<td>" + data[i].username + "</td>";
          temp += "<td>" + data[i].score + "</td>";
          temp += "</tr>"

        }
        "</table></div>"
        document.getElementById("dynamic-div").innerHTML = temp;
      } else {
        document.getElementById("dynamic-div").innerHTML = "Error"
      }
    }
    request.send()
  }




