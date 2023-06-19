let blockCount=0;
function drawbg(){
    str="";
    document.getElementById("play-area").innerHTML = "";
    for(row=1; row<=12; row++){
        str+= "<div class=\"row\" id = \"row-"+row+"\" style =\"visiblity:hidden;\">";
        for(col=1;col<=10;col++){
            str+="<div class=\"col-lg-1\" style=\"background-color: #9723C9; height: 8vh; width: 4vw; z-index: 1;\"> </div>";
        }
        str+=" </div>";
        
    }
    str+= "<div class=\"row\" id = \"row-"+13+"\">";
    str+="<div class=\"col-lg-12\" style=\"background-color:black; height: 4vh; width: 40vw;\"> </div>";
    document.getElementById("play-area").innerHTML = str;
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