let gameboard = [null, null, null, null, null, null, null, null, null];
const makeGameboard = (function () {
    const changeLetter = (letter, index) => {
        if  (gameboard.at(index) === null) {
            gameboard.splice(index, 1, letter)
        }
    };

    //1 is playerX won, 2 is playerO won, 3 is a tie, 4 is game is still going
    const checkGameOver = () => {
        const winConditions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 6, 
        1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6];
        for (let i=0; i<winConditions.length; i+=3) {
            if(gameboard.at(winConditions[i]) == "X" && 
            gameboard.at(winConditions[i+1]) == "X" && 
            gameboard.at(winConditions[i+2]) == "X"){
                return 1;
            }
        }
        for (let i=0; i<winConditions.length; i+=3) {
            if(gameboard.at(winConditions[i]) == "O" && 
            gameboard.at(winConditions[i+1]) == "O" && 
            gameboard.at(winConditions[i+2]) == "O"){
                return 2;
            }
        } if (!gameboard.includes(null)) {
            return 3;
        } else {
            return 4;
        }
    }
    return {changeLetter, checkGameOver};
})();

const displayController = () => {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i<squares.length; i++) {
        squares[i].textContent = gameboard[i];
    }
};

let selectedSquare = null;
const selectSquare = (() => {
    const squares = document.querySelectorAll(".square");
    const p = document.querySelector(".info");
    const score = document.querySelector(".score");
    let scoreX = 0;
    let scoreY = 0;
    for (let i = 0; i<squares.length; i++) {
        squares[i].addEventListener("click", () => {
            selectedSquare = i;
            makeGameContoller.playGame();
            if (makeGameboard.checkGameOver() == 1) {
                p.textContent = "Player X, You Won!";
                scoreX++;
                score.textContent = `X: ${scoreX} O: ${scoreY}`;
            }  else if (makeGameboard.checkGameOver() == 2) {
                p.textContent = "Player O, You Won!";
                scoreY++;
                score.textContent = `X: ${scoreX} O: ${scoreY}`;
            } else if (makeGameboard.checkGameOver() == 3) {
                p.textContent = "You Tied!";
            }
        });
    }
})(); 

const makeGameContoller = (() => {
    function makePlayer(letter) {
        return {letter};
    }

    const playerX = makePlayer("X");
    const playerO = makePlayer("O");
    let turnCounter = 1;

    //RESET DOESNT WORK GODDAMIT
    const reset = document.querySelector(".reset");
    reset.addEventListener("click", () => {
        gameboard = [null, null, null, null, null, null, null, null, null];
        displayController();
        turnCounter = 1;
    });

    //1 is playerX won, 2 is playerO won, 3 is a tie, 4 is game is still going
    const playGame = () => {
        const p = document.querySelector(".info");
        p.textContent = "";
        if (makeGameboard.checkGameOver() == 4) {
            let currentPlayer;
            if (turnCounter % 2 == 0) {
                currentPlayer = playerO;
            } else { 
                currentPlayer = playerX;
            }
            if (gameboard[selectedSquare] == null) {
                makeGameboard.changeLetter(currentPlayer.letter, selectedSquare);
                turnCounter++;
                displayController();
            } else { 
                p.textContent = "Pick an Empty Space!"
            }
        }
    }

    return {playGame};
})();