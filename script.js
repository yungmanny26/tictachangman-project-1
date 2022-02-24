const script = document.querySelector(".options");

const computerBtn = document.querySelector(".computer");

const player2Btn = document.querySelector(".player2");

const playBtn = document.querySelector(".play");

const xBtn = document.querySelector(".X");

const oBtn = document.querySelector(".O")


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
        computerBtn.style.backgroundColor = "black";
        player2Btn.style.backgroundColor = "black";
        return;
    }

    if( !player ){
        oBtn.style.backgroundColor = "black";
        xBtn.style.backgroundColor = "black";
        return;
    }
    
    init(player, OPPONENT);
    script.classList.add("hide");
});

function switchActive(off, on){
    off.classList.remove("active");
    on.classList.add("active");
}