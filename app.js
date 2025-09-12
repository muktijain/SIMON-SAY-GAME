let gameSeq = [];
let userSeq = [];
let highScore = localStorage.getItem("highScore") || 0;
let btns = ["yellow","red","purple","pink"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
    console.log("GAME STARTED !!");
    started = true;
    
    levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random btn choose
    let ranIdx = Math.floor(Math.random() * 4);
    let rancolor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${rancolor}`);
    
    gameSeq.push(rancolor);
    console.log(gameSeq);
    gameFlash(ranBtn);
}

function checkAns(idx){
let msg = `GAME OVER! Your score was <b>${level}</b>.`
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        if(level > highScore){
            highScore = level;
            localStorage.getItem("highScore" , highScore);
            msg += `</br>You made a <b>new high Score!</b> CONGRATULATIONS!`
        }
        msg += `</br>(enter any key,if you want to restart)`;
        h2.innerHTML = msg;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPressed(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPressed);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}