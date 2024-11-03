const svgF = document.getElementById("svgT");
const tText = document.getElementById("text");
const fLink = document.getElementById("flag").getAttribute("href");
const bLink = document.getElementById("bomb").getAttribute("href");
const stBut = document.getElementById("startBut");
const svBut = document.getElementById("solveBut");
const chBut = document.getElementById("changeBut");

const fCount = document.getElementById("fC");
const bCount = document.getElementById("bC");
tText.innerHTML = "-";
let numClr = ["blue", "green", "red", "navy", "brown", "teal", "black", "silver"]; 
let svgd = 500;
let nBomb = 50;
let u = 25;
let d = 16;
let fArea = d*d;
let x0 = (svgd - (u*d))/2;
let y0 = x0;
let ctrl = false;
let m = 0;
let idArr = [];
let bArr = [];
let flagged = 0;

let sArr = {
  id: [],
  num: [],
  st: []
}

let fArr = {
  tId: [],
  fId: []
}

bCount.textContent += nBomb;
fCount.textContent += flagged + "/" + nBomb;

let handArr = {
  id: [],
  func: []
};

let idZero = [];
let zeroOpen = [];

drawTiles();

function drawTiles(){
  for (let i = 0; i < fArea; i ++){
    let col = (i % 16) + 1
    let row = (Math.floor(i/16)) + 1
    let x = x0 + (col - 1)*u;
    let y = y0 + (row - 1) * u;
    let colId = String.fromCharCode(64 + col)
    let rowId = String.fromCharCode(64 + row);
    let tId = colId + rowId;
    idArr.push(tId);
    let handler = function(){
      showIt(tId)
    };
    handArr.func.push(handler);
    handArr.id.push(tId);
    const uB = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    uB.setAttribute("x", x);
    uB.setAttribute("y", y);
    uB.setAttribute("width", u);
    uB.setAttribute("height", u);
    uB.setAttribute("stroke", "black");
    uB.setAttribute("stroke-width", 1);
    uB.setAttribute("fill", "gray");
    uB.setAttribute("id", tId);
    uB.setAttribute("class", "tile");
    uB.addEventListener("click", handler)
    svgF.appendChild(uB);
  }
}


function showIt(t){
  let id = t;
  let idBox = [];
  const tTile = document.getElementById(id);
  if (m == 0 && ctrl == false){
    genGame(id);
    svBut.removeAttribute("disabled");
  }
  if (ctrl == true){
    addFlag(id);
  } else if (fArr.tId.includes(id) == false){
    openIt(id);
    m ++;
  }

}

function openIt(t){
  let id = t;
  const tTile = document.getElementById(id);

  
  if (bArr.includes(id) == true){
    showBomb();
  } else {
    let tileNum = sArr.num[sArr.id.indexOf(id)];
    if (tileNum == 0){
      idZero.push(id);
      openZero();
    } else {
      showNum(id, tileNum);
    }
  }
}

function openZero(){
  while (idZero.length > 0){
    openChain(idZero[0]);
    let opened = idZero.shift();
    zeroOpen.push(opened);
    //tText.innerHTML += "<br>" + idZero;
  }
}



function openChain(t){
  let id = t;
  let tNum = sArr.num[sArr.id.indexOf(id)];
  showNum(id, tNum);
  let idBox = [];
  for (let i1 = -1; i1 < 2; i1 ++){
    let colC = id.charCodeAt(0) + i1;
    let rowC;
    let idC;
    for (let i2 = -1; i2 < 2; i2 ++){
      rowC = id.charCodeAt(1) + i2;
      idC = String.fromCharCode(colC) + String.fromCharCode(rowC);
      if ((rowC < 65 || rowC > 80 || colC < 65 || colC > 80) == false){
        idBox.push(idC);
      }
    }
  }
  idBox.forEach(regZero);
  function regZero(value, index, arr){
    let tryNum = sArr.num[sArr.id.indexOf(value)];
    if (tryNum == 0 && idZero.includes(value) == false && zeroOpen.includes(value) == false && sArr.st[sArr.id.indexOf(value)] == 0){
      idZero.push(value);
    }
  }
  idBox.splice(idBox.indexOf(id), 1);
  //tText.innerHTML = idBox;
  idBox.forEach(tryOpen);
  function tryOpen(value, index, arr){
    let tryNum = sArr.num[sArr.id.indexOf(value)];
    if (fArr.tId.includes(value) == true){
      flagged --;
      let fArrId = fArr.tId.indexOf(value);
      let fElem = document.getElementById(fArr.fId[fArrId]);
      fElem.remove();
      fArr.tId.splice(fArrId, 1);
      fArr.fId.splice(fArrId, 1);
      fCount.textContent = "count: " + flagged + "/" + nBomb;
    }
    showNum(value, tryNum);
  }

}

function genGame(c){
  let colId = c.charCodeAt(0);
  let rowId = c.charCodeAt(1);
  let tIdEx = [];

  for (let i1 = -1; i1 < 2; i1 ++){
    let colExc = colId + i1;
    let rowExc;
    let idExc;
    for (let i2 = -1; i2 < 2; i2 ++){
      rowExc = rowId + i2;
      idExc = String.fromCharCode(colExc) + String.fromCharCode(rowExc);
      tIdEx.push(idExc);
    }
  }
  let tGen = idArr.slice();
  for (let i = 0; i < tIdEx.length; i ++){
    let tExc = tIdEx[i];
    tGen.splice(tGen.indexOf(tExc), 1);
  }

  if (nBomb >= tGen.length){
    bArr = tGen.slice();
  } else{
    for (let i = 0; i < nBomb; i ++){
      let bombId = tGen[Math.floor(Math.random() * tGen.length)];
      while (bArr.includes(bombId)){
        bombId = tGen[Math.floor(Math.random() * tGen.length)];
      }
      bArr.push(bombId);
    }
  }

  genNum();

}

function genNum(){
  let forNum = idArr.slice();
  for (let i = 0; i < bArr.length; i ++){
    let bExc = bArr[i];
    forNum.splice(forNum.indexOf(bExc), 1);
  }
  for (let i = 0; i < forNum.length; i ++){
    let tCheck  = forNum[i];
    let tBox = [];
    let bNum = 0;

    for (let i1 = -1; i1 < 2; i1 ++){
      let colC = tCheck.charCodeAt(0) + i1;
      let rowC;
      let idC;
      for (let i2 = -1; i2 < 2; i2 ++){
        rowC = tCheck.charCodeAt(1) + i2;
        idC = String.fromCharCode(colC) + String.fromCharCode(rowC);
        tBox.push(idC);
      }
    }
    tBox.forEach(doNum);
    function doNum(value, index, arr){
      if (bArr.includes(value) == true){
        bNum ++;
      }
    }
    sArr.id.push(tCheck);
    sArr.num.push(bNum);
    sArr.st.push(0);
          
  }
}

function openAround(t){
  let opId = t;
  let colId = opId.charCodeAt(0);
  let rowId = opId.charCodeAt(1);
  let tIdOp = [];
  let cFlagged = [];
  let unFlagged = [];

  for (let i1 = -1; i1 < 2; i1 ++){
    let colOp = colId + i1;
    let rowOp;
    let idOp;
    for (let i2 = -1; i2 < 2; i2 ++){
      rowOp = rowId + i2;
      idOp = String.fromCharCode(colOp) + String.fromCharCode(rowOp);
      if ((rowOp < 65 || rowOp > 80 || colOp < 65 || colOp > 80) == false){
        tIdOp.push(idOp);
      }
    }
  }

  tIdOp.forEach(checkFlag);
  function checkFlag(value, index, arr){
    if (fArr.tId.includes(value) == true){
      cFlagged.push(value);
    } else {
      unFlagged.push(value);
    }
  }
  //tText.innerHTML = "(" + sArr.num[sArr.id.indexOf(opId)] + ") " + cFlagged + "||" + unFlagged;
  if (cFlagged.length == sArr.num[sArr.id.indexOf(opId)]){
    if (flagTrue() == true){
      unFlagged.forEach(function regZero(value, index, arr){
        let tryNum = sArr.num[sArr.id.indexOf(value)];
        if (tryNum == 0 && idZero.includes(value) == false && zeroOpen.includes(value) == false && sArr.st[sArr.id.indexOf(value)] == 0){
          idZero.push(value);
        }
      })
      unFlagged.forEach(function doOpen(value, index, array){
        let openNum = sArr.num[sArr.id.indexOf(value)];
        showNum(value, openNum);
      })
      openZero();
    } else {
      showBomb();
    }
    function flagTrue(){
      for (let i = 0; i < cFlagged.length; i ++){
        if (bArr.includes(cFlagged[i]) == false){
        return false
        }
      }
      return true;
    }

  }

}

function showNum(c, n){
  let tnId = c;
  const tTile = document.getElementById(c);
  tTile.setAttribute("fill", "gainsboro");
  if (n !== 0 && sArr.st[sArr.id.indexOf(tnId)] == 0){
    let nText = document.createTextNode(n);
    let clr = numClr[n - 1];
    let col = tnId.charCodeAt(0) - 64;
    let row = tnId.charCodeAt(1) - 64;
    let x = x0 + (col - 1)*u;
    let y = y0 + (row - 1) * u;
    const tNum = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tNum.setAttribute("x", x + 5);
    tNum.setAttribute("y", y + 20);
    tNum.setAttribute("fill", clr);
    tNum.setAttribute("stroke", clr);
    tNum.setAttribute("font-size", 15);
    tNum.setAttribute("class", "number");
    tNum.appendChild(nText);
    svgF.appendChild(tNum);
    sArr.st[sArr.id.indexOf(tnId)] = 1;

    const oTile = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    oTile.setAttribute("x", x);
    oTile.setAttribute("y", y);
    oTile.setAttribute("fill", "transparent");
    oTile.setAttribute("stroke", "transparent");
    oTile.setAttribute("stroke-width", 1);
    oTile.setAttribute("class", "tile");
    oTile.setAttribute("id", tnId);
    oTile.addEventListener("dblclick", function (){
    openAround(tnId);
    });
    svgF.appendChild(oTile);
  }
  tTile.removeEventListener("click", handArr.func[handArr.id.indexOf(tnId)])
  tTile.addEventListener("dblclick", function (){
    openAround(tnId);
  });

}


function showBomb(){
  
  for (let i = 0; i < bArr.length; i ++){
    let bId = bArr[i];
    const tBomb = document.getElementById(bId);
    tBomb.setAttribute("fill", "red");
    let col = bId.charCodeAt(0) - 64;
    let row = bId.charCodeAt(1) - 64;
    let x = x0 + (col - 1)*u;
    let y = y0 + (row - 1) * u;
    const nB = document.createElementNS("http://www.w3.org/2000/svg", "image");
    nB.setAttribute("x", x + 5);
    nB.setAttribute("y", y + 5);
    nB.setAttribute("href", bLink);
    nB.setAttribute("height", 15);
    nB.setAttribute("width", 15);
    nB.setAttribute("class", "bomb");
    svgF.appendChild(nB);
  }
  tText.innerHTML = "You lose!";
}

function addFlag(c){
  if (fArr.tId.includes(c) == true){
    flagged --;
    let fArrId = fArr.tId.indexOf(c);
    let fElem = document.getElementById(fArr.fId[fArrId]);
    fElem.remove();
    fArr.tId.splice(fArrId, 1);
    fArr.fId.splice(fArrId, 1);
    fCount.textContent = "count: " + flagged + "/" + nBomb;
  } else {  
    flagIt(c);
  }
  if (flagged == nBomb){
    checkWin();
  }
}

function flagIt(c){
  const tileF = document.getElementById(c);
  flagged ++;
  let flagId = "f" + flagged;
  let col = c.charCodeAt(0) - 64;
  let row = c.charCodeAt(1) - 64;
  let x = x0 + (col - 1)*u;
  let y = y0 + (row - 1) * u;
  const nF = document.createElementNS("http://www.w3.org/2000/svg", "image");
  nF.setAttribute("x", x + 5);
  nF.setAttribute("y", y + 5);
  nF.setAttribute("href", fLink);
  nF.setAttribute("height", 15);
  nF.setAttribute("width", 15);
  nF.setAttribute("id", flagId);
  nF.setAttribute("class", "flag");
  svgF.appendChild(nF);
  fCount.textContent = "count: " + flagged + "/" + nBomb;
  fArr.tId.push(c);
  fArr.fId.push(flagId);
}

function checkWin(){
  let fArrC = fArr.tId;
  if (checkSame() == true){
    tText.innerHTML = "You win!";
    stBut.removeAttribute("disabled");
  };
  function checkSame(){
    for (let i = 0; i < bArr.length; i ++){
      if (fArrC.includes(bArr[i]) == false){
        return false
      }
    }
    return true;
  }
}

function solveGame(){
  if (m > 0){
    sArr.id.forEach(function openAll(value, index, arr){
      let tileNum = sArr.num[index];
      showNum(value, tileNum);
    })
    bArr.forEach(function flagAll(value, index, arr){
      flagIt(value);
    })
    checkWin();
  }
}

function newGame(){
  const fReset = document.getElementsByClassName("flag");
  while (fReset.length > 0){
    fReset[0].remove();
  }
  const bReset = document.getElementsByClassName("bomb");
  while (bReset.length > 0){
    bReset[0].remove();
  }
  const nReset = document.getElementsByClassName("number");
  while (nReset.length > 0){
    nReset[0].remove();
  }
  const tReset = document.getElementsByClassName("tile");
  while (tReset.length > 0){
    tReset[0].remove();
  }
  idZero.length = 0;
  zeroOpen.length = 0;
  bArr.length = 0;
  idArr.length = 0;
  sArr.id.length = 0;
  sArr.num.length = 0;
  sArr.st.length = 0;
  fArr.tId.length = 0;
  fArr.fId.length = 0;
  handArr.id.length = 0;
  handArr.func.length = 0;
  svBut.setAttribute("disabled","");
  m = 0;
  flagged = 0;
  tText.innerHTML = "-";
  fCount.textContent = "count: " + flagged + "/" + nBomb;

  drawTiles();
}

function keyDown(event){
  let key = event.key;
  if (key = "Control"){
    ctrl = true;
  }
}

function keyUp(event){
  let key = event.key;
  if (key = "Control"){
    ctrl = false;
  }
}

function changeType(){
  if (ctrl == false){
    ctrl = true;
    chBut.innerHTML = "Flag";
  } else if (ctrl == true){
    ctrl = false;
    chBut.innerHTML = "Open";
  }
}
