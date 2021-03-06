// start slingin' some d3 here.

var height = 850;
var width = 850;

var enemyR = 15;
var playerR = 10;

var numEnemies = 30;

var ScoreKeeper = function () {
  this.highScore = 0;
  this.score = 0;
  this.collision = 0;

};

var collided;

ScoreKeeper.prototype.currentScore = function() {
  this.score++;
  this.highScoreUpdate();
  d3.selectAll('.current').text(this.score);
};

ScoreKeeper.prototype.collisionUpdate = function() {
  this.score = 0;
  this.collision++;
  d3.selectAll('.collisions').text(this.collision);
};

ScoreKeeper.prototype.highScoreUpdate = function() {
  if(this.score > this.highScore){
    this.highScore = this.score;
    d3.selectAll('.high').text(this.score);
  }
};

var scoreBoard = new ScoreKeeper();

// Create board
var gameBoard = d3.select("body").append("svg:svg").attr("width", width).attr("height", height);
gameBoard.transition().style("color", "red");

//Creating enemies
var xScale = d3.scale.linear().domain([0,1]).range([0, width]);
var yScale = d3.scale.linear().domain([0,1]).range([0, height]);

var makeEnemies = function(number){
  //array of coordinates
  var coordArr = [];
  for(var i = 0; i < number; i++){
    var x = xScale(Math.random());
    var y = yScale(Math.random());
    var id = i;
    coordArr.push({x:x, y:y, id:id});
  }
  return coordArr;
}; 
 
// To be passed into tween
var collisionDetector = function () {
  //know current position of enemy
  var enemy = d3.select(this);
  //know current position of player
  //calculate if there's a collision
  return function() {
    var currentX = enemy.attr('cx');
    var currentY = enemy.attr('cy');
    var playerX = player.attr('cx');
    var playerY = player.attr('cy');
    // Distance formula
    var distance = Math.pow((playerX - currentX), 2) + Math.pow((playerY - currentY), 2);
    var finalDistance = Math.sqrt(distance);
    // Check if there's a collision 
    // distance between player and enemy less than sum of their radii
    if( finalDistance < (playerR + enemyR) && !collided){
      // change the score
      scoreBoard.collisionUpdate();
      collided = true;
    } else {
      scoreBoard.currentScore();
    }
  };
};



var update = function(element){
    collided = false;
    var enemyData = makeEnemies(numEnemies);
    var enemies = gameBoard.selectAll("circle.enemy").data(enemyData);  
    enemies.enter().append('svg:circle').attr("class", "enemy");
    enemies.transition().duration(1000).tween("collisions", collisionDetector).attr('cx', function(enemy) { return enemy.x; })
                    .attr('cy', function(enemy) { return enemy.y; })
                    .attr('r', enemyR)
                    .each("end", function(){update(d3.select(this));}); 


};


// Makes the enemies move on a set interval
// setInterval(function(){
//   collided = false;
//   update();
// }, 1000);


// Drag functionality

var drag = d3.behavior.drag()
           .on("dragstart", function(){})
           .on("drag", function() {player.attr("cx", d3.event.x).attr("cy", d3.event.y)})
           .on("dragend", function(){});


var player = gameBoard.selectAll("player")
             .data([{x: xScale(0.5), y: yScale(0.5), r: playerR}])
             .enter()
             .append("svg:circle")
             .attr("class", "player")
             .attr("cx", function(d){return d.x})
             .attr("cy", function(d) {return d.y})
             .attr("r", function(d) {return d.r})
             .call(drag)
             .attr("fill", "red");



update();

// factory method passed to tween
// var newCoordinates = function (currentData){
//   var enemy = d3.select(this);
//    var startPos = {    
//    x : parseFloat(enemy.attr("cx")),
//    y : parseFloat(enemy.attr("cy")) 
//   };

//   return function(t) { 
//   var newX = startPos.x + (currentData.x - startPos.x) * t;
//   var newY = startPos.y + (currentData.y - startPos.y) * t;

//     return enemy.attr("cx", newX).attr("cy", newY);
//   };

//create player
// var Player = function () {
//   var score = 0;
//   var highScore = 0;
//   var position = [];
// };

// Player.prototype.





//create function that organizes play



//run function to start game

