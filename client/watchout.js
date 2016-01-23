// start slingin' some d3 here.

var height = 850;
var width = 850;
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
//ok to pass in make enemies
//creates circle enmies with a class of enemy
// Update
  var enemyData = makeEnemies(10);
   var enemies = gameBoard.selectAll("circle.enemy").data(enemyData);  
// // Enter
//   enemies.enter().append('svg:circle')
//                  .attr('cx', function(enemy) { return enemy.x; })
//                     .attr('cy', function(enemy) { return enemy.y; })
//                      .attr('r', 10); 
//  enemies.exit().remove();

  
 var enemyData = makeEnemies(10);
  var update = function(data){
    
    var enemies = gameBoard.selectAll("circle.enemy").data(enemyData);  

    enemies.enter().insert('svg:circle').attr('cx', function(enemy) { return enemy.x; })
                    .attr('cy', function(enemy) { return enemy.y; })
                    .attr('r', 10); 
    enemies.exit().remove();

};
// update();
// update();
setInterval(function(){
  
  update(enemies.transition().duration(500).attr('cx', function(enemy) { return enemy.x; })
                                          .attr('cy', function(enemy) { return enemy.y; }));
}, 1000);

// factory method passed to tween
var newCoordinates = function (currentData){
  var enemy = d3.select(this);
   var startPos = {    
   x : parseFloat(enemy.attr("cx")),
   y : parseFloat(enemy.attr("cy")) 
  };

  return function(t) { 
  var newX = startPos.x + (currentData.x - startPos.x) * t;
  var newY = startPos.y + (currentData.y - startPos.y) * t;

    return enemy.attr("cx", newX).attr("cy", newY);
  };


};

//create player
var Player = function () {
  var score = 0;
  var highScore = 0;
  var position = [];
};

Player.prototype.


//create methods update score board and game
checkForCollisions = function() {
  
};


//create function that organizes play



//run function to start game