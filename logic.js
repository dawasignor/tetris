

// function moveblockDown(){  
//     console.log("in move")
// document.querySelector(".active-block").style.transform = "translateY("+(row*8)+"vh)";
// row++;
// }

function moveblockSide(){
    
}

function initLattice(){
    let lattice = [];
    var i,j;
    for(i=0;i<12;i++){
        lattice[i] = [];
        for(j=0;j<10;j++)
        {
            lattice[i][j]=0;
        }
    }
    return lattice;
}
