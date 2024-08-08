const makeGameboard = (function () {
    let gameboard = [null, null, null, null, null, null, null, null, null];
    
    const changeLetter = (letter, index) => {
        if  (gameboard.at(index) === null) {
            gameboard.splice(index, 1, letter)
        }
        //add an else in case there's already a letter there
    };

    //1 is playerX won, 2 is playerO won, 3 is a tie, 4 is game is still going
    const checkGameOver = () => {
        const winConditions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 6, 
        1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6];
        for (let i=0; i<winConditions.length; i+=3) {
            if(gameboard.at(winConditions[i]) == "x" && 
            gameboard.at(winConditions[i+1]) == "x" && 
            gameboard.at(winConditions[i+2]) == "x"){
                return 1;
            }
        }
        for (let i=0; i<winConditions.length; i+=3) {
            if(gameboard.at(winConditions[i]) == "o" && 
            gameboard.at(winConditions[i+1]) == "o" && 
            gameboard.at(winConditions[i+2]) == "o"){
                return 2;
            }
        } if (!gameboard.includes(null)) {
            return 3;
        } else {
            return 4;
        }
    }
    
    //add display functions using DOM manip later here

    return {changeLetter, checkGameOver, gameboard};
})();

const makeGameContoller = (function () {
    function makePlayer(letter) {
        let score = 0;
        const addScore = () => score++;
        return {letter, score, addScore};
    }

    const playerX = makePlayer("x");
    const playerO = makePlayer("o");
    let turnCounter = 1;

    //1 is playerX won, 2 is playerO won, 3 is a tie, 4 is game is still going
    const playGame = () => {
        if (makeGameboard.checkGameOver() == 1) {
            playerX.addScore();
            alert("Player X, you won!");
        }  else if (makeGameboard.checkGameOver() == 2) {
            playerO.addScore();
            alert("Player O, you won!");
        } else if (makeGameboard.checkGameOver() == 3) {
            alert("You tied!");
        } else {
            if (turnCounter % 2 == 0) {
                //player o turn
                const moveO = prompt("Choose a number 0-8 to move to Player O!");
                if (makeGameboard.gameboard[moveO] == null) {
                    makeGameboard.changeLetter("o", moveO);
                    turnCounter++;
                    console.log(makeGameboard.gameboard);
                    playGame();
                } else {
                    alert("Pick an empty space!");
                    playGame();
                }
            } else { 
                //player x turn
                const moveX = prompt("Choose a number 0-8 to move to Player X!");
                if (makeGameboard.gameboard[moveX] == null) {
                    makeGameboard.changeLetter("x", moveX);
                    turnCounter++;
                    console.log(makeGameboard.gameboard);
                    playGame();
                } else {
                    alert("Pick an empty space!");
                    playGame();
                }
            }
        }
    }

    return {playGame};
})();

makeGameContoller.playGame();