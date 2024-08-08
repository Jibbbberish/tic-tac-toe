const makeGameboard = (function () {
    let gameboard = [null, null, null, null, null, null, null, null, null];
    
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
    return {changeLetter, checkGameOver, gameboard};
})();

const displayController = () => {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i<squares.length; i++) {
        squares[i].textContent = makeGameboard.gameboard[i];
    }
};

let selectedSquare = null;
const selectSquare = (() => {
    const squares = document.querySelectorAll(".square");
    const p = document.querySelector("p");
    for (let i = 0; i<squares.length; i++) {
        squares[i].addEventListener("click", () => {
            selectedSquare = i;
            makeGameContoller.playGame();
            if (makeGameboard.checkGameOver() == 1) {
                p.textContent = "Player X, You Won!";
            }  else if (makeGameboard.checkGameOver() == 2) {
                p.textContent = "Player O, You Won!";
            } else if (makeGameboard.checkGameOver() == 3) {
                p.textContent = "You Tied!";
            }
        });
    }
})(); 

const makeGameContoller = (() => {
    function makePlayer(letter) {
        let score = 0;
        const addScore = () => score++;
        return {letter, score, addScore};
    }

    const playerX = makePlayer("X");
    const playerO = makePlayer("O");
    let turnCounter = 1;

    //1 is playerX won, 2 is playerO won, 3 is a tie, 4 is game is still going
    const playGame = () => {
        if (makeGameboard.checkGameOver() == 1) {
            playerX.addScore();
        }  else if (makeGameboard.checkGameOver() == 2) {
            playerO.addScore();
        }
        if (makeGameboard.checkGameOver() == 4) {
            let currentPlayer;
            if (turnCounter % 2 == 0) {
                currentPlayer = playerO;
            } else { 
                currentPlayer = playerX;
            }
            if (makeGameboard.gameboard[selectedSquare] == null) {
                makeGameboard.changeLetter(currentPlayer.letter, selectedSquare);
                turnCounter++;
                displayController();
            } else {
                alert("Pick an empty space!");
            }
        }
    }

    return {playGame};
})();