window.onload = function(){
var gridScale = 100;
var fullScreenGridWidth = Math.floor(window.innerWidth/gridScale);
var fullScreenGridHeight = Math.floor(window.innerHeight/gridScale);

var gridHeight = 7;
var gridWidth = 8;
var entitySize = 40;
var enemies = [];
var yarns = [];
var dogs = [];
var numberoOfEnemies = 5;

var intervalArr = [];
var grid = createGrid(gridHeight, gridWidth);

var start = false;
var pause = false;
var cat = new Entity("assets/cat.png", 0, 0)
var gameTime = 60;
overlayOn("Welcome to the Game, Press SPACE to start");
var controller = new Controller();
var score = 0;
}
