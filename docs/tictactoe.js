const svgNS = "http://www.w3.org/2000/svg";
const svgF = document.getElementById("svgF");
const stBut = document.getElementById("stBut");
const cover = document.getElementById("c");
const blanker = document.getElementById("blanker");
const tText = document.getElementById("theText");

const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");
const p4 = document.getElementById("p4");
const p5 = document.getElementById("p5");
const p6 = document.getElementById("p6");
const p7 = document.getElementById("p7");
const p8 = document.getElementById("p8");
const p9 = document.getElementById("p9");

const pColl = [p1, p2, p3, p4, p5, p6, p7, p8, p9];
const funcHandler = [];
let pAvail;

const myPos = [];
const comPos = [];

//tText.innerHTML = pColl[1].getAttribute("x");


let myPiece;
let comPiece;

function setFunc(){
	for (let i = 0; i < pColl.length; i ++){
  	let makeFunc = function(){drawPiece(i+1, "me")};
    funcHandler.push(makeFunc);
    pColl[i].addEventListener("click", makeFunc);
  }
}

function startGame(){
	setFunc();
  pAvail = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  let whoFirst = Math.floor(Math.random()*2);
  
  if (whoFirst == 0){
  	myPiece = "X";
    comPiece = "O";
    tText.innerHTML = "You play first!";
    cover.style.visibility = "hidden";
  } else if (whoFirst == 1){
  	myPiece = "O";
    comPiece = "X";
    tText.innerHTML = "Computer plays first!";
    setTimeout(function(){
    	comPlay();
      cover.style.visibility = "hidden";
    }, 800);
  }
  

  blanker.style.visibility = "hidden";
  stBut.innerHTML = "Restart Game!";
  stBut.removeAttribute("onclick");
  stBut.addEventListener("click", restartGame);
  
}



function drawPiece(n, who){
	let piece;
  if (who == "me"){
  	piece = myPiece;
  } else if (who =="com"){
  	piece = comPiece;
  }
  let pos = pColl[n-1];
  let posX = Number(pos.getAttribute("x"));
  let posY = Number(pos.getAttribute("y"));
  let posW = Number(pos.getAttribute("width"));
  let d = 10;
  let theId = "pc" + n;

  if (piece == "X"){
  	const line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", posX + d);
    line1.setAttribute("y1", posY + d);
    line1.setAttribute("x2", posX + posW - d);
    line1.setAttribute("y2", posY + posW - d);
    line1.setAttribute("stroke", "red");
    line1.setAttribute("stroke-width", 3);
    line1.setAttribute("class", "piece");
    svgF.appendChild(line1);
    
    const line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", posX + d);
    line2.setAttribute("y1", posY + posW - d);
    line2.setAttribute("x2", posX + posW - d);
    line2.setAttribute("y2", posY + d);
    line2.setAttribute("stroke", "red");
    line2.setAttribute("stroke-width", 3);
    line2.setAttribute("class", "piece");
    svgF.appendChild(line2);

  } else if (piece == "O") {
  	const circ = document.createElementNS(svgNS, "circle");
    circ.setAttribute("r", (posW - 2*d)/2);
    circ.setAttribute("cx", posX + posW/2);
    circ.setAttribute("cy", posY + posW/2);
    circ.setAttribute("stroke", "blue");
    circ.setAttribute("stroke-width", 3);
    circ.setAttribute("fill", "transparent");
    circ.setAttribute("class", "piece");
    svgF.appendChild(circ);
    
  }
  
  pAvail.splice(pAvail.indexOf(n), 1);
  pos.removeEventListener("click", funcHandler[n-1]);
  
  //tText.innerHTML = pAvail;
  
  if (who == "me"){
  	cover.style.visibility = "visible";
    myPos.push(n);
    let isWin = checkWin("me");
    if (isWin == false && pAvail.length !== 0){
    	setTimeout(comPlay, 800);
    }
  } else if (who == "com"){
  	comPos.push(n);
    checkWin("com");
  }
  
  //tText.innerHTML = myPos + " || " + comPos;
}

function comPlay(){
	let randomNum = Math.floor(Math.random()*pAvail.length);
  cover.style.visibility = "hidden";
  drawPiece(pAvail[randomNum], "com");
}


function checkWin(who){
	let chPos;
  let win = false;
  let theWinner;
  if (who == "me"){
  	chPos = myPos;
    theWinner = "you";
  } else if (who == "com"){
  	chPos = comPos;
    theWinner = "computer";
  }
  
  
  let a;
  let thePair;
  let b;
  let c;
  
  if (chPos.includes(1)){
  	
    thePair = [[2,3], [4,7], [5,9]];
    for (let i = 0; i < thePair.length; i ++){
    	let ch = thePair[i];
      if (chPos.includes(ch[0]) && chPos.includes(ch[1])){
      	win = true;
        a = 1;
        b = ch[0];
        c = ch[1];
      }
    }
  }
  if (chPos.includes(5)){
  	
    thePair = [[2,8], [4,6], [3,7]];
    for (let i = 0; i < thePair.length; i ++){
    	let ch = thePair[i];
      if (chPos.includes(ch[0]) && chPos.includes(ch[1])){
      	win = true;
        a = 5;
        b = ch[0];
        c = ch[1];
      }
    }
  }
  if (chPos.includes(9)){
  	
    thePair = [[7,8], [3,6]];
    for (let i = 0; i < thePair.length; i ++){
    	let ch = thePair[i];
      if (chPos.includes(ch[0]) && chPos.includes(ch[1])){
      	win = true;
        a = 9;
        b = ch[0];
        c = ch[1];
      }
    }
  }
  
  if (win == false && pAvail.length == 0){
  	tText.innerHTML = "Draw!";
  }
  
  //tText.innerHTML = chPos + " | " + win;
  
  if (win == true){
  	
  	tText.innerHTML = "The winner is " + theWinner + "!";
    cover.style.visibility = "visible";
    
  }
  return win;
}

function restartGame(){
	blanker.style.visibility = "visible";
  const pieces = document.getElementsByClassName("piece");
  while(pieces.length > 0){
  	pieces[0].remove();
  }
  
  for (let i = 0; i < funcHandler.length; i ++){
  	pColl[i].removeEventListener("click", funcHandler[i]);
  }
  
  funcHandler.length = 0;
  myPos.length = 0;
  comPos.length = 0;
  pAvail = [1,2,3,4,5,6,7,8,9];
  setFunc();
  
  let whoFirst = Math.floor(Math.random()*2);
  
  if (whoFirst == 0){
  	myPiece = "X";
    comPiece = "O";
    tText.innerHTML = "You play first!";
    cover.style.visibility = "hidden";
  } else if (whoFirst == 1){
  	myPiece = "O";
    comPiece = "X";
    tText.innerHTML = "Computer plays first!";
    setTimeout(function(){
    	comPlay();
      cover.style.visibility = "hidden";
    }, 800);
  }
  
  
  setTimeout(function(){
  	blanker.style.visibility = "hidden";
  }, 500)
  
  
}
