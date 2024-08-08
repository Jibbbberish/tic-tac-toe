const makeGameboard = (function () {
    let gameboard = [null, null, null, null, null, null, null, null, null];
    
    const changeLetter = (letter, index) => {
        if  (gameboard.at(index) === null) {
            gameboard.splice(index, 1, letter)
        }
        //add an else in case there's already a letter there
    };

    //1 is playerX won, 2 is playerY won, 3 is a tie, 4 is game is still going
    const checkGameOver = () => {
        const winConditions = [
            [0, 1, 2]
            [3, 4, 5]
            [6, 7, 8] //error here
            [0, 3, 6]
            [1, 4, 7]
            [2, 5, 8]
            [0, 4, 8]
            [2, 4, 6]
        ];
        for (let i=0; i<winConditions.length; i++) {
            const winCondition = winConditions[i];
            if(gameboard.at(winCondition[0]) == "x" && 
            gameboard.at(winCondition[1]) == "x" && 
            gameboard.at(winCondition[2]) == "x"){
                return 1;
            }
        }
        for (let i=0; i<winConditions.length; i++) {
            const winCondition = winConditions[i];
            if(gameboard.at(winCondition[0]) == "y" && 
            gameboard.at(winCondition[1]) == "y" && 
            gameboard.at(winCondition[2]) == "y"){
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
        const addScore = () => score++;
        return {letter, score: 0, addScore};
    }

    const playerX = makePlayer("x");
    const playerY = makePlayer("y");

    //1 is playerX won, 2 is playerY won, 3 is a tie, 4 is game is still going
    while (makeGameboard.checkGameOver() == 4) {
        if (makeGameboard.checkGameOver() == 1) {
            playerX.addScore();
            alert("Player X, you won!");
        }  else if (makeGameboard.checkGameOver() == 2) {
            playerY.addScore();
            alert("Player Y, you won!");
        } else if (makeGameboard.checkGameOver() == 3) {
            alert("You tied!");
        } else {
            function isX(element) {
                return element == "x"
            }
            function isY(element) {
                return element == "Y"
            }
            const xInArray = makeGameboard.gameboard.filter(isX);
            const yInArray = makeGameboard.gameboard.filter(isY);
            if (xInArray.length>yInArray.length) {
                //player y turn
                const moveY = prompt("Choose a number 0-8 to move to Player Y!");
                //turn code here
            } else {
                //player x turn
                const moveX = prompt("Choose a number 0-8 to move to Player X!");
                //turn code here
            }
        }
    }
})();
console.log(makeGameboard.checkGameOver());