
document.querySelector('#start-button').onclick= function(){//start button clicked
  this.remove()                                             //removes start button
  startGame()                                               //calls startGame
  startLines()
  createObstacle()
  
}

//Declare constants and variables
const canvas = document.querySelector('#canvas'); //get canvas
var img = new Image();                            //load image
canvas.width = window.innerWidth/2.5;             //set canvas width and height
canvas.height = 700
const ctx = canvas.getContext('2d');              //get context **must*

let car = {                                       //car object also can be converted to a class
  x:canvas.width/2,
  y:canvas.height*3/4,  
  width: 50,
  height: 80
}

document.querySelector('#start-button').click()
//Start Game
function startGame(){
  // console.log("START")
  drawBoard()                                             //calls to drawboard
  img.src= "./images/car.png";
  img.onload = function(){                                  //load the car 
    ctx.drawImage(img, car.x,car.y,car.width,car.height)
  }
  // img.onload = drawCar()                                 //does same as above by calling on drawCar function
  window.requestAnimationFrame(animate)                     //starts animation infinite loop
}

//Draw the road
function drawBoard(){
  // console.log("draw board")
  ctx.fillStyle ="green"
  ctx.fillRect(0,0,canvas.width,canvas.height)          //draws grass first
                                                        //order matters since it will over write and lay the road over the area of the grass if location of x and y is the same
  ctx.fillStyle="grey"
  ctx.fillRect(100,0,canvas.width-200,canvas.height)    //draws road second

  ctx.fillStyle="white"
  ctx.fillRect(110,0,15,canvas.height)
  
  ctx.fillStyle="white"
  ctx.fillRect(canvas.width-130,0,15,canvas.height)
}
//Draw the car
function drawCar(){
  ctx.drawImage(img, car.x,car.y,car.width,car.height)  //draws the car depending on the coords in the obj above
 }

 let loop
//Will keep the animation in loop to conutinuously redraw else car does not move even those position does in console


let frameId;
// let scoreboard = document.querySelector('#score')
// let score=0

function animate(){
  // loop= window.requestAnimationFrame(animate)   //continues the loop
  // score++
  // scoreboard.innertext = score;
  frameId=window.requestAnimationFrame(animate)
  ctx.clearRect(0,0,canvas.width,canvas.height)     //clears the whole canvas
  drawBoard()
  drawLine()
  drawObstacle()                                       //redraws
  drawCar() 
  checkGameOver()                                        //redraws
}

//Sets the keys to function to move the car
document.onkeydown = function(e){             //controls up down right and left 
  // console.log(car.y, e.keyCode)
  switch (e.keyCode) {                        //changes the car object
    // case 38: if(car.y>10){                    //changes to go up and down
    //           car.y-=10;
    //           function moveCar()
    //           }else{
    //           car.y=0
    //           } 
              
    //   break;
    // case 40: if(car.y<(canvas.height-80)){
    //           car.y += 10;
    //           }else{
    //             car.y=canvas.height-80};
    //   break;

    case 37: if(car.x>110){                      //change left
              car.x= car.x-10;
              }else{
              car.x=100;
              }
              break;

    case 39: if(car.x<(canvas.width-150)){
              car.x += 10;
              }else{
              car.x=canvas.width-150};           //changes x right
              break;
  }
}

let lines = []

function drawLine(){
  ctx.fillStyle="white"
  lines.forEach(line=>{
  ctx.fillRect(line.x,line.y+=2,line.width,line.height)
  })
};


function startLines(){
  setInterval(()=>{
    let line = {
      x:(canvas.width/2)-5,
      y:0,
      width:10,
      height:canvas.height/20,
    };
    lines.push(line)
  },500)
};

var obstacles=[]


function drawObstacle(){
  ctx.fillStyle="orange"
  // console.log(obstacles)
  obstacles.forEach(obstacle=>{
    ctx.fillRect(obstacle.x,obstacle.y++,obstacle.width,obstacle.height)
  })
};


function createObstacle(){

 setInterval(()=>{
    var blockWidth= canvas.width-230;
    var maxWidth = 300;
    var minWidth = 50;
    var widthOfObstacle = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
    let startingInterval= Math.floor(Math.random()*(((blockWidth-widthOfObstacle)/50)+1))
    let obstacleBlock = {
      x: 110+(startingInterval*50),
      y: 0,
      width: widthOfObstacle,
      height:25,
    };
    obstacles.push(obstacleBlock)
  }, 2000)
};

function crashWith(obstacle){
  return !(
        car.x > obstacle.x+obstacle.width ||
        car.y > obstacle.y+obstacle.height ||
        car.x+car.width < obstacle.x ||
        car.y+car.height < obstacle.y
      );
}
function checkGameOver() {
  var crashed = obstacles.some(function(obstacle) {
    return crashWith(obstacle);
  });
  if (crashed) {
      window.cancelAnimationFrame(frameId)
  } 
}


//upon page load animates canvas, but without it canvas will not load until start button clicked

window.requestAnimationFrame(animate)


