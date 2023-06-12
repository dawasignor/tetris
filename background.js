let blockCount=1;
function drawbg(){
    str="";
    document.getElementById("play-area").innerHTML = "";
    for(row=1; row<=12; row++){
        str+= "<div class=\"row\" id = \"row-"+row+"\">";
        for(col=1;col<=10;col++){
            str+="<div class=\"col-lg-1\" style=\"background-color:aquamarine; height: 8vh; width: 4vw; border-style: dashed; border-width: 1px; z-index: 1;\"> </div>";
        }
        str+=" </div>";
        
    }
    str+= "<div class=\"row\" id = \"row-"+13+"\">";
    str+="<div class=\"col-lg-12\" style=\"background-color:black; height: 4vh; width: 40vw; border-style: dashed; border-width: 1px;\"> </div>";
    document.getElementById("play-area").innerHTML = str;
}
function addActiveBlock(){
        blockCount++;
        let str="<div class = \"row align-items-start\">                        <div class=\"col-lg-2 square top-left\"></div>                        <div class=\"col-lg-2 square top-right\"></div>                    </div>                    <div class = \"row align-items-start\">                        <div class=\"col-lg-2 square bot-left\"></div>                        <div class=\"col-lg-2 square bot-right\"></div>                    </div>"
        const block =document.createElement("div");
        block.className = "container-fluid  block p-0 active-block start-from-top"
        block.innerHTML = str;
        block.id= ""+blockCount;
        document.getElementById("play-area").prepend(block);

}