let inputDir = {x:0,y:0};
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let board = document.querySelector(".board");
let snakeArr = [
    {x:13,y:15}
];
food = {x:6,y:7};
// game Functions 
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime) / 1000 < 1/speed ){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
};
function iscollide(snake){
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // when you bump in to the wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
    return false;
}
function gameEngine(){
    // Update Snake And Food
   if(iscollide(snakeArr)){
    inputDir =  {x:0,y:0};
    score = 0;
    scoreBox.innerHTML = `Score :${score}`
    alert("game over press any key to play again!");
    snakeArr = [{x:13,y:15}];
   }

    
// When snake eaten the food increment score and food
 /*if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
   snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
   let a = 2;
   let b = 16;
   food = ({x:Math.round(a +(b-a)*Math.random()),y:Math.round(a +(b-a)*Math.random())})
 }*/
   if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
   snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
    let a =2;
    let b= 16;
    food = ({x:Math.round(a +(b-a)*Math.random()),y:Math.round(a +(b-a)*Math.random())});
    score +=1;
   scoreBox.innerHTML = `Score : ${score}`;
   Highscore.innerHTML = `Highscore :${score}`;
   if(score < highscoreval){
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
    Highscore.innerHTML = `Highscore :${highscoreval}`
   }
  }
 // moving the snake
 for(let i = snakeArr.length - 2;i>=0;i--){
    snakeArr[i+1] = {...snakeArr[i]}
 }
 snakeArr[0].x  +=inputDir.x;
 snakeArr[0].y  +=inputDir.y; 
    // Display snake 
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index === 0){
        snakeElement.classList.add("head");
    }
    else{
        snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement)
    });
    
    // Display food
    foodELement = document.createElement("div");
    foodELement.style.gridColumnStart = food.x;
    foodELement.style.gridRowStart = food.y;
    foodELement.classList.add("food");
    board.appendChild(foodELement);
}







// main logic start here
window.requestAnimationFrame(main);
let highscore = localStorage.getItem("highscore");
if(localStorage.getItem("highscore") === null){
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else {
    highscoreval = JSON.parse(highscore);
    Highscore.innerHTML = `HighScore :${highscoreval}`
}
window.addEventListener("keydown",(e)=>{
    inputDir = {x:0,y:1};
    switch(e.key){
        case 'ArrowUp':console.log("ArrowUp");
        inputDir.x = 0;
        inputDir.y = -1;
        break;
        case 'ArrowDown':console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
        case 'ArrowLeft':console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
        case 'ArrowRight':console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
        default:
         break;

    }
})