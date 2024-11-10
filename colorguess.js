const svgF = document.getElementById("svgT");
const r0 = document.getElementById("r0");
const svgNS = "http://www.w3.org/2000/svg";
const tText = document.getElementById("tText");


let dSmol = 1;
let dBig = 6;
let uBig = 30;
let uSmol = (uBig/2) - dSmol;
let clr = ["red", "yellow", "lime", "navy", "orange", "purple"];
let eBx = (500 - (4*uBig + 4*dBig + 2*uSmol + 2*dSmol))/2;
let eBy = (500 - (11*uBig + 10*dBig))/2 + 20;

let cArr = {
	clr: [],
  num: []
}
let handArr = {
	id: [],
  func: []
}
let ans = [];

let row = 0;

drawBoard();
genGame();



function drawBoard(){
	for (let i = 0; i < 40; i ++){
  	let x = eBx + uBig/2 + (i % 4)*(uBig + dBig);
    let y = eBy + uBig/2 + (Math.floor(i/4))*(uBig + dBig);
    let rowNum = (Math.floor(i/4));
    let circleNum = (i % 4) + 1;
    let idB = "r" + rowNum + "b" + circleNum;
    let handler = function(){showChoice(idB);};
    handArr.id.push(idB);
    handArr.func.push(handler);


    const uB = document.createElementNS(svgNS, "circle");
    uB.setAttribute("r", uBig/2);
    uB.setAttribute("cx", x);
    uB.setAttribute("cy", y);
    uB.setAttribute("fill", "lightgray");
    uB.setAttribute("stroke", "black");
    uB.setAttribute("id", idB);
    uB.addEventListener("click", handler);
    svgF.appendChild(uB);
    
    if (i % 4 == 3){
    	for (let i2 = 0; i2 < 4; i2 ++){
        let xS = eBx + ((i % 4) + 1)*(uBig + dBig) + uSmol/2 + (i2 % 2)*(uSmol + 2*dSmol);
        let yS = y - uBig/2 + uSmol/2 + (Math.floor(i2/2))*(uSmol + 2*dSmol);
        let circleSNum = i2 + 1;
        let idS = "r" + rowNum + "s" + circleSNum;
        const uS = document.createElementNS(svgNS, "circle");
        uS.setAttribute("r", uSmol/2);
        uS.setAttribute("cx", xS);
        uS.setAttribute("cy", yS);
        uS.setAttribute("fill", "lightgray");
        uS.setAttribute("stroke", "black");
        uS.setAttribute("id", idS);
        svgF.appendChild(uS);
      }
      if (i !== 3){
      	let xR = eBx - 1;
        let yR = y - uBig/2 - 1;
        let oRow = (Math.floor(i/4));
        const oR = document.createElementNS(svgNS, "rect");
        oR.setAttribute("x", xR);
        oR.setAttribute("y", yR);
        oR.setAttribute("width", 4*(uBig + dBig) + uBig + 2);
        oR.setAttribute("height", uBig + 2);
        oR.setAttribute("fill", "transparent");
        oR.setAttribute("stroke", "transparent");
        oR.setAttribute("id", "o" + oRow);
        svgF.appendChild(oR);
      }
      
    }
    
    if (i == 39){
    	for (let i3 = 0; i3 < 4; i3 ++){
      	let xA = eBx + uBig/2 + (i3 % 4)*(uBig + dBig);
        let yA = y + (uBig + dBig);
        let circleANum = i3 + 1;
        let idA = "ans" + circleANum;
        const uAns = document.createElementNS(svgNS, "circle");
        uAns.setAttribute("r", uBig/2);
        uAns.setAttribute("cx", xA);
        uAns.setAttribute("cy", yA);
        uAns.setAttribute("fill", "lightgray");
        uAns.setAttribute("stroke", "black");
        uAns.setAttribute("id", idA);
        svgF.appendChild(uAns);
      }
      const lineA = document.createElementNS(svgNS, "line");
      lineA.setAttribute("x1", eBx);
      lineA.setAttribute("y1", y + uBig/2 + dBig/2 - 1);
      lineA.setAttribute("x2", eBx + 4*(uBig + dBig) + uBig);
      lineA.setAttribute("y2", y + uBig/2 + dBig/2 - 1);
      lineA.setAttribute("stroke", "black");
      svgF.appendChild(lineA);
    }
    
  }

}

function genGame(){
	for (let i = 0; i < 4; i ++){
  	let randClr = clr[Math.floor(Math.random()*6)];
    let num = i + 1;
    let id = "ans" + num;
    const tA = document.getElementById(id);
    tA.setAttribute("fill", randClr);
    ans.push(randClr);
  }
  let xR = eBx - 1;
  let yR = eBy + 10*(uBig + dBig) - 1;
  const oR = document.createElementNS(svgNS, "rect");
  oR.setAttribute("x", xR);
  oR.setAttribute("y", yR);
  oR.setAttribute("width", 4*(uBig + dBig) + uBig + 2);
  oR.setAttribute("height", uBig + 2);
  oR.setAttribute("fill", "lightgray");
  oR.setAttribute("stroke", "transparent");
  oR.setAttribute("id", "oAns");
  svgF.appendChild(oR);
  
  //tText.innerHTML = ans;
  
}


function showChoice(id){
	const tBig = document.getElementById(id);
  let x = tBig.getAttribute("cx");
  let y = tBig.getAttribute("cy");
    
  let uCh = uBig;
  let wCh = 3*uCh + 4*dSmol + 10;
  let hCh = 2*uCh + 3*dSmol + 4;
  let xCh = x - (wCh/2);
  let yCh = y - uBig/2 - hCh - 5;
  
  let xP1 = x - 5 + ",";
  let yP1 = y - uBig/2 - 5 + " ";
  let xP2 = x - (0 - 5) + ",";
  let yP2 = y - uBig/2 - 5 + " ";
  let xP3 = x + ",";
  let yP3 = y - uBig/2 - 1;
  let pointsP = xP1 + yP1 + xP2 + yP2 + xP3 + yP3;
  
  const r1 = document.createElementNS(svgNS, "rect");
  r1.setAttribute("x", 0);
  r1.setAttribute("y", 0);
  r1.setAttribute("width", 500);
  r1.setAttribute("height", 500);
  r1.setAttribute("fill", "transparent");
  r1.setAttribute("stroke", "transparent");
  r1.setAttribute("class", "choice");
  svgF.appendChild(r1);
  r1.addEventListener("click", clearChoice);
  
  const tCh = document.createElementNS(svgNS, "rect");
  tCh.setAttribute("x", xCh);
  tCh.setAttribute("y", yCh);
  tCh.setAttribute("width", wCh);
  tCh.setAttribute("height", hCh);
  tCh.setAttribute("fill", "lightgray");
  tCh.setAttribute("stroke", "transparent");
  tCh.setAttribute("class", "choice");
  svgF.appendChild(tCh);
  
  const tP = document.createElementNS(svgNS, "polygon");
  tP.setAttribute("points", pointsP);
  tP.setAttribute("fill", "lightgray");
  tP.setAttribute("stroke", "transparent");
  tP.setAttribute("class", "choice")
  svgF.appendChild(tP);
 
  
  for (let i = 0; i < 6; i ++){
  	let xCl = xCh + dSmol + 5 + uCh/2 + (i % 3)*(uCh + dSmol);
    let yCl = yCh + dSmol + 2 + uCh/2 + (Math.floor(i/3))*(uCh + dSmol);
    let c = clr[i];
    
    const uCl = document.createElementNS(svgNS, "circle");
    uCl.setAttribute("r", uCh/2);
    uCl.setAttribute("cx", xCl);
    uCl.setAttribute("cy", yCl);
    uCl.setAttribute("fill", c);
    uCl.setAttribute("class", "choice");
    uCl.addEventListener("click", function(){pickClr(id, c)});
    svgF.appendChild(uCl);
  }
  
}

function checkRow(){
  if (cArr.num.length == 4){
  	for (let i = 0; i < 4; i ++){
    	let num = i + 1;
      let id = "r" + row + "s" + num;
      const cS = document.getElementById(id);
      cS.setAttribute("fill", "cyan");
    }
    let xR = eBx + 4*(uBig + dBig) - 1;
    let yR = eBy + row*(uBig + dBig) - 1;
    const oR = document.createElementNS(svgNS, "rect");
    oR.setAttribute("x", xR);
    oR.setAttribute("y", yR);
    oR.setAttribute("width", uBig + 2);
    oR.setAttribute("height", uBig + 2);
    oR.setAttribute("fill", "transparent");
    oR.setAttribute("stroke", "transparent");
    oR.setAttribute("class", "oEval");
    oR.addEventListener("click", evalRow)
    svgF.appendChild(oR);
  }
  
}

function evalRow(){
  for (i = 0; i < 4; i ++){
  	let num = i + 1;
    let id = "r" + row + "b" + num;
    const tBig = document.getElementById(id);
    tBig.removeEventListener("click", handArr.func[handArr.id.indexOf(id)]);
  }
  const overEval = document.getElementsByClassName("oEval");
  while (overEval.length > 0){
  	overEval[0].remove();
  }
  
  let evalClr = [];
  for (let i = 0; i < 4; i ++){
  	let num = i + 1;
    let ind = cArr.num.indexOf(num.toString());
    evalClr.push(cArr.clr[ind]);
  }
  
  let clrTrue = [];
  let evcTrue = evalClr.slice(0);
  ans.forEach(function(value, index, arr){
    let z = 0;
    while (z < evcTrue.length){
    	if (value == evcTrue[z]){
      	let indTrue = evcTrue.indexOf(value);
        evcTrue.splice(indTrue, 1);
        clrTrue.push(value);
        break;
      }
      z ++;
    }
  })
  
  let posTrue = 0;
  evalClr.forEach(function(value, index, arr){
    if (ans[index] == value){
      posTrue ++;
    }
  })
  
  let nClr = clrTrue.length;
  let pClr = posTrue;
  
  for (let i = 0; i < 4; i ++){
  	let num = i + 1;
    let idS = "r" + row + "s" + num;
    let tSmol = document.getElementById(idS);
    let clrIt;
    if (num <= nClr){
    	if (num <= pClr){
      	clrIt = "black";
      } else {
      	clrIt = "white";
      }
    } else {
    	clrIt = "lightgray";
    }
    tSmol.setAttribute("fill", clrIt);
  }
  
  
  
  //tText.innerHTML = evalClr + " | " + clrTrue + " | " + posTrue;
	
  if (nClr == 4 && pClr == 4){
  	tText.innerHTML = "You win!"
    document.getElementById("oAns").remove();
  } else if (row == 9) {
    tText.innerHTML = "You lose!"
    document.getElementById("oAns").remove();
  } else {
    let rowOpen = (row + 1);
    let idRow = "o" + rowOpen;
    const overRow = document.getElementById(idRow);
    overRow.remove();
    cArr.num.length = 0;
    cArr.clr.length = 0;
    row ++;
  }
  
}



function clearChoice(){
  const chElem = document.getElementsByClassName("choice");
  while (chElem.length > 0){
  	chElem[0].remove();
  }
}

function pickClr(id, c){
	const tBig = document.getElementById(id);
  let rowNum = id.slice(1, 2);
  let circleNum = id.slice(3, 4);
  tBig.setAttribute("fill", c);
  if (cArr.num.includes(circleNum) == true){
  	let ind = cArr.num.indexOf(circleNum);
    cArr.num.splice(ind, 1);
    cArr.clr.splice(ind, 1);
  }
  cArr.num.push(circleNum);
  cArr.clr.push(c);
  checkRow();
  clearChoice();
}

function restartGame(){
	cArr.num.length = 0;
  cArr.clr.length = 0;
  handArr.id.length = 0;
  handArr.func.length = 0;
  ans.length = 0;
  row = 0;
  tText.innerHTML = "";
  while (svgF.childNodes.length > 2){
  	let rmv = svgF.lastChild;
    rmv.remove();
  }
  drawBoard();
  genGame();
}
