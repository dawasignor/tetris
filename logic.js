


var orientation = startOrientation;
var row = startRow;
var blockType = 1;
var gameOver = true;
var col = startColumn;
var blockColor = 1;
var downSpeedMS = 0; //changes with difficulty setting

var lattice;
lattice = initLattice(ROWS + latticeExtraAlllowance, COLS + latticeExtraAlllowance);
var ActiveBlockId = 0;
var gameStart = 0;
var activeBlockLattice = getArrayforBlock(blockType, orientation);




/* start() : starts or restarts the game
*   reinitializes : canvas, lattice, blocks, gamestatus and score
*/
function start() {
    if(gameStart!=0){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    if(document.querySelector('input[name="difficulty"]:checked')==null){
        document.getElementById("diffSettings").classList.add("shake");
       setTimeout(()=> {document.getElementById("diffSettings").classList.remove("shake");}, 1000);

    }
    else {
        downSpeedMS = document.querySelector('input[name="difficulty"]:checked').value;
    document.getElementById("gameOverStatus").innerHTML = "";
    lattice = initLattice(ROWS + latticeExtraAlllowance, COLS + latticeExtraAlllowance);
    gameStart = setInterval(moveblockDown, downSpeedMS);
    ActiveBlockId = 0;
    gameOver = false;
    updateScore()
    updateActiveBlock();
    }
    

}

/* end() : ends the game if the last block touches cieling 
*  adds a Gameover div and clears game progression
*
*
*
*/

function end() {
    gameOver = true;
    console.log("GAMEOVER!");
    const gameOverDiv = document.createElement("div");
    gameOverDiv.innerHTML = "<h3>GAME OVER!</h3>";
    document.getElementById("gameOverStatus").append(gameOverDiv);
    document.getElementById("Score").innerHTML = "<h3>" + (ActiveBlockId) + "</h3>";
    clearInterval(gameTime);
    clearInterval(gameStart);
}

/* refreshBlock() : checks if a new block needs to be added
*
*
*
*/
function refreshBlock() {
    if (!canMoveDown()) {
        updateActiveBlock();
    }
}

/* updateScore() : updates the score
*
*
*
*/
function updateScore() {
    document.getElementById("Score").innerHTML = "<h3>" + (ActiveBlockId) + "</h3>";
}

/* updateActiveBlock() : adds a new block and reinitializes row, col and orientation
*
*
*
*/
function updateActiveBlock() {

    el = document.querySelector(".active-block");
    if (el != null) { el.classList.remove("active-block") }
    //randomly call shapes
    //shape 5
    //
    ////
    //
    blockType = addBlock();
    
    ActiveBlockId++;
    updateScore();
    col = startColumn;
    row = startRow;
    orientation = startOrientation;
    updateLattice_newBlock();
    isGameOver()
    drawbg(lattice);


}

function moveblockDown() {
    if (canMoveDown()) {
        updateLattice_down();
        row++;
        drawbg(lattice);
    } else {
        refreshBlock();
    }
}
function updateLattice_newBlock() {
    activeBlockLattice = getArrayforBlock(blockType, orientation);
    for (var i = 0; i < lattice.length; i++) {
        for (var j = 0; j < lattice[i].length; j++) {
            if (i < activeBlockLattice.length) {
                if (j < activeBlockLattice[i].length) {
                    lattice[i + row - 1][j + col - 1] = blockColor*activeBlockLattice[i][j];
                }
            }

        }
    }
    drawbg(lattice);

}

function rotateBlockLattice() {
    if (canRotate()) {
        newLattice = getArrayforBlock(blockType, orientation + 1)
        for (var rowT = 0; rowT < newLattice.length; rowT++) {
            for (var colT = 0; colT < newLattice[0].length; colT++) {
                if (activeBlockLattice[rowT][colT] == 1) {
                    lattice[row + rowT - 1][col + colT - 1] = 0;
                }
                if (newLattice[rowT][colT] == 1) {
                    lattice[row + rowT - 1][col + colT - 1] = blockColor;
                }
            }
        }
        activeBlockLattice = newLattice;
        orientation++;
    }
}

function updateLattice_down() {
    var blockLattice = activeBlockLattice;
    blockRowSize = blockLattice.length;
    blockColSize = blockLattice[0].length;
    for (var i = (row + getLastRowIndex() - 1); i >= (row - 1); i--) {
        for (var j = (col - 1); j < (col + blockColSize - 1); j++) {
            if (lattice[i + 1][j] < 1 && lattice[i][j] != 0) {
                if (blockLattice[i - row + 1][j - col + 1] == 1) {
                    lattice[i + 1][j] = lattice[i][j];
                    lattice[i][j] = 0;
                }
            }
        }
    }
    drawbg(lattice);
}

function updateLattice_side(side) { 
    var right = side == "right" ? true : false;
    var blockLattice = activeBlockLattice;
    var i, j;
    blockRowSize = blockLattice.length;
    blockColSize = blockLattice[0].length;
    for (i = (row + blockRowSize - 2); i >= (row - 1); i--) {
        if (right) {
            if ((col + getLastColIndex() - 1) < COLS) {
                for (var j = (col + getLastColIndex() - 1); j >= (col - 1); j--) {
                    if (!(lattice[i][j] == 0 && j == (col + getLastColIndex() - 1))) {
                        lattice[i][j + 1] = lattice[i][j];
                        if (j == (col - 1)) {
                            lattice[i][j] = 0;
                        }
                    }
                }
            }
        } else {
            if (col > 1) {
                for (var j = (col - 1); j <= (col + blockColSize - 2); j++) {
                    if(!(j==col-1 && lattice[i][j]==0)){
                        lattice[i][j - 1] = lattice[i][j];
                        if (j == (col + blockColSize - 2)) {
                            lattice[i][j] = 0;
                        }
                    }
                }
            }
        }
    }
    drawbg(lattice);
}

//=======================================isFunctions which return boolean


function canMoveDown() {
    var result = true;
    var blockLattice = activeBlockLattice;
    var blockLastRowIndex = blockLattice.length - 1;
    var blockLastRow = blockLattice[blockLastRowIndex];
    var toCheckElements = [];
    var i, j;
    for (j = 0; j <= blockLastRow.length; j++) {
        for (i = blockLastRowIndex; i >= 0; i--) {
            if (blockLattice[i][j] == 1) {
                toCheckElements[j] = [i, j];
                break;
            }
            toCheckElements[j] = [-1, -1];
        }
    }

    if (row + getLastRowIndex() == ROWS) {
        result = false;
        return result;
    } else {
        for (var el = 0; el < blockLastRow.length; el++) {
            var element = toCheckElements[el];
            var i = element[0];
            var j = element[1];
            if (i != -1 && j != -1) {
                if (lattice[row + i][col + j - 1] >= 1) {
                    result = false;
                    break;
                }
            }
        }
    }
    return result;

}

function getLastColIndex() {
    var lastColIndex = 0;
    for (i = 0; i < activeBlockLattice.length; i++) {
        for (j = 0; j < activeBlockLattice[0].length; j++) {
            if (activeBlockLattice[i][j] == 1) {
                if (j > lastColIndex) {
                    lastColIndex = j;
                }
            }
        }
    }
    return lastColIndex;
}

function getLastRowIndex() {
    var lastRowIndex = 0;
    for (i = 0; i < activeBlockLattice.length; i++) {
        for (j = 0; j < activeBlockLattice[0].length; j++) {
            if (activeBlockLattice[i][j] == 1) {
                if (i > lastRowIndex) {
                    lastRowIndex = i;
                }
            }
        }
    }
    return lastRowIndex;
}

function canMoveSide(side) {
    var isRight = side == "right" ? true : false;
    var result = true;
    var blockLattice = activeBlockLattice;
    var blockLastRow = blockLattice[blockLattice.length - 1];
    var blockColSize = blockLastRow.length;
    var blockRowSize = blockLattice.length;
    var i, j;
    if (isRight) {
        var lastColIndex = col + getLastColIndex() - 1;
        if (lastColIndex >= COLS - 1) {
            //right wall
            return false;
        }
        else {
            for (i = row - 1; i <= (row + blockRowSize - 2); i++) {
                if (lattice[i][lastColIndex] >= 1 && lattice[i][lastColIndex + 1] >= 1) {
                    //cant move right because of shapes on right.
                    return false;
                }
            }
            return true;
        }
    } else {
        lastColIndex = col - 1;
        if (lastColIndex <= 0) {
            //left wall
            return false;
        }
        else {
            for (i = row - 1; i <= (row + blockRowSize - 2); i++) {
                if (lattice[i][lastColIndex] >= 1 && lattice[i][lastColIndex - 1] >= 1) {
                    //cant move right because of shapes on right.
                    return false;
                }
            }
            return true;
        }

    }
}




function canRotate() {
    newLattice = getArrayforBlock(blockType, orientation + 1)
    for (var rowT = 0; rowT < newLattice.length; rowT++) {
        for (var colT = 0; colT < newLattice[0].length; colT++) {
            if (lattice[row + rowT - 1][col + colT - 1] >= 1 && newLattice[rowT][colT] == 1) {
                if (activeBlockLattice[rowT][colT] == 1) {
                    continue;
                } else {
                    return false;
                }
            }
        }
    }
    return true;



}

function isGameOver() {
    if (canMoveDown()) {
        return false;
    } else {
        end();
        return true;
    }
}

//=====================Init functions
//Initializes the lattice with ROWSxCOLS of zeroes to clear the blocks
function initLattice(ROWS, COLS) {
    var lattice = [];
    var i, j;
    for (i = 0; i < ROWS; i++) {
        lattice[i] = [];
        for (j = 0; j < COLS; j++) {
            lattice[i][j] = 0;
        }
    }
    return lattice;
}


//gets the block structure when blocktype and block orientation are passed. Kept as hardcoded as this needs to be rigidly followed
function getArrayforBlock(type, block_rotation) {
    var blockLattice = [];
    switch (type) {
        case 1:
            blockLattice[0] = [1, 1];
            blockLattice[1] = [1, 1];
            break;
        case 2:
            switch (block_rotation % 4) {
                case 1:
                case 3:
                    blockLattice[0] = [1, 0, 0, 0];
                    blockLattice[1] = [1, 0, 0, 0];
                    blockLattice[2] = [1, 0, 0, 0];
                    blockLattice[3] = [1, 0, 0, 0];
                    break;

                case 2:
                case 0:
                    blockLattice[0] = [1, 1, 1, 1];
                    blockLattice[1] = [0, 0, 0, 0];
                    blockLattice[2] = [0, 0, 0, 0];
                    blockLattice[3] = [0, 0, 0, 0];
                    break;
            }

            break;
        case 3:
            switch (block_rotation % 4) {
                case 1:
                    blockLattice[0] = [1, 0, 0];
                    blockLattice[1] = [1, 0, 0];
                    blockLattice[2] = [1, 1, 0];
                    break;
                case 2:
                    blockLattice[0] = [1, 1, 1];
                    blockLattice[1] = [1, 0, 0];
                    blockLattice[2] = [0, 0, 0];
                    break;
                case 3:
                    blockLattice[0] = [1, 1, 0];
                    blockLattice[1] = [0, 1, 0];
                    blockLattice[2] = [0, 1, 0];
                    break;
                case 0:
                    blockLattice[0] = [0, 0, 1];
                    blockLattice[1] = [1, 1, 1];
                    blockLattice[2] = [0, 0, 0];
                    break;
            }
            break;
        case 4:
            switch (block_rotation % 4) {
                case 1:
                    blockLattice[0] = [1, 0, 0];
                    blockLattice[1] = [1, 1, 0];
                    blockLattice[2] = [1, 0, 0];
                    break;
                case 2:
                    blockLattice[0] = [1, 1, 1];
                    blockLattice[1] = [0, 1, 0];
                    blockLattice[2] = [0, 0, 0];
                    break;
                case 3:
                    blockLattice[0] = [0, 1, 0];
                    blockLattice[1] = [1, 1, 0];
                    blockLattice[2] = [0, 1, 0];
                    break;
                case 0:
                    blockLattice[0] = [0, 1, 0];
                    blockLattice[1] = [1, 1, 1];
                    blockLattice[2] = [0, 0, 0];
                    break;
            }

            break;
    }
    return blockLattice;
}








