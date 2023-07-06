var nextBlockColor = Math.floor(Math.random() * 4) + 1;
var nextBlockLattice;
var nextBlockOrientation = Math.floor(Math.random() * 4) + 1;
var nextBlockType = Math.floor(Math.random() * 4) + 1;




function nextBlock() {
    nextBlockCtx.clearRect(0, 0, nextBlockCtx.canvas.width, nextBlockCtx.canvas.height);
    nextBlockType = Math.floor(Math.random() * 4) + 1;
    nextBlockColor = Math.floor(Math.random() * 4) + 1;
    nextBlockOrientation = Math.floor(Math.random() * 4) + 1;
    nextBlockLattice = getArrayforBlock(nextBlockType, nextBlockOrientation);
    for (i = 0; i < nextBlockLattice.length; i++) {

        for (j = 0; j < nextBlockLattice[0].length; j++) {
            if (nextBlockLattice[i][j] >= 1) {
                nextBlockCtx.fillStyle = getColor(nextBlockColor);
                nextBlockCtx.fillRect(j, i, BLOCK_WIDTH, BLOCK_HEIGHT);
                nextBlockCtx.stroke();
                nextBlockCtx.fill();
            }
        }
    }
}