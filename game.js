function init(player, OPPONENT){
    
    const canvas = document.getElementById("cvs");
    const ctx = canvas.getContext("2d");

    
    let board = [];
    const COLUMN = 3;
    const ROW = 3;
    const SPACE_SIZE = 150;

    let playerWinConut = {
        man:1,
        player2:1
    }
 

    let gameData = new Array(9);
    
    let secPlayer = player.two
    
    let currentPlayer = player.man;

    
    const xImage = new Image();
    xImage.src = './img/x-image.png';
    
    const oImage = new Image();
    oImage.src ='./img/o-image.png';




    const hangmanI1 = new Image();
    hangmanI1.src ='./img-hang/1.png'
    
    const hangmanI2 = new Image();
    hangmanI2.src ='./img-hang/2.png'
    
    const hangmanI3 = new Image();
    hangmanI3.src ='./img-hang/3.png'
    
    const hangmanI4 = new Image();
    hangmanI4.src ='./img-hang/4.png'
    
    const hangmanI5 = new Image();
    hangmanI5.src ='./img-hang/5.png'
    
    const hangmanI6 = new Image();
    hangmanI6.src ='./img-hang/6.png'
    


    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    
    let GAME_OVER = false;
 

    function scoreUpdate(score){
        player1Score.innerHTML = `<image src="./img-hang/${playerWinConut.man}.png"></image>`
        player2Score.innerHTML = `<image src="./img-hang/${playerWinConut.player2}.png"></image>`
    }
    
    
    function drawBoard(){
     
        let id = 0
        for(let i = 0; i < ROW; i++){
            board[i] = [];
            for(let j = 0; j < COLUMN; j++){
                board[i][j] = id;
                id++;

                
                ctx.strokeStyle = "#000";
                ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
            }
        }
    }
    drawBoard();

   
    canvas.addEventListener("click", function(event){
        
        
        
        if(GAME_OVER) return;

        
        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;

        let i = Math.floor(Y/SPACE_SIZE, SPACE_SIZE,);
        let j = Math.floor(X/SPACE_SIZE, SPACE_SIZE,);

      
        let id = board[i][j];

       
        if(gameData[id]) return;


        gameData[id] = currentPlayer;
        
       
        drawOnBoard(currentPlayer, i, j);

       
        if(isWinner(gameData, currentPlayer)){
            if(currentPlayer === player.man)playerWinConut.man++
            else playerWinConut.player2++
            
            if(playerWinConut.man <= 6 && playerWinConut.player2 <= 6){
                gameData = new Array(9);
                board=[]
                ctx.clearRect(0,0,canvas.clientWidth,canvas.height)
                drawBoard();
                setTimeout(()=>{

                    scoreUpdate(playerWinConut)
                },100)
                return;
            } 
             showGameOver(currentPlayer);
                GAME_OVER = true;
            
            
        }
        


    
    // if(isWinner(gameData, currentPlayer)){
    //     if(currentPlayer === player.two)playerWinConut.player2++
    //     else playerWinConut.player.man++

    //     if(playerWinConut.player2 <= 6){
    //         gameData = new Array(9);
    //         board=[]
    //         ctx.clearRect(0,0,canvas.clientWidth,canvas.height)
    //         drawBoard();
    //         setTimeout(()=>{

    //             scoreUpdate(playerWinConut)
    //         },100)
    //         return ;
    //     }
    //     showGameOver(currentPlayer);
    // //     GAME_OVER = true;
        
    // }

        if(isTie(gameData)){
            if(playerWinConut.man <= 6){
                gameData = new Array(9);
                board=[]
                ctx.clearRect(0,0,canvas.clientWidth,canvas.height)
                drawBoard();
                setTimeout(()=>{
                    scoreUpdate(playerWinConut)
                },100)
                return ;
            }
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }

        if( OPPONENT == "computer"){
      
            let id = minimax( gameData, player.computer ).id;
            gameData[id] = player.computer;
        
            let space = getIJ(id);

          
            drawOnBoard(player.computer, space.i, space.j);

           
            if(isWinner(gameData, player.computer)){
                showGameOver(player.computer);
                GAME_OVER = true;
                return;
            }

         
            if(isTie(gameData)){
                showGameOver("tie");
                GAME_OVER = true;
                return;
            }
        }else{
       
            currentPlayer = currentPlayer == player.man ? player.player2 : player.man;
        }

    });


    function minimax(gameData, PLAYER){
        
        if( isWinner(gameData, player.computer) ) return { evaluation : +10 };
        if( isWinner(gameData, player.man, player.player2)      ) return { evaluation : -10 };
       
        if( isTie(gameData)                     ) return { evaluation : 0 };

        
        let EMPTY_SPACES = getEmptySpaces(gameData);

        
        let moves = [];

       
        for( let i = 0; i < EMPTY_SPACES.length; i++){
    
            let id = EMPTY_SPACES[i];

           
            let backup = gameData[id];

            gameData[id] = PLAYER;

            let move = {};
            move.id = id;
            if( PLAYER == player.computer){
                move.evaluation = minimax(gameData, player.man).evaluation;
    
            }else{
                move.evaluation = minimax(gameData, player.computer).evaluation;
            }

           
            gameData[id] = backup;

           
            moves.push(move);
        }

      
        let bestMove;

        if(PLAYER == player.computer){
           
            let bestEvaluation = -Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation > bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }else{
           
            let bestEvaluation = +Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation < bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }

        return bestMove;
    }

    function getEmptySpaces(gameData){
        let EMPTY = [];

        for( let id = 0; id < gameData.length; id++){
            if(!gameData[id]) EMPTY.push(id);
        }

        return EMPTY;
    }

    function getIJ(id){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                if(board[i][j] == id) return { i : i, j : j}
            }
        }
    }


    function isWinner(gameData, player){
        
        for(let i = 0; i < COMBOS.length; i++){
            let won = true;

            for(let j = 0; j < COMBOS[i].length; j++){
                let id = COMBOS[i][j];
                won = gameData[id] == player && won;
            }

            if(won){
                return true;
            }
        }
        return false;

    }

    function isTie(gameData){
        let isBoardFill = true;
        for(let i = 0; i < gameData.length; i++){
            isBoardFill = gameData[i] && isBoardFill;
        }
        if(isBoardFill){
            return true;
        }
        return false;
    }


    function showGameOver(player){
        let message = player == "tie" ? "Oops No Winner" : "The Winner is";
        let imgSrc = `./img/${player}-image.png`;

        gameOverElement.innerHTML = `
            <h1>${message}</1>
            <img class="winner-img" src=${imgSrc} </img>
            <div class="play" onclick="location.reload()">Play Again!</div>
        `;

        gameOverElement.classList.remove("hide");
    }

    
    function drawOnBoard(player, i, j){
        let img = player == "X" ? xImage : oImage;

       
        ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
    }
}