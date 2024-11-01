const r1 = document.getElementById("r1");
const svg = document.getElementById("svgT");
const tText = document.getElementById("test");
const tPos = document.getElementById("pos");
const stBut = document.getElementById("stBut");
const tSc = document.getElementById("tScore");
const tInfo = document.getElementById("tInfo");
let u = 20;
let x0 = 210;
let y0 = 80;

function drawField(){
  const fPlay = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  fPlay.setAttribute("x", 150);
  fPlay.setAttribute("y", 40);
  fPlay.setAttribute("width", 200);
  fPlay.setAttribute("height", 440);
  fPlay.setAttribute("stroke", "black");
  fPlay.setAttribute("stroke-width", 1);
  fPlay.setAttribute("fill", "transparent");
  svg.appendChild(fPlay);

  for (let i = 1; i < 10; i ++){
    const vLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    vLine.setAttribute("x1", 150 + i*u);
    vLine.setAttribute("y1", 40);
    vLine.setAttribute("x2", 150 + i*u);
    vLine.setAttribute("y2", 480);
    vLine.setAttribute("stroke", "lightgray");
    vLine.setAttribute("stroke-width", 1/2);
    svg.appendChild(vLine);
  }

  for (let i = 1; i < 21; i ++){
    const hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hLine.setAttribute("x1", 150);
    hLine.setAttribute("y1", 40 + i*u);
    hLine.setAttribute("x2", 350);
    hLine.setAttribute("y2", 40 + i*u);
    hLine.setAttribute("stroke", "lightgray");
    hLine.setAttribute("stroke-width", 1/2);
    svg.appendChild(hLine);
  }
}

drawField();

function uBlock(x, y, col, nId){
  const uB = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  uB.setAttribute("x", x);
  uB.setAttribute("y", y);
  uB.setAttribute("width", u);
  uB.setAttribute("height", u);
  uB.setAttribute("stroke", "black");
  uB.setAttribute("stroke-width", 2);
  uB.setAttribute("fill", col);
  uB.setAttribute("id", nId);
  svg.appendChild(uB);
}


let q = 0;

function dPiece(n){
  let c;
  let qr;
  let x;
  let y;
  let m;
  if (Number.isInteger(n) == true){
    x = x0;
    y = y0;
    qr = q;
    m = n;
  } else {
    x = 400;
    y = 100;
    qr = "n";
    m = Number(n.slice(1));
  }
  let nId;
  switch(m){
    case 1:
      c = "green";
      nId = "O";
      uBlock(x + u, y, c, qr + 1);
      uBlock(x + 2*u, y, c, qr + 2);
      uBlock(x + u, y + u, c, qr + 3);
      uBlock(x + 2*u, y + u, c, qr + 4);
      break;
    case 2:
      c = "purple";
      nId = "T"
      uBlock(x, y, c, qr + 1);
      uBlock(x + u, y, c, qr + 2);
      uBlock(x + 2*u, y, c, qr + 3);
      uBlock(x + u, y + u, c, qr + 4);
      break;
    case 3:
      c = "gold";
      nId = "I"
      uBlock(x, y, c, qr + 1);
      uBlock(x + u, y, c, qr + 2);
      uBlock(x + 2*u, y, c, qr + 3);
      uBlock(x + 3*u, y, c, qr + 4);
      break;
    case 4:
      c = "blue";
      nId = "L"
      uBlock(x, y, c, qr + 1);
      uBlock(x + u, y, c, qr + 2);
      uBlock(x + 2*u, y, c, qr + 3);
      uBlock(x + 2*u, y - u, c, qr + 4);
      break;
    case 5:
      c = "turquoise";
      nId = "J"
      uBlock(x, y, c, qr + 1);
      uBlock(x + u, y, c, qr + 2);
      uBlock(x + 2*u, y, c, qr + 3);
      uBlock(x + 2*u, y + u, c, qr + 4);
      break;
    case 6:
      c = "red";
      nId = "S"
      uBlock(x, y + u, c, qr + 1);
      uBlock(x + u, y + u, c, qr + 2);
      uBlock(x + u, y, c, qr + 3);
      uBlock(x + 2*u, y, c, qr + 4);
      break;
    case 7:
      c = "hotpink";
      nId = "Z"
      uBlock(x, y, c, qr + 1);
      uBlock(x + u, y, c, qr + 2);
      uBlock(x + u, y + u, c, qr + 3);
      uBlock(x + 2*u, y + u, c, qr + 4);
      break;
    default:
      c = "Error!";
  }
  if (Number.isInteger(n) == true){
    q += 4;
  }
}





let reqMove;


let pDat = {
  x: [],
  y: [],
  id: []
};

let nb;
let nexB;
let pcNum;
let npcNum;
let rot;
let score = 0;
let bag = [];

let text = "";
let txtPos = "";



tSc.innerHTML += score;

function clField(c){
  if (c == "n"){
    for (let  i = 1; i < 5; i++){
      let id = "n" + i;
      const bl = document.getElementById(id);
      bl.remove();
    }
  } else {
    let id = c;
    const bl = document.getElementById(id);
    bl.remove();
  }
}

function startGame(){
  if (bag.length == 0){
    let pc = 1;
    while (pc < 8){
      bag.push(pc);
      pc ++;
    }
  }
  nb = Math.floor(Math.random() * bag.length);
  pcNum = bag[nb];
  bag.splice(nb, 1);
  dPiece(pcNum);
  rot = 1;
  moveIt();
  stBut.setAttribute("disabled", "")
}

function restartGame(){
  for (let i = 0; i < pDat.id.length; i ++){
      let cId = pDat.id[i];
      clField(cId);
  }
  pDat.x.length = 0;
  pDat.y.length = 0;
  pDat.id.length = 0;
  bag.length = 0;
  nb = undefined;
  nexB = undefined;
  pcNum = undefined;
  npcNum = undefined;
  clField("n");
  text = "";
  txtPos = "";
  score = 0
  tSc.innerHTML = "Score: " + score;
  tInfo.innerHTML = "";
  q = 0;
  startGame();
}

function moveIt(){
  reqMove = setInterval(doMove, 500);
  if (bag.length == 0){
    let pc = 1;
    while (pc < 8){
      bag.push(pc);
      pc ++;
    }
  }  
  nexB = Math.floor(Math.random() * bag.length);
  npcNum = bag[nexB];
  bag.splice(nexB, 1);
  let nxB = "n" + npcNum;
  dPiece(nxB);
}

function stopIt(){
  clearInterval(reqMove);
  regPos();
  checkScore();

  txtPos = "";
  for (let i = 0; i < pDat.x.length; i++){
  txtPos += " (" + pDat.x[i] + "," + pDat.y[i] + ")|" + pDat.id[i] + " ";
    }
  //tPos.innerHTML = txtPos;
  if (pDat.y.some(function(value){return value < 5})){
    tInfo.innerHTML = "Game Over!";
    stBut.innerHTML = "Restart";
    stBut.removeAttribute("disabled");
    stBut.setAttribute("onclick", "restartGame()");
  } else {
  pcNum = npcNum;
  dPiece(pcNum);
  rot = 1;
  clField("n");
  moveIt();
  }
  
}

function doMove(){
  if (checkMove("d") == false){
    stopIt();
  } else {
  for (let i = q - 3; i < q + 1; i++){
    let bId = i;
    const bl = document.getElementById(bId);
    let y = Number(bl.getAttribute("y"));
    bl.setAttribute("y", y + u);
  }
  }
}



function keyDrop(event){
  let key = event.key;
  if (key == "ArrowRight" && checkMove("r") == true){
    for (let i = q - 3; i < q + 1; i++){
      let bId = i;
      const bl = document.getElementById(bId);
      let x = Number(bl.getAttribute("x"));
      bl.setAttribute("x", x + u);
    }
  } else if (key == "ArrowLeft" && checkMove("l") == true){
    for (let i = q - 3; i < q + 1; i++){
      let bId = i;
      const bl = document.getElementById(bId);
      let x = Number(bl.getAttribute("x"));
      bl.setAttribute("x", x - u);
    }
  } else if ((key == "s" || key == "S") && checkMove("d") == true){
    for (let i = q - 3; i < q + 1; i++){
      let bId = i;
      const bl = document.getElementById(bId);
      let y = Number(bl.getAttribute("y"));
      bl.setAttribute("y", y + u);
    }
    score += 1;
    tSc.innerHTML = "Score: " + score;
  } else if (key == "q" || key == "Q"){
    if (rot == 4){
      rot = 1;
    } else {
      rot += 1;
    }
    rotateIt(rot, pcNum);
  }
}


function regPos(){

  for (let i = q - 3; i < q + 1; i++){
    let bId = i;
    const bl = document.getElementById(bId);
    let x = Number(bl.getAttribute("x"));
    x = 1 + (x-150)/20;
    let y = Number(bl.getAttribute("y"));
    y = 1 + (y-40)/20;
    pDat.x.push(x);
    pDat.y.push(y);
    pDat.id.push(bId);
  }

}

function checkScore(){
  let rowArr = [];
  let lineCount = 0;
  let incSc;
  let info;
  for (let i = 22; i > 0; i --){
    let pSort = pDat.y.slice();
    pSort.sort((a,b) => b - a);
    let rowCount = pSort.lastIndexOf(i) - pSort.indexOf(i) + 1;
    let rowNum = i;
    if (rowCount == 10){
      rowArr.push(rowNum);
      let bIndex = [];
      let ySearch = pDat.y.slice();
      for (let i1 = 1; i1 < 11; i1 ++){
        let ind = ySearch.indexOf(rowNum);
        ySearch.splice(ind, 1);
        bIndex.push(ind + i1 - 1);
      }
      for (let i2 = 0; i2 < bIndex.length; i2 ++){
        let theInd = bIndex[i2];
        let cId = pDat.id[theInd];
        clField(cId);
      }
      for (let i3 = 0; i3 < bIndex.length; i3 ++){
        let theInd = bIndex[i3];
        pDat.x.splice(theInd - i3, 1);
        pDat.y.splice(theInd - i3, 1);
        pDat.id.splice(theInd - i3, 1);
      }
      lineCount += 1;
    }

  }
  if (lineCount > 0){
    switch(lineCount){
      case 1:
        incSc = 100;
        info = "Single! +100";
        break;
      case 2:
        incSc = 300;
        info = "Double! +300";
        break;
      case 3:
        incSc = 500;
        info = "Triple! +500";
        break;
      case 4:
        incSc = 800;
        info = "TETRIS! +800";
	break;
      default:
        tText.innerHTML = "Error!";
    }
    tInfo.innerHTML = info;
    score += incSc;
    tSc.innerHTML = "Score: " + score;
  } else {
    tInfo.innerHTML = "";
  }
  fallDown(rowArr);

}

function fallDown(rArr){
  let rowClr = rArr.slice();
  rowClr.sort((a, b) => a - b);
  rowClr.forEach(function fallIt(value, index, array){
    let r = value;
    let yIn = [];
    pDat.y.forEach(aboveRow);
    function aboveRow(value, index, array){
      if (value < r){
        let yA = index;
        yIn.push(yA);
      }
    }
    for (let i = 0; i < yIn.length; i++){
      let bId = pDat.id[yIn[i]];
      const bl = document.getElementById(bId);
      let y = Number(bl.getAttribute("y"));
      bl.setAttribute("y", y + u);
      pDat.y[yIn[i]] += 1;
    }
  })

}



function checkMove(c){
  let result = true;
  for (let i = q - 3; i < q + 1; i++){
    let bId = i;
    const bl = document.getElementById(bId);
    let x = Number(bl.getAttribute("x"));
    x = 1 + (x-150)/20;
    let y = Number(bl.getAttribute("y"));
    y = 1 + (y-40)/20;
    let xc;
    let yc;
    switch(c){
      case "d":
        xc = x;
        yc = y + 1;
        pDat.x.forEach(chD);
        function chD(value, index){
          let xA;
          if (value == xc){
            xA = index;
          }
          if (pDat.y[xA] == yc){
            result = false;
          }
        }
        if (yc == 23){
          result = false;
        }
        break;
      case "r":
        xc = x + 1;
        yc = y;
        pDat.y.forEach(chR);
        function chR(value, index){
          let yA;
          if (value == yc){
            yA = index;
          }
          if (pDat.x[yA] == xc){
            result = false;
          }
        }
        if (xc == 11){
          result = false;
        }
        break;
      case "l":
        xc = x - 1;
        yc = y;
        pDat.y.forEach(chL);
        function chL(value, index){
          let yA;
          if (value == yc){
            yA = index;
          }
          if (pDat.x[yA] == xc){
            result = false;
          }
        }
        if (xc == 0){
          result = false;
        }
        break;
        break;
      default:
        tPos.innerHTML = "Error!";
    }
  }
  return result;
}


function rotateIt(n, b){
  let iB = [];
  let xB = [];
  let yB = [];
  for (let i = q - 3; i < q + 1; i++){
    let bId = i;
    const bl = document.getElementById(bId);
    let x = Number(bl.getAttribute("x"));
    let y = Number(bl.getAttribute("y"));
    iB.push(bId);
    xB.push(x);
    yB.push(y);
  }
  function setP(b, x, y){
    let id = iB[b-1];
    const theB = document.getElementById(id);
    theB.setAttribute("x", xB[b-1] + x);
    theB.setAttribute("y", yB[b-1] + y);
  }

  switch (b){
    case 1:
      break;
    case 2:
      switch (n){
        case 1:
          setP(1, -u, -u);
          setP(2, 0, 0);
          setP(3, u, u);
          setP(4, -u, u);
          break;
        case 2:
          setP(1, u, -u);
          setP(2, 0, 0);
          setP(3, -u, u);
          setP(4, -u, -u);
          break;
        case 3:
          setP(1, u, u);
          setP(2, 0, 0);
          setP(3, -u, -u);
          setP(4, u, -u);
          break;
        case 4:
          setP(1, -u, u);
          setP(2, 0, 0);
          setP(3, u, -u);
          setP(4, u, u);
          break;
        default:
          tText.innerHTML = "Error!";
      }
      break;
    case 3:
      switch(n){
        case 1:
        case 3:
          setP(1, -u, u);
          setP(2, 0, 0);
          setP(3, u, -u);
          setP(4, 2*u, -2*u);
          break;
        case 2:
        case 4:
          setP(1, u, -u);
          setP(2, 0, 0);
          setP(3, -u, u);
          setP(4, -2*u, 2*u);
          break;
        default:
          tText.innerHTML = "Error!";
      }
      break;
    case 4:
      switch(n){
        case 1:
          setP(1, -u, -u);
          setP(2, 0, 0);
          setP(3, u, u);
          setP(4, 2*u, 0);
          break;
        case 2:
          setP(1, u, -u);
          setP(2, 0, 0);
          setP(3, -u, u);
          setP(4, 0, 2*u);
          break;
        case 3:
          setP(1, u, u);
          setP(2, 0, 0);
          setP(3, -u, -u);
          setP(4, -2*u, 0);
          break;
        case 4:
          setP(1, -u, u);
          setP(2, 0, 0);
          setP(3, u, -u);
          setP(4, 0, -2*u);
          break;
        default:
          tText.innerHTML = "Error!";
      }
      break;
    case 5:
      switch(n){
        case 1:
          setP(1, -u, -u);
          setP(2, 0, 0);
          setP(3, u, u);
          setP(4, 0, 2*u);
          break;
        case 2:
          setP(1, u, -u);
          setP(2, 0, 0);
          setP(3, -u, u);
          setP(4, -2*u, 0);
          break;
        case 3:
          setP(1, u, u);
          setP(2, 0, 0);
          setP(3, -u, -u);
          setP(4, 0, -2*u);
          break;
        case 4:
          setP(1, -u, u);
          setP(2, 0, 0);
          setP(3, u, -u);
          setP(4, 2*u, 0);
          break;
        default:
          tText.innerHTML = "Error!";
      }
      break;
    case 6:
      switch(n){
        case 1:
        case 3:
          setP(1, -u, 2*u);
          setP(2, 0, u);
          setP(3, -u, 0);
          setP(4, 0, -u);
          break;
        case 2:
        case 4:
          setP(1, u, -2*u);
          setP(2, 0, -u);
          setP(3, u, 0);
          setP(4, 0, u);
          break;
        default:
          tText.innerHTML = "Error!";
      }
      break;
    case 7:
      switch(n){
        case 1:
        case 3:
          setP(1, -2*u, u);
          setP(2, -u, 0);
          setP(3, 0, u);
          setP(4, u, 0);
          break;
        case 2:
        case 4:
          setP(1, 2*u, -u);
          setP(2, u, 0);
          setP(3, 0, -u);
          setP(4, -u, 0);
          break;
        default:
          tText.innerHTML = "Error!";
      }
      break;
    default:
      tText.innerHTML = "Error!";
  }

  let xOffArr = [];
  iB.forEach(checkRot);

  function checkRot(value, index, arr){
    let id = value;
    const theB = document.getElementById(id);
    let xCh = theB.getAttribute("x");
    xCh = 1 + (xCh - 150)/20;
    let xOff;
    if (xCh < 1){
      xOff = xCh - 1;
      xOffArr.push(xOff);
    } else if (xCh > 10){
      xOff = xCh - 10;
      xOffArr.push(xOff);
    }
  }


  if (xOffArr.length !== 0){
    let maxOff = Math.max.apply(null, xOffArr);
    if (maxOff > 0){
      for (let i = 0; i < 4; i ++){
        let id = iB[i];
        const theB = document.getElementById(id);
        let xRot = theB.getAttribute("x");
        theB.setAttribute("x", xRot - maxOff * u);
      }
    } else if (maxOff < 0){
      let minOff = Math.min.apply(null, xOffArr);
      for (let i = 0; i < 4; i ++){
        let id = iB[i];
        const theB = document.getElementById(id);
        let xRot = theB.getAttribute("x");
        theB.setAttribute("x", xRot - minOff * u);
      }
    }
  }
}
