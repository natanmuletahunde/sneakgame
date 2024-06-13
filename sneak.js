const gameBoard= document.querySelector('#gameboard');
const ctx=gameBoard.getContext('2d');
const scoreText=document.querySelector('#ScoreText');
const restBtn=document.querySelector('#restbtn');
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const boardBackground='white'
const sneakColor='lightgreen';
const foodColor='red';
const sneakBoarder='black';
const unitSize=25;
let running=false;
let xVelocity=unitSize;
let yvelocity=0;
let foodX;
let foodY;
let score =0;
let sneak=[
  {x:unitSize*4,y:0},
  {x:unitSize*3,y:0},
  {x:unitSize*2,y:0},
  {x:unitSize,y:0},
  {x:0,y:0}
];
window.addEventListener('keydown',changeDirection);
restBtn.addEventListener('click',resetGame);
gameStart();
function gameStart(){
    running=true;
    scoreText.textContent=score;
    creatFood();
    drawFood();
    nextTick();


};
function nextTick(){
     if(running){
      setTimeout(()=>{
        clearBoard();
        moveSneak();
        drawFood();
        drawSneak();
        checkGmaeover();
        nextTick();
      },75)
     }
     else
     {
      displayGameover();
     }
};

function clearBoard(){
  ctx.fillStyle=boardBackground;
  ctx.fillRect(0,0,gameWidth,gameHeight);
};
function creatFood(){
function randomFood(min,max){;
        const randNum=Math.round((Math.random()*(max-min)+min) / unitSize )* unitSize;
        return randNum;
}
foodX=randomFood(0,gameWidth-unitSize);
foodY=randomFood(0,gameWidth-unitSize);
console.log(foodX)
};

function drawFood(){
  ctx.fillStyle=foodColor;
  ctx.fillRect(foodX,foodY,unitSize,unitSize);
};
 

function moveSneak(){
       const head= {
        x:sneak[0].x + xVelocity,
        y:sneak[0].y +yvelocity
       };
       sneak.unshift(head); // to expand the sneak we invoke this method
        if(sneak[0].x==foodX && sneak[0].y==foodY){
          score+=1;
          scoreText.textContent=score;
          creatFood();
        }
        else{
          sneak.pop();
        }
};
function drawSneak(){
     ctx.fillStyle=sneakColor;
     ctx.strokeStyle=sneakBoarder;
     sneak.forEach(sneaPart=>{
       ctx.fillRect(sneaPart.x,sneaPart.y,unitSize,unitSize);
       ctx.strokeRect(sneaPart.x,sneaPart.y,unitSize,unitSize);

     })

};


function changeDirection(event){
  const keyPressed=event.keyCode;
  const LEFT=37;
  const UP=38;
  const RIGHT=39;
  const DOWN=40;

  const goingup=(yvelocity==-unitSize)
  const goingDown=(yvelocity==unitSize)
  const goingRight=(xVelocity==unitSize)
  const goingLeft=(xVelocity==-unitSize)
    switch(true){
      case(keyPressed==LEFT && !goingRight):
      xVelocity=-unitSize;
      yvelocity=0;
      break;
      case(keyPressed==LEFT && !goingRight):
      xVelocity=0;
      yvelocity=-unitSize;
      break;
      case(keyPressed==UP && !goingDown):
      xVelocity=0;
      yvelocity=-unitSize;
      break;
      case(keyPressed==RIGHT && !goingLeft):
      xVelocity=unitSize;
      yvelocity=0;
      break;
      case(keyPressed==DOWN && !goingup):
      xVelocity=0;
      yvelocity=unitSize;
      break; 
    }
};

function checkGmaeover(){
  switch(true){
    case(sneak[0].x<0):
        running=false;
        break;
    case(sneak[0].x>=gameWidth):
        running=false;
        break;
    case(sneak[0].y<0):
        running=false;
        break;
    case(sneak[0].y>=gameHeight):
        running=false;
        break;

  }
  for(let i=1;i<sneak.length;i+=1){
    if(sneak[i].x==sneak[0].x  && sneak[i].y==sneak[0].y){
      running= false 
    }
  }
};

function displayGameover(){
  ctx.font='50px MV Boli';
  ctx.fillStyle='black';
  ctx.textAlign='center';
  ctx.fillText('GAME OVER!',gameWidth/2,gameHeight/2)
  running=false;
};
function resetGame(){
   score=0;
   xVelocity=unitSize;
   yvelocity= 0;
 sneak=[
  {x:unitSize*4,y:0},
  {x:unitSize*3,y:0},
  {x:unitSize*2,y:0},
  {x:unitSize,y:0},
  {x:0,y:0}
];
gameStart();
        
};










