
function drawbg() {
    let counter = 0;
    const ctx = document.getElementById("play-area").getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.fillStyle = '#87CEEB';
    // console.log(getColor(blockColor));
    for (i = 0; i < ROWS; i++) {
        counter = 0;
        for (j = 0; j < COLS; j++) {
            if (lattice[i][j] >= 1) {
                ctx.fillStyle = getColor(lattice[i][j]);
                counter++;
                ctx.fillRect(j, i, BLOCK_WIDTH, BLOCK_HEIGHT);
                ctx.stroke();
                ctx.fill();
            }
        }
        if (counter == COLS) {
            clearLatticeRow(i, lattice);
        }
    }

}

function getColor(colorNum) {
    let color = '';
    switch (colorNum) {
        case 1:
            color = '#87CEEB';
            break;
        case 2:
            color = '#E3A018'
            break;
        case 3:
            color = '#7FBC8C'
            break;
        case 4:
            color = '#FFC0CB'
            break;

    }
    return color;
}

function clearLatticeRow(row, lattice) {
    for (i = row; i > 0; i--) {
        for (j = 0; j < COLS; j++) {
            if (i != 0) {
                lattice[i][j] = lattice[i - 1][j];
            }
        }
    }
    drawbg(lattice);
}


function addBlock() {
    blockType = nextBlockType;
    blockColor = nextBlockColor;
}
