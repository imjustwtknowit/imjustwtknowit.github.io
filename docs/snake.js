const tText = document.getElementById("text");
const tScore = document.getElementById("scoreBoard");
const mapType = document.getElementById("map");
const stBut = document.getElementById("startBut");
const svgNS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("svgT");

const size = 25;
const wBox = Number(svg.getAttribute("width"));
const sizeInc = wBox/size;

let snakeLength;
let snakeColor;

let snakeMoving;

let headBlink;

const snakeHead = {
	heading: [],
  pos: []
}

const regPixel = {
	pos: [],
  id: []
}

let foodPos;

let s = 0;
let f = 0;
let w = 0;
let score = 0;

let xTouch1;
let xTouch2;
let yTouch1;
let yTouch2;

//drawField();

function restartGame(){
	while (document.getElementsByClassName("snake").length > 0){
  	document.getElementsByClassName("snake")[0].remove();
  }
  
  while (document.getElementsByClassName("wall").length > 0){
  	document.getElementsByClassName("wall")[0].remove();
  }
  
  if (document.getElementById("f") !== null){
  	document.getElementById("f").remove();
  }
	clearTimeout(headBlink);
  headBlink = undefined;
  if (document.getElementById("h") !== null){
  	document.getElementById("h").remove();
  }
  
  
  snakeLength = 5;
  snakeColor = "red";
  clearInterval(snakeMoving);
  snakeMoving = undefined;
  
  snakeHead.heading.length = 0;
  snakeHead.pos.length = 0;
  regPixel.id.length = 0;
  regPixel.pos.length = 0;
  foodPos = undefined;
  
  s = 0;
  f = 0;
  w = 0;
  score = 0;
  tScore.innerHTML = "Score: " + score;
  stBut.innerHTML = "New Game";
  
  createWall(mapType.value);
  createSnake();
  createFood();

}



function drawField(){
  for (let i = 0; i < size; i ++){
    const vLine = document.createElementNS(svgNS, "line");
    vLine.setAttribute("x1", i*sizeInc);
    vLine.setAttribute("y1", 0);
    vLine.setAttribute("x2", i*sizeInc);
    vLine.setAttribute("y2", wBox);
    vLine.setAttribute("stroke", "gainsboro");
    vLine.setAttribute("stroke-width", 0.5);
    svg.appendChild(vLine);

    const hLine = document.createElementNS(svgNS, "line");
    hLine.setAttribute("x1", 0);
    hLine.setAttribute("y1", i*sizeInc);
    hLine.setAttribute("x2", wBox);
    hLine.setAttribute("y2", i*sizeInc);
    hLine.setAttribute("stroke", "gainsboro");
    hLine.setAttribute("stroke-width", 0.5);
    svg.appendChild(hLine);


  }
  
  
}

function createWall(type){
	let half;
  if (size%2 == 0){
  	half = -1 + size/2;
  } else {
  	half = (size - 1)/2;
  }
  let d;
  switch (type){
  	case "single":
      d = 15;
      let p;
      if ((size - d)%2 == 0){
      	p = (size - d)/2;
      } else {
      	p = (size - d - 1)/2;
      }
      for (let i = 0; i < d; i ++){
        dPx(half, p + i, "gray", "w");
      }
    	break;
    case "cross":
    	d = 15;
      let q;
      if ((size - d)%2 == 0){
      	q = (size - d)/2;
      } else {
      	q = (size - d - 1)/2;
      }
      for (let i = 0; i < d; i ++){
        dPx(half, q + i, "gray", "w");
        dPx(q + i, half, "gray", "w");
      }
    	break;
    case "half":
    	for (let i = 0; i < size; i ++){
        dPx(half, i, "gray", "w");
      }
    	break;
    case "box":
    	for (let i = 0; i < size; i ++){
        dPx(i, 0, "gray", "w");
        dPx(0, i, "gray", "w");
        dPx(i, size - 1, "gray", "w");
        dPx(size - 1, i, "gray", "w");
      }
    	break;
    case "corner":
    	d = 5;
      for (let i = 0; i < d*2; i ++){
        dPx(i%d, Math.floor(i/d)*(size - 1), "gray", "w");
        dPx(size - d + (i%d), Math.floor(i/d)*(size - 1), "gray", "w");
        dPx(Math.floor(i/d)*(size - 1), i%d, "gray", "w");
        dPx(Math.floor(i/d)*(size - 1), size - d + i%d, "gray", "w");
      }
    	break;
    case "fan":
    	d = 5;
      for (let i = 0; i < half + 2; i ++){
      	dPx(d, i, "gray", "w");
        dPx(i, size - 1 - d, "gray", "w");
        dPx(size - 1 - d, size - 1 - i, "gray", "w");
        dPx(size - 1 - i, d, "gray", "w");
      }
      break;
    case "alleys":
    	d = 5;
    	for (let i = 0; i < size - d; i ++){
      	dPx(i, Math.floor(size/4), "gray", "w");
        dPx(size - 1 - i, 3*Math.floor(size/4), "gray", "w");
        dPx((Math.floor(i/2)*((-1)**i))+(size - 1)*(i%2), Math.floor(size/2), "gray", "w");
      }
      break;
    case "rooms":
    	d = Math.floor(size/3);
      for (let i = 0; i < size; i ++){
				if (i < size - Math.floor(d/2)){
          dPx((Math.floor(i/2)*((-1)**i))+(size - 1)*(i%2), d, "gray", "w");
        }
        if (i < d){
        	dPx(size - 1 - d, size - 1 - i, "gray", "w");
          dPx(Math.floor((size - Math.floor(d/2))/2), i, "gray", "w");
        }
        if (i < 3){
        	dPx(0, i, "gray", "w");
          dPx(i, 0, "gray", "w");
        }
        if (i < size - 3 - d){
        	dPx(3 + Math.floor(d/2) + i, 0, "gray", "w");
        }
        
        dPx(i, size - 1 - d, "gray", "w");
      }
      break;
    case "none":
    	break;
    default:
    	tText.innerHTML = "Error!"
  }
  
  
}

function dPx(x, y, c, type){
  let pixelId;
  let classId;
  switch(type){
  	case "s":
      pixelId = type + s;
      classId = "snake";
      s ++;
      break;
    case "f":
      pixelId = type;
      classId = "food";
      f ++;
      break;
    case "h":
    	pixelId = type;
      classId = "head";
      break;
    case "w":
    	pixelId = type + w;
      classId = "wall";
      w ++;
      break;
    default:
    	tText.innerHTML = "Error!"
  }
  
  
  const pixel = document.createElementNS(svgNS, "rect");
  pixel.setAttribute("x", x*sizeInc);
  pixel.setAttribute("y", y*sizeInc);
  pixel.setAttribute("width", sizeInc);
  pixel.setAttribute("height", sizeInc);
  pixel.setAttribute("fill", c);
  pixel.setAttribute("id", pixelId);
  pixel.setAttribute("class", classId);
  pixel.setAttribute("stroke", "gainsboro");
  pixel.setAttribute("stroke-width", 0.5);
  svg.appendChild(pixel);
  
  let posX = x.toString().padStart(2, "0");
  let posY = y.toString().padStart(2, "0");
  let thePos = posX + posY;
  
  regPixel.pos.push(thePos);
  regPixel.id.push(pixelId);
  //tText.innerHTML = regPixel.pos;
  
}



function createSnake(){
  let randY;
  let randX;
  let thePos;
  let isValid
  function randomHeadPos(){
  	isValid = true;
    randY = Math.floor(Math.random() * size);
    let shift = snakeLength;
    randX = shift + Math.floor(Math.random() * (size/2 - shift));
    
    for (let i = 0; i < snakeLength; i ++){
    	let posX = (randX - i).toString().padStart(2, "0");
    	let posY = randY.toString().padStart(2, "0");
    	let posPixel = posX + posY;
      if (i == 0){
      	thePos = posPixel;
      }
      regPixel.pos.forEach(function(value, index, arr){
      	if (value == posPixel){
        	isValid = false;
        }
      })
    }
  }
  randomHeadPos()
  while (isValid == false){
  	randomHeadPos();
  }
  
  //tText.innerHTML = thePos;
  
  for (let i = 0; i < snakeLength; i ++){
  	dPx(randX - i,randY, snakeColor, "s");
    let pixelId = "s" + i;
    document.getElementById(pixelId).classList.add("h+");
  }
  

  document.getElementById("s0").setAttribute("fill", "black");

  
  snakeHead.heading.push("h+");
  snakeHead.pos.push(thePos);
  
  snakeMoving = setInterval(function(){
  	moveSnake();
  }, 200);
}


function startTouch(event){
	
  xTouch1 = event.touches[0].clientX;
  yTouch1 = event.touches[0].clientY;
}

function slideTouch(event){
	event.preventDefault();
  xTouch2 = event.touches[0].clientX;
  yTouch2 = event.touches[0].clientY;

}

function regTouch(event){
  let xSlide = xTouch2 - xTouch1;
  let ySlide = yTouch2 - yTouch1;
  if (Math.abs(xSlide) > Math.abs(ySlide)){
  	if (xSlide > 0){
    	changeHeading("d")
    } else if (xSlide < 0){
    	changeHeading("a");
    }
  } else {
  	if (ySlide > 0){
    	changeHeading("s")
    } else if (ySlide < 0){
    	changeHeading("w");
    }
  }
}


function keyDown(event){
	let key = event.key;
  changeHeading(key);
}

function changeHeading(key){
	const snakePixel = document.getElementById("s0");
  let posX = Number(snakePixel.getAttribute("x"))/sizeInc;
  let posY = Number(snakePixel.getAttribute("y"))/sizeInc;
  let thePos = posX.toString().padStart(2, "0") + posY.toString().padStart(2, "0");
  
  let lastHeading = snakePixel.classList.item(1).charAt(0);
  //tText.innerHTML = lastHeading;


  if (key == "a" || key == "A" || key == "d" || key == "D"){
  	if (lastHeading == "v"){
    	
      if (key == "a" || key == "A"){
      	snakeHead.heading.push("h-");
        snakeHead.pos.push(thePos);
        
      } else if (key == "d" || key == "D") {
      	snakeHead.heading.push("h+");
        snakeHead.pos.push(thePos);
      }
      
    }
 
  } else if (key == "w" || key == "W" || key == "s" || key == "S"){
  	if (lastHeading == "h"){
    	if (key == "w" || key == "W"){
      	snakeHead.heading.push("v-");
        snakeHead.pos.push(thePos);
        
      } else if (key == "s" || key == "S") {
      	snakeHead.heading.push("v+");
        snakeHead.pos.push(thePos);
      }
    }
    
    
  }
  //tText.innerHTML = snakeHead.heading + "||" + snakeHead.pos;
  
}

function moveSnake(){
  for (let i = 0; i < snakeLength; i ++){
  	let pixelId = "s" + i;
    const snakePixel = document.getElementById(pixelId);
    let posXOld = Number(snakePixel.getAttribute("x"))/sizeInc;
    let posYOld = Number(snakePixel.getAttribute("y"))/sizeInc;
    let thePosOld = posXOld.toString().padStart(2, "0") + posYOld.toString().padStart(2, "0");
    //tText.innerHTML += thePosOld;
    
    let oldHeading = snakePixel.classList.item(1);
    //tText.innerHTML += oldHeading;
    
    let xMove;
    let yMove;
    let posXNew;
    let posYNew;
    if (snakeHead.pos.includes(thePosOld)){
    	let ind = snakeHead.pos.indexOf(thePosOld);
      let newHeading = snakeHead.heading[ind];
      switch (newHeading){
      	case "h+":
        	xMove = 1;
          yMove = 0;
          break;
        case "h-":
        	xMove = -1;
          yMove = 0;
          break;
        case "v+":
        	xMove = 0;
          yMove = 1;
          break;
        case "v-":
        	xMove = 0;
          yMove = -1;
          break;
        default:
        	tText.innerHTML = "Error!";
      }
      posXNew = posXOld + xMove;
      posYNew = posYOld + yMove;
      posXNew = checkTeleport(posXNew);
      posYNew = checkTeleport(posYNew);
      
      snakePixel.classList.replace(oldHeading, newHeading);
      snakePixel.setAttribute("x", posXNew*sizeInc);
      snakePixel.setAttribute("y", posYNew*sizeInc);
      if (i == snakeLength - 1){
      	snakeHead.heading.splice(ind, 1);
        snakeHead.pos.splice(ind, 1);
      }
      
    } else {
    	switch (oldHeading){
      	case "h+":
        	xMove = 1;
          yMove = 0;
          break;
        case "h-":
        	xMove = -1;
          yMove = 0;
          break;
        case "v+":
        	xMove = 0;
          yMove = 1;
          break;
        case "v-":
        	xMove = 0;
          yMove = -1;
          break;
        default:
        	tText.innerHTML = "Error!";
      }
      posXNew = posXOld + xMove;
      posYNew = posYOld + yMove;
      posXNew = checkTeleport(posXNew);
      posYNew = checkTeleport(posYNew);
      
      snakePixel.setAttribute("x", posXNew*sizeInc);
      snakePixel.setAttribute("y", posYNew*sizeInc);
    }
    let thePosNew = posXNew.toString().padStart(2, "0") + posYNew.toString().padStart(2, "0");
    
    let pxInd = regPixel.id.indexOf(pixelId);
    regPixel.pos.splice(pxInd, 1, thePosNew);
    
    
  }
  
  checkFood();
  checkCrash();
  
  //tText.innerHTML = occPixel.pos.toString();
}

function checkTeleport(p){
	if (p < 0){
  	p += size;	
  } else if (p > size - 1){
  	p -= size;
  }
  return p;
}


function createFood(){
	let thePos;
  let randX;
  let randY;
  function randomPixel(){
    randX = Math.floor(Math.random() * size);
    randY = Math.floor(Math.random() * size);
    let posX = randX.toString().padStart(2, "0");
    let posY = randY.toString().padStart(2, "0");
    thePos = posX + posY;
  }
  randomPixel()
  while (regPixel.pos.includes(thePos)){
  	randomPixel();
  }
  //tText.innerHTML = thePos;
  foodPos = thePos;
  dPx(randX, randY, "green", "f");
}

function checkFood(){
	let headId = "s" + 0;
  const headPixel = document.getElementById(headId);
  let posXHead = Number(headPixel.getAttribute("x"))/sizeInc;
  let posYHead = Number(headPixel.getAttribute("y"))/sizeInc;
  let thePosHead = posXHead.toString().padStart(2, "0") + posYHead.toString().padStart(2, "0");
  
  let tailId = "s" + (snakeLength - 1);
  const tailPixel = document.getElementById(tailId);
  let posXTail = Number(tailPixel.getAttribute("x"))/sizeInc;
  let posYTail = Number(tailPixel.getAttribute("y"))/sizeInc;
  let thePosTail = posXTail.toString().padStart(2, "0") + posYTail.toString().padStart(2, "0");
  let headingTail = tailPixel.classList.item(1);
  
  if (thePosHead == foodPos){
    snakeLength ++;
    let xAdd;
    let yAdd;
    let posXNewTail;
    let posYNewTail;
    switch(headingTail){
    	case "h+":
        xAdd = -1;
        yAdd = 0;
        break;
      case "h-":
        xAdd = 1;
        yAdd = 0;
        break;
      case "v+":
        xAdd = 0;
        yAdd = -1;
        break;
      case "v-":
        xAdd = 0;
        yAdd = 1;
        break;
      default:
        tText.innerHTML = "Error!";
    }
    posXNewTail = posXTail + xAdd;
    posYNewTail = posYTail + yAdd;
    dPx(posXNewTail, posYNewTail, snakeColor, "s");
    
    let newTailId = "s" + (snakeLength - 1);
    document.getElementById(newTailId).classList.add(headingTail);
    
    score += 1;
    tScore.innerHTML = "Score: " + score;
    
    let foodInd = regPixel.id.indexOf("f");
    regPixel.pos.splice(foodInd, 1);
    regPixel.id.splice(foodInd, 1);
    document.getElementById("f").remove();
    
    createFood();
    
  }
}


function checkCrash(){
	let headId = "s" + 0;
  const headPixel = document.getElementById(headId);
  let posXHead = Number(headPixel.getAttribute("x"))/sizeInc;
  let posYHead = Number(headPixel.getAttribute("y"))/sizeInc;
  let thePosHead = posXHead.toString().padStart(2, "0") + posYHead.toString().padStart(2, "0");
  
  
	let isCrash = false;
  
  regPixel.pos.forEach(function(value, index, arr){

    if (value == thePosHead){
    	
      if (regPixel.id[index] !== "f" && regPixel.id[index] !== "s0"){
      	isCrash = true;
        tScore.innerHTML += "[Game over!]";
        stBut.innerHTML = "Restart";
        clearInterval(snakeMoving);
        headBlinking();
      }
    }
  })

  
  function headBlinking(){
  	if (document.getElementById("s0") !== null){
    	document.getElementById("s0").remove();
    }
    dPx(posXHead, posYHead, "black", "h");
    setTimeout(function(){
    	document.getElementById("h").remove();
      headBlink = setTimeout(function(){
        headBlinking();
      }, 500);
    }, 500)
  }
  
}
