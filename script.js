


const script = document.querySelector(".options");

const gameOverElement = document.querySelector(".gameover")

const computerBtn = document.querySelector(".computer");

const player2Btn = document.querySelector(".player2");

const playBtn = document.querySelector(".play");

const xBtn = document.querySelector(".X");

const oBtn = document.querySelector(".O")

const player1hangman = document.querySelector("#player-1-hangman")
const player2hangman = document.querySelector("#player-2-hangman")

const player1Score = document.querySelector(".container1")
const player2Score = document.querySelector(".container3")


const player = new Object;
let OPPONENT;

oBtn.addEventListener("click", function(){
    player.man = "O";
    player.computer = "X";
    player.player2 = "X";

    switchActive(xBtn, oBtn);
});

xBtn.addEventListener("click", function(){
    player.man = "X";
    player.computer = "O";
    player.player2 = "O";

    switchActive(oBtn, xBtn);
});
 
computerBtn.addEventListener("click", function(){
    OPPONENT = "computer";
    switchActive(player2Btn, computerBtn);
});

player2Btn.addEventListener("click", function(){
    OPPONENT = "player2";
    switchActive(computerBtn, player2Btn);
});

playBtn.addEventListener("click", function(){
    if( !OPPONENT){
        computerBtn.style.backgroundColor = "red";
        player2Btn.style.backgroundColor = "red";
        return;
    }

    if( !player ){
        oBtn.style.backgroundColor = "red";
        xBtn.style.backgroundColor = "red";
        return;
    }
    
    init(player, OPPONENT);
    script.classList.add("hide");
});

function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}