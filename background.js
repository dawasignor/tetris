let blockCount=0;
function drawbg(){
    let counter=0;
    const ctx = document.getElementById("play-area").getContext('2d');
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = '#87CEEB';
    //ctx.fillStyle = getColor(colorNum);
    for(i=0;i<ROWS;i++){
        counter=0;
        for(j=0;j<COLS;j++){
            if(lattice[i][j]==1){
                counter++;
                ctx.fillRect(j, i, BLOCK_WIDTH, BLOCK_HEIGHT);
                ctx.stroke();
                ctx.fill();
            }
        }
        if(counter==COLS){
            clearLatticeRow(i,lattice);
        }
    }

}

function getColor(colorNum){
    let color='';
    switch (colorNum)
    {
        case 1:
        color= '#87CEEB';
        break;
        case 2:
        color = 'E3A018'
        break;
        case 3:
        color = '7FBC8C'
        break;
        case 4:
        color = 'FFC0CB'
        break;

    }
    return color;
}

function clearLatticeRow(row,lattice){
    for(i=row;i>0;i--){
        for(j=0;j<COLS;j++){
            if(i!=0){
                lattice[i][j] = lattice[i-1][j];
            }
        }
    }
    drawbg(lattice);
}


function addBlock(){
    let randomNumber = Math.floor(Math.random()*4) +1;
    console.log(randomNumber);
    switch(randomNumber){
        case 1:
            addBlockType1();
            return 1;
            break;
        case 2:
            addBlockType2();
            return 2;
            break;
        case 3:
            addBlockType3();
            return 3;
            break;
        case 4:
            addBlockType4();
            return 4;
            break;
    }
}
////
////
function addBlockType1(){
        blockCount++;
        let str="<div class = \"row align-items-start\">                        <div class=\"col-lg-2 square top-left\"></div>                        <div class=\"col-lg-2 square top-right\"></div>                    </div>                    <div class = \"row align-items-start\">                        <div class=\"col-lg-2 square bot-left\"></div>                        <div class=\"col-lg-2 square bot-right\"></div>                    </div>"
        const block =document.createElement("div");
        block.className = "container-fluid  block p-0 active-block start-from-top"
        block.innerHTML = str;
        block.style = "height: 16vh; width: 8vw"
        block.id= ""+blockCount;
        document.getElementById("play-area").prepend(block);

}
//
//
//
//
function addBlockType2(){
    blockCount++;
    let str="<div class = \"row align-items-start\">                        <div class=\"col-lg-1 square top-left\"></div> </div> <div class = \"row align-items-start\">                        <div class=\"col-lg-1 square top-left\"></div> </div> <div class = \"row align-items-start\">                        <div class=\"col-lg-1 square top-left\"></div> </div> <div class = \"row align-items-start\">                        <div class=\"col-lg-1 square top-left\"></div> </div>"
    const block =document.createElement("div");
    block.className = "container-fluid  block p-0 active-block start-from-top"
    block.style = "height: 32vh; width: 4vw"
    block.innerHTML = str;
    block.id= ""+blockCount;
    document.getElementById("play-area").prepend(block);

}
//
//
////
function addBlockType3(){
    blockCount++;
    let str="<div class = \"row align-items-start\">                        <div class=\"col-lg-1 square top-left\"></div> </div> <div class = \"row align-items-start\">                        <div class=\"col-lg-1 square top-left\"></div> </div> <div class = \"row align-items-start\">                        <div class=\"col-lg-2 square top-left\"></div> <div class=\"col-lg-2 square top-left\"></div> </div> "
    const block =document.createElement("div");
    block.className = "container-fluid  block p-0 active-block start-from-top"
    block.innerHTML = str;
    block.style = "height: 24vh; width: 8vw"
    block.id= ""+blockCount;
    document.getElementById("play-area").prepend(block);

}
//
////
//
function addBlockType4(){
    blockCount++;
    let str="<div class = \"row align-items-start\">                        <div class=\"col-lg-1 square top-left\"></div> </div> <div class = \"row align-items-start\">                        <div class=\"col-lg-2 square top-left\"></div> <div class=\"col-lg-2 square top-left\"></div> </div> <div class = \"row align-items-start\">                        <div class=\"col-lg-1 square top-left\"></div> </div>  "
    const block =document.createElement("div");
    block.className = "container-fluid  block p-0 active-block start-from-top"
    block.innerHTML = str;
    block.style = "height: 16vh; width: 8vw"
    block.id= ""+blockCount;
    document.getElementById("play-area").prepend(block);

}