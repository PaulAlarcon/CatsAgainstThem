window.onload = function(){
  
  var player_name = getPlayerName();

  class Entity{
    constructor(url, x, y){
    this.url = url;
    this.x = x;
    this.y = y;
    addimage(this.url, this.x, this.y)
  }

  move(x, y){
    if(this === cat){
      this.collide(x, y)
      this.animate(x, y);
      return true;
    }
    else if(!willCollide(x, y)){
      this.animate(x, y);
      return true;
    }
    return false;
  }

  animate(x, y) {
    var img = grid.rows[this.y].cells[this.x].childNodes[0];
    $(img).css("left", img.x).css("top", img.y);
    var newX = x == this.x ? x : x > this.x ? x + 100 : x - 100;
    var newY = y == this.y ? y : y > this.y ? y + 100 : y - 100;

    var oldX = x == this.x ? x : x > this.x ? x - 100 : x + 100;
    var oldY = y == this.y ? y : y > this.y ? y - 100 : y + 100;
    $(img).css("left", oldX).css("top", oldY);
    $(img).animate({
      top: y,
      left: x
    })

    grid.rows[this.y].cells[this.x].innerHTML = ""; //cleans the one where we moving
    this.y = y;
    this.x = x;
    addimage(this.url, this.x, this.y);
  }

  movedown(){
    if(this.y + 1 < gridHeight)
      this.move(this.x, this.y + 1)
  }

  moveup(){
    if(this.y - 1 >= 0)
      this.move(this.x, this.y - 1)
  }

  moveright(){
    if(this.x + 1 < gridWidth)
      this.move(this.x + 1, this.y)
  }

  moveleft(){
    if(this.x - 1 >= 0)
      this.move(this.x - 1, this.y)
  }

  collide(x, y){
    if(removeMouse(findArray(x, y, enemies))){
      updateScore("+", 50);
    }
    else if(removeEnemy(findArray(x, y, yarns), yarns)){
      updateScore("+", 100);
    }

    else if(removeEnemy(findArray(x, y, dogs), dogs)){
      updateScore("-", 50);
    }
  }
}

  class Controller{
  constructor(){
    this.keyListener = (event) => {
        var key_state = (event.type == "keyup")?true:false;
        switch (event.keyCode) {
          case 37:
          if(gameIsRunning)
            cat.moveleft();
            break;
          case 38:
          if(gameIsRunning)
            cat.moveup();
            break;
          case 39:
          if(gameIsRunning)
            cat.moveright();
            break;
          case 40:
          if(gameIsRunning)
            cat.movedown();
          break;
          case 32:
          if(!start){
            start = true;
            gameIsRunning = true;
            startGame();
          }
          break;
          // case 82:
            // if(!game)
            // gameIsRunning = true;
            // console.log(grid.children);
            
          // break;
        }
    }
    window.addEventListener("keyup", () => {this.keyListener(event)})
  }
  }

  var gridScale = 60;
  var gridHeight = 10;
  var gridWidth = 10;
  var entitySize = 30;
  var numberoOfEnemies = 5;
  var enemies;
  var yarns;
  var dogs;
  var intervalArr;

  var maxyarns = 3;
  var maxdogs = 3;
  var maxmice = 10;

  var numberoOfEnemies;

  var grid = createGrid(gridHeight, gridWidth);
  overlayOn("Welcome to CATS AGAINST THEM! " + player_name + "<br>Press SPACE to start ");

  var start;
  var gameIsRunning;

  var cat;
  var gameTime;
  var controller = new Controller();
  var score;
  var spawnYarnsInterval;
  var spawnDogsInterval;
  var spawnMouseInterval;


  var level = 1;
  

  
  function setUp(){
    enemies = [];
    yarns = [];
    dogs = [];
    intervalArr = [];
    cat = new Entity("assets/cat.png", 0, 0)
    gameTime = 20;
    score = 0;
    addEnemies(numberoOfEnemies);
    spawnMouseInterval = setInterval(spawnMouseRandomly, randomInterval(3000, 1000))
    spawnYarnsInterval = setInterval(spawnYarnsRandomly, randomInterval(3000, 1000));
    spawnDogsInterval = setInterval(spawnDogsRandomly, randomInterval(3000, 1000))
    start_timer(gameTime);
  }

  function restart(){
    enemies = [];
    yarns = [];
    dogs = [];
    controller = new Controller();
    gameTime = 20;
    score = 0;
    cat = new Entity("assets/cat.png", 0, 0)
    addEnemies(numberoOfEnemies);
    spawnRandomlyInterval = setInterval(spawnRandomly, 5000);
    start_timer(gameTime);
  }

  function removeAllEnemies(){
    for(var i=0; i < enemies.length; i++){
      removeMouse(i);
    }
    for(var i=0; i < dogs.length; i++){
      removeEnemy(i, dogs);
    }
    for(var i=0; i < yarns.length; i++){
      removeEnemy(i, yarns)
    }
  }

  function spawnYarnsRandomly(){
    if(yarns.length < maxyarns)
      spawn("assets/yarn.png", Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight), yarns);
  }

  function spawnDogsRandomly(){
    if(dogs.length < maxdogs)
      spawn("assets/dog.png", Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight), dogs);
  }

  function spawnMouseRandomly(){
    if(enemies.length < maxmice )
      spawnMouse(Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight));
  }

  function spawnMouse(x, y){
    if(!willCollide(x,y)){
      var i = enemies.push(new Entity("assets/mice.png", x, y)) - 1;
      intervalArr.push(setTimeout(walkAround(i), randomInterval(500, 500)));
    }
  }

  function spawn(img_url, x, y, arr){
    if(!willCollide(x,y)){
      arr.push(new Entity(img_url, x, y));
    }
  }

  function startGame(player_name){
      overlayOff();
      setUp();
  }

  function updateScore(op, num){
    if(op == "+") score+= num;
    else score -= num;

    document.getElementById("player_score").innerHTML=score;
  }

  function endGame(){
    clearInterval(spawnMouseInterval);
    clearInterval(spawnDogsInterval);
    clearInterval(spawnYarnsInterval);
    for(var i = 0; i < enemies.length; i++){
      clearInterval(intervalArr[i]); 
    }

    grid.rows[cat.y].cells[cat.x].innerHTML = ""; //cleans the one where we moving
    cat = undefined;

    removeAllEnemies();
    gameIsRunning = false;
    start = false;
    overlayOn("You got a total of : " + score + " points." + "<br>" +
              "Press SPACE to START AGAIN"
    );

  }

  function start_timer(sec){
    var sec = sec;
    var timer = setInterval(function(){
        var time;
        if(sec < 10)
          time = '00:0'+sec;
        else
          time = '00:'+sec;

        document.getElementById("timer").innerHTML= time;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            endGame();
        }

    }, 1000);
  }


  function removeEnemy(index, arr){
    if(arr[index] != undefined){
      grid.rows[arr[index].y].cells[arr[index].x].innerHTML = ""; //cleans the one where we moving
      arr[index] = undefined;
      return true;
    }
    return false;
  }

  function removeMouse(index){
    if(enemies[index] != undefined){
      grid.rows[enemies[index].y].cells[enemies[index].x].innerHTML = ""; //cleans the one where we moving
      enemies[index] = undefined;
      clearInterval(intervalArr[index]);
      return true;
    }
    return false;
  }

  function findArray(x, y, arr){
    var index = undefined;
    for(var i = 0; i < arr.length; i++){
        if(arr[i] != undefined){
          if(arr[i].x == x && arr[i].y == y){
            index = i;
          }
        }
    }
    return index;
  }

  function addEnemies(num){
    for(var i = 1; i < num + 1 ; i++){
      spawnMouse(Math.floor(Math.random() * gridWidth), Math.floor(Math.random() * gridHeight));
    }
  }


//AI FUNCTIONS

  function walkAround(i){

    if (enemies[i] == undefined) return;
    var random = Math.floor(Math.random() * 5 )

    if(random == 0){
      enemies[i].moveleft();
    }
    else if(random == 1){
      enemies[i].moveright();
    }
    else if(random == 2){
      enemies[i].movedown();
    }

    else if(random = 3){
      enemies[i].moveup();
    }

    intervalArr[i] = setTimeout((function(){walkAround(i)}).bind(i), randomInterval(500, 500))
  }

  function moveEnemies(i){
    for(var i = 0; i < enemies.length; i++){
      intervalArr.push(setTimeout(walkAround(i), randomInterval(500, 500)));
    }
  }

//GRID FUNCTIONS

  function createGrid(numx, numy){
    var table = document.createElement("TABLE");
    table.setAttribute("id", "game-grid");
    document.getElementById("content").appendChild(table);
    for(var x = 0; x < numx; x++){
      var row = document.createElement("TR");
      row.setAttribute("id", "row_"+x);
      document.getElementById("game-grid").appendChild(row);

      for(var y =0; y < numy; y++){
        var column = document.createElement("TD");
        column.style.background = "orange";
        column.style.height = gridScale+'px';
        column.style.width  = gridScale+'px';
        document.getElementById("row_"+x).appendChild(column);
      }
    }
    return table;
  }

  function willCollide(x, y){
    return nextCellLength(x,y) != 0
  }

  function nextCellLength(x, y){
    return grid.rows[y].cells[x].childNodes.length > 0
  }

// GRAPHIC FUNCTIONS
  function addimage(url, x, y){
    var div = document.createElement('div');
    div.setAttribute('id', 'img-wrapper');
    var img = document.createElement('img');
    img.src = url;
    img.width = entitySize;
    // img.height = 50;
    div.appendChild(img);
    grid.rows[y].cells[x].appendChild(div);
  }

  function randomInterval(max, min){
    return Math.random() * max + min;
  }

}

//implement Hole and then change position and numbers acc to level
//@media to change according it 

//logged in - one
//boolean loggedin 
//log in - two   ->> stop it, already logged in  
