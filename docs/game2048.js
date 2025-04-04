const stBut = document.getElementById("startBut");
const tText = document.getElementById("text");
const svgF = document.getElementById("svgT");
const svgBox = document.getElementById("r0");

let wBox = svgBox.getAttribute("width");
let u = 90;
let d = 12;
let m = 0;
let dField = (4*u) + (5*d);
let xF = (wBox - dField)/2;
let yF = 50;
let score = 0;

let xTouch1;
let xTouch2;
let yTouch1;
let yTouch2;

let regTile = {
  id: [],
  xP: [],
  yP: [],
  num: []
}


function drawField(){

  const fPlay = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  fPlay.setAttribute("x", xF);
  fPlay.setAttribute("y", yF);
  fPlay.setAttribute("width", dField);
  fPlay.setAttribute("height", dField);
  fPlay.setAttribute("stroke", "black");
  fPlay.setAttribute("stroke-width", 1);
  fPlay.setAttribute("fill", "#bbada0");
  svgF.appendChild(fPlay);

  for (let i1 = 0; i1 < 4; i1 ++){
    let yB = yF + d + i1*(u + d);
    for (let i2 = 0; i2 < 4; i2 ++){
      let xB = xF + d + i2*(u + d);
      const fBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      fBox.setAttribute("x", xB);
      fBox.setAttribute("y", yB);
      fBox.setAttribute("width", u);
      fBox.setAttribute("height", u);
      fBox.setAttribute("stroke", "transparent");
      fBox.setAttribute("stroke-width", 1);
      fBox.setAttribute("fill", "#cdc1b4");
      svgF.appendChild(fBox);
    }

  }
  
  const scText = document.createTextNode("Score: ");
  const sc = document.createElementNS("http://www.w3.org/2000/svg", "text");
  sc.setAttribute("x", xF);
  sc.setAttribute("y", yF/2);
  sc.setAttribute("font-size", 18);
  sc.setAttribute("dominant-baseline", "middle");
  sc.setAttribute("font-family", "sans-serif");
  sc.setAttribute("fill", "black");
  sc.setAttribute("id", "scr");
  sc.appendChild(scText);
  svgF.appendChild(sc);
  
}

drawField();


function resetGame(){
	
  stBut.innerHTML = "Restart";
  stBut.removeAttribute("disabled");
}

function restartGame(){
  m = 0;
  tText.innerHTML = "";
  score = 0;
  scr.textContent = "Score: " + score;
  while (regTile.id.length > 0){
  	clearTile(regTile.id[0]);
  }

  stBut.innerHTML = "New Game";
  newTile();
}



async function drawTile(x, y, n){
  let xTl = xF + d + (x)*(u+d);
  let yTl = yF + d + (y)*(u+d);
  let id = m;
  let num = document.createTextNode(2**n);
  let clrArr = ["#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f", "#f65e3b", "#edcf72", "#edcc61", "#edc850", "#edc53f", "#edc22e"];
  let clr = clrArr[n-1];
  const tl = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  let s = 5;
  tl.setAttribute("x", xTl + (u-u/s)/2);
  tl.setAttribute("y", yTl + (u-u/s)/2);
  tl.setAttribute("width", u/s);
  tl.setAttribute("height", u/s);
  tl.setAttribute("stroke", "transparent");
  tl.setAttribute("stroke-width", 1);
  tl.setAttribute("id", id);
  tl.setAttribute("fill", clr);
  svgF.appendChild(tl);

  regTile.xP.push(x);
  regTile.yP.push(y);
  regTile.num.push(n);
  regTile.id.push(id);

  let fontSize = 38
  let xTx = xTl + u/2;
  let yTx = yTl + u/2;
  const tx = document.createElementNS("http://www.w3.org/2000/svg", "text");
  tx.setAttribute("x", xTx);
  tx.setAttribute("y", yTx);
  tx.setAttribute("font-size", fontSize/s);
  tx.setAttribute("text-anchor", "middle");
  tx.setAttribute("dominant-baseline", "middle");
  tx.setAttribute("font-family", "sans-serif")
  tx.setAttribute("id", "n" + id);
  let txClr;
  if (n == 1 || n == 2){
  	txClr = "#776e65";
  } else {
  	txClr = "white";
  }
  tx.setAttribute("fill", txClr);
  tx.appendChild(num);
  svgF.appendChild(tx);
  
  

    let t = 2;
    let zoomIt = setInterval(function(){
      let xPos = regTile.xP[regTile.id.indexOf(id)];
      let yPos = regTile.yP[regTile.id.indexOf(id)];
      let xT = xF + d + (xPos)*(u+d);
  		let yT = yF + d + (yPos)*(u+d);
      tl.setAttribute("x", xT + (u-u*t/s)/2);
      tl.setAttribute("y", yT + (u-u*t/s)/2);
      tl.setAttribute("width", u*t/s);
      tl.setAttribute("height", u*t/s);
      tx.setAttribute("font-size", fontSize*t/s);
      t ++;

      if (t > s){
        clearInterval(zoomIt);
        
      }
    }, 10);
	
 
}



function newTile(){
  if (m == 0){
    let pArr = [];
    for (let i = 0; i < 2; i ++){
      let tP = Math.floor(Math.random() * 16);
      let rnd = Math.random();
      let tN;
      if (rnd < 9/10){
        tN = 1;
      } else {
        tN = 2;
      }
      /*let tP = 2 + i*8;
      let tN = 1 + i;*/
      while (pArr.includes(tP)){
        tP = Math.floor(Math.random() * 16);
      }
      pArr.push(tP);
      let xP = (tP % 4);
      let yP = Math.floor(tP/4);
      m ++;
      drawTile(xP, yP, tN);
      
    }
  } else {
    let pAvail = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    for (let i = 0; i < regTile.id.length; i ++){
      let x = regTile.xP[i];
      let y = regTile.yP[i];
      let pOcc = ((y*4) + x);
      pAvail.splice(pAvail.indexOf(pOcc), 1);
    }
    let tP = pAvail[Math.floor(Math.random() * pAvail.length)]
    let rnd = Math.random();
    let tN;
    if (rnd < 9/10){
      tN = 1;
    } else {
      tN = 2;
    }
    let xP = (tP % 4);
    let yP = Math.floor(tP/4);
    m ++;
    
    drawTile(xP, yP, tN);
    let isPossible = movePossible();

    if(isPossible == false){
    	tText.innerHTML = "Game over!";
      resetGame();
    }
  }
  

}


function startTouch(event){
	
  xTouch1 = event.touches[0].clientX;
  yTouch1 = event.touches[0].clientY;
}

function slideTouch(event){
	event.preventDefault();
  xTouch2 = event.touches[0].clientX;
  yTouch2 = event.touches[0].clientY;
  tText.innerHTML = "(" + xTouch1 + "," + yTouch1 + ") | (" + xTTouch2 + "," + yTouch2 + ")";
  
  let xSlide = xTouch2 - xTouch1;
  let ySlide = yTouch2 - yTouch1;
  if (Math.abs(xSlide) > Math.abs(ySlide)){
  	if (xSlide > 0){
    	tryMove("d")
    } else if (xSlide < 0){
    	tryMove("a");
    }
  } else {
  	if (ySlide > 0){
    	tryMove("s")
    } else if (ySlide < 0){
    	tryMove("w");
    }
  }
}


function keyDown(event){
  let key = event.key;
	tryMove(key)
  
}


function tryMove(key){
	let moving = false;
  let merging = false;

  if (key == "w" || key == "W" || key == "s" || key == "S"){

    for (let i1 = 0; i1 < 4; i1 ++){
      let xCol = i1;
      let yIdArr = [];
      regTile.xP.forEach(function tileInThisCol(value, index, arr){
        if (value == xCol){
          yIdArr.push(regTile.yP[index] + "-" + regTile.id[index]);
        }
      })
      let yIdSorted = [];

      if (key == "w" || key == "W"){
        for (let i2 = 3; i2 >= 0; i2 --){
          yIdArr.forEach(function sortTile(value, index, arr){
            if (value.slice(0,1) == i2){
              yIdSorted.push(value);
            }
          })
        }
      } else if (key == "s" || key == "S"){
        for (let i2 = 0; i2 < 4; i2 ++){
          yIdArr.forEach(function sortTile(value, index, arr){
            if (value.slice(0,1) == i2){
              yIdSorted.push(value);
            }
          })
        }
      }

      let ySortedArr = {
        y: [],
        id: [],
      }
      yIdSorted.forEach(function makeArr(value, index, arr){
        ySortedArr.y.push(value.slice(0,1));
        ySortedArr.id.push(value.slice(2));
      })

      let skipM = false;
      let mergedArr = [];

      for (let i3 = ySortedArr.id.length - 2; i3 >= 0; i3 --){
        if (skipM == true){
          continue;
        }
        let id1 = Number(ySortedArr.id[i3]);
        let id2 = Number(ySortedArr.id[i3 + 1]);
        skipM = false;

        if (regTile.num[regTile.id.indexOf(id1)] == regTile.num[regTile.id.indexOf(id2)]){
          let mergedVar = mergeTile(id1, id2);
          let mergeY = mergedVar.slice(2, 3);
          let mergeId = mergedVar.slice(4);
          mergedArr.push(mergeY + "-" + mergeId);
          merging = true;

        }
      }
      
      for (let i4 = 0; i4 < mergedArr.length; i4 ++){
        let mergeY = mergedArr[i4].slice(0,1);
        let mergeId = mergedArr[i4].slice(2);
        let ind = ySortedArr.y.indexOf(mergeY);
        ySortedArr.y.splice(ind - 1, 2, mergeY);
        ySortedArr.id.splice(ind - 1, 2, mergeId);
      }

      let yRef;
      let yInc;
      if (key == "w" || key == "W"){
        yRef = 0;
        yInc = 1;

      } else if (key == "s" || key == "S"){
        yRef = 3;
        yInc = 0-1;
      }


      for (let i5 = ySortedArr.y.length - 1; i5 >= 0; i5 --){
        let yInit = ySortedArr.y[i5];
        let tlId = ySortedArr.id[i5];
        const tlMove = document.getElementById(tlId);
        const numMove = document.getElementById("n" + tlId);
        let yTl = tlMove.getAttribute("y");
        let yNum = numMove.getAttribute("y");
        let yLast;
        if (i5 == ySortedArr.y.length - 1){
          yLast = yRef;
        } else {
          yLast = Number(ySortedArr.y[i5 + 1]) + yInc;
        }
        let yDist = (yInit - yLast);
        let yTlN = yTl - yDist*(u + d);
        let yNumN = yNum - yDist*(u + d);
        tlMove.setAttribute("y", yTlN);
        numMove.setAttribute("y", yNumN);

        //moveSlowly(tlMove, numMove, "y", yTlN, yNumN)

        ySortedArr.y[i5] = yInit - yDist;
        regTile.yP[regTile.id.indexOf(Number(tlId))] -= yDist;

        if (yDist !== 0){
          moving = true;
        }
      }

    }


  } else if (key == "a" || key == "A" || key == "d" || key == "D"){
    for (let i1 = 0; i1 < 4; i1 ++){
      let yCol = i1;
      let xIdArr = [];
      regTile.yP.forEach(function tileInThisCol(value, index, arr){
        if (value == yCol){
          xIdArr.push(regTile.xP[index] + "-" + regTile.id[index]);
        }
      })
      let xIdSorted = [];

      if (key == "a" || key == "A"){
        for (let i2 = 3; i2 >= 0; i2 --){
          xIdArr.forEach(function sortTile(value, index, arr){
            if (value.slice(0,1) == i2){
              xIdSorted.push(value);
            }
          })
        }
      } else if (key == "d" || key == "D"){
        for (let i2 = 0; i2 < 4; i2 ++){
          xIdArr.forEach(function sortTile(value, index, arr){
            if (value.slice(0,1) == i2){
              xIdSorted.push(value);
            }
          })
        }
      }

      let xSortedArr = {
        x: [],
        id: [],
      }
      xIdSorted.forEach(function makeArr(value, index, arr){
        xSortedArr.x.push(value.slice(0,1));
        xSortedArr.id.push(value.slice(2));
      })

      let skipM = false;
      let mergedArr = [];

      for (let i3 = xSortedArr.id.length - 2; i3 >= 0; i3 --){
        if (skipM == true){
          continue;
        }
        let id1 = Number(xSortedArr.id[i3]);
        let id2 = Number(xSortedArr.id[i3 + 1]);
        skipM = false;

        if (regTile.num[regTile.id.indexOf(id1)] == regTile.num[regTile.id.indexOf(id2)]){
          let mergedVar = mergeTile(id1, id2);
          let mergeX = mergedVar.slice(0, 1);
          let mergeId = mergedVar.slice(4);
          mergedArr.push(mergeX + "-" + mergeId);
          merging = true;

        }
      }
      
      for (let i4 = 0; i4 < mergedArr.length; i4 ++){
        let mergeX = mergedArr[i4].slice(0,1);
        let mergeId = mergedArr[i4].slice(2);
        let ind = xSortedArr.x.indexOf(mergeX);
        xSortedArr.x.splice(ind - 1, 2, mergeX);
        xSortedArr.id.splice(ind - 1, 2, mergeId);
      }

      let xRef;
      let xInc;
      if (key == "a" || key == "A"){
        xRef = 0;
        xInc = 1;

      } else if (key == "d" || key == "D"){
        xRef = 3;
        xInc = 0-1;
      }


      for (let i5 = xSortedArr.x.length - 1; i5 >= 0; i5 --){
        let xInit = xSortedArr.x[i5];
        let tlId = xSortedArr.id[i5];
        const tlMove = document.getElementById(tlId);
        const numMove = document.getElementById("n" + tlId);
        let xTl = Number(tlMove.getAttribute("x"));
        let xNum = Number(numMove.getAttribute("x"));
        let xLast;
        if (i5 == xSortedArr.x.length - 1){
          xLast = xRef;
        } else {
          xLast = Number(xSortedArr.x[i5 + 1]) + xInc;
        }
        let xDist = (xInit - xLast);
        
        let dDist = xDist*(u + d);

        let xTlN = xTl - dDist;
        let xNumN = xNum - dDist;
        tlMove.setAttribute("x", xTlN);
        numMove.setAttribute("x", xNumN);
        

        
        //moveSlowly(tlMove, numMove, "x", xTlN, xNumN)



        xSortedArr.x[i5] = xInit - xDist;
        regTile.xP[regTile.id.indexOf(Number(tlId))] -= xDist;
        
        if (xDist !== 0){
          moving = true;
        }
      }
    }
  }

  if (moving == true || merging == true){
    setTimeout(newTile, 100);
  }
}



function moveSlowly(tile, num, axis, dT, dN){
  let tlMove = tile;
  let numMove = num;  

  tile.setAttribute(axis, dT);
  num.setAttribute(axis,dN);

}


function mergeTile(a, b){
  let id1 = a;
  let id2 = b;
  let tlIndex = regTile.id.indexOf(id2);

  let mergeNum = regTile.num[tlIndex] + 1;
  let mergeX = regTile.xP[tlIndex];
  let mergeY = regTile.yP[tlIndex];
  m ++;
  
  
  drawTile(mergeX, mergeY, mergeNum);

  clearTile(id1);
  clearTile(id2);
  
  
  score += 2**mergeNum;
  scr.textContent = "Score: " + score;

  return mergeX + "-" + mergeY + "-" + m;
}

function clearTile(a){
  let id = a;
  let tlIndex = regTile.id.indexOf(id);
  const tlClear = document.getElementById(id);
  const numClear = document.getElementById("n" + id);
  tlClear.remove();
  numClear.remove();

  regTile.xP.splice(tlIndex, 1);
  regTile.yP.splice(tlIndex, 1);
  regTile.id.splice(tlIndex, 1);
  regTile.num.splice(tlIndex, 1);
}

function movePossible(){
	let pAvail = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  for (let i = 0; i < regTile.id.length; i ++){
    let x = regTile.xP[i];
    let y = regTile.yP[i];
    let pOcc = ((y*4) + x);
    pAvail.splice(pAvail.indexOf(pOcc), 1);
  }
  if (pAvail.length == 0){
  	let check = false;
    for (let i = 0; i < 12; i ++){
    	let xCh = i%3;
      let yCh = Math.floor(i/3);
      let num1;
      let num2;
      regTile.id.forEach(function(value, index, arr){
      	
        if (regTile.xP[index] == xCh && regTile.yP[index] == yCh){
        	num1 = regTile.num[index];
        } else if (regTile.xP[index] == (xCh + 1) && regTile.yP[index] == yCh){
        	num2 = regTile.num[index];
        }
      });
      if (num1 == num2){
      	check = true;
      }
		}
    
    for (let i = 0; i < 12; i ++){
    	let xCh = Math.floor(i/3);
      let yCh = i%3;
      let num1;
      let num2;
      regTile.id.forEach(function(value, index, arr){
      	
        if (regTile.xP[index] == xCh && regTile.yP[index] == yCh){
        	num1 = regTile.num[index];
        } else if (regTile.xP[index] == xCh && regTile.yP[index] == (yCh + 1)){
        	num2 = regTile.num[index];
        }
      });
      if (num1 == num2){
      	check = true;
      }
		}

    return check;
    
  } else {
  	return true;
  }
  
}
