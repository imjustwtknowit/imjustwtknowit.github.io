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

let keyDisabled = false;
let keyReg = [];

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
  keyDisabled = true;
  overScreen();
  stBut.innerHTML = "Restart";
  stBut.removeAttribute("disabled");
}

function restartGame(){
  m = 0;
  keyReg.length = 0;
  keyDisabled = false;
  tText.innerHTML = "";
  score = 0;
  scr.textContent = "Score: " + score;
  while(document.getElementsByClassName("over").length > 0){
  	document.getElementsByClassName("over")[0].remove();
  }
  while (regTile.id.length > 0){
  	clearTile(regTile.id[0]);
  }

  stBut.innerHTML = "New Game";
  newTile();
}



function drawTile(x, y, n, type){
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
        if (type !== "merge"){
        	tilesDrawn();
        }
      }
    }, 10);
	
 
}

function tilesDrawn(){
	keyDisabled = false;
  //tText.innerHTML = keyReg;
  if (keyReg.length !== 0){
  	tryMove(keyReg[0]);
  }
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
      drawTile(xP, yP, tN, "draw");
      //tText.innerHTML += "(" + xP + "," + yP + ")<br>";
      
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
    
    drawTile(xP, yP, tN, "draw");
    //tText.innerHTML += "(" + xP + "," + yP + ")<br>";
    let isPossible = movePossible();

    if(isPossible == false){
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
  
}

function regTouch(event){
  //tText.innerHTML = "(" + xTouch1 + "," + yTouch1 + ") | (" + xTouch2 + "," + yTouch2 + ")";
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
	if (key == "w" || key == "W" || key == "s" || key == "S" || key == "a" || key == "A" || key == "d" || key == "D"){
  	regKey(key);
  }
  
}

function regKey(key){
	keyReg.push(key);
  //tText.innerHTML = keyReg;
  if (keyDisabled == true){
  
  } else {
    tryMove(key);
  }
}


async function tryMove(key){
	
  keyDisabled = true;
  
	let moving = false;
  //tText.innerHTML = keyReg;
  let merging = false;
	//let testArr = [];
  if (key == "w" || key == "W" || key == "s" || key == "S"){
		keyReg.splice(0,1);
    let mergedArr = [];
    let waitMove = new Promise(function(resolve){
    for (let i1 = 0; i1 < 5; i1 ++){
      
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
      let toMerge = [];
      let yOldArr = [];

      for (let i3 = ySortedArr.id.length - 2; i3 >= 0; i3 --){
        if (skipM == true){
          continue;
        }
        let id1 = Number(ySortedArr.id[i3]);
        let id2 = Number(ySortedArr.id[i3 + 1]);
        skipM = false;
        if (toMerge.includes(id1) || toMerge.includes(id2)){
        	continue;
        }

        if (regTile.num[regTile.id.indexOf(id1)] == regTile.num[regTile.id.indexOf(id2)]){
          
          let mergePair = [id1, id2];
          mergedArr.push(mergePair);
          
          toMerge.push(id1);
          

          let mergedInto = regTile.id.indexOf(id2);
  				let mergeNum = regTile.num[mergedInto] + 1;
  				let mergeX = regTile.xP[mergedInto];
  				let mergeY = regTile.yP[mergedInto];
          
          let ind = ySortedArr.y.indexOf(mergeY.toString());
          let xOld = ySortedArr.y[ind - 1];
          yOldArr.push(xOld);
          ySortedArr.y[ind - 1] = mergeY;
          

          merging = true;

        }
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
        
        let tlId = Number(ySortedArr.id[i5]);
        let yInit;
        if (toMerge.includes(tlId)){
        	yInit = yOldArr[toMerge.indexOf(tlId)];
        } else {
        	yInit = ySortedArr.y[i5];
        }
        
        const tlMove = document.getElementById(tlId);
        const numMove = document.getElementById("n" + tlId);
        let yTl = tlMove.getAttribute("y");
        let yNum = numMove.getAttribute("y");
        
        let yLast;
        if (i5 == ySortedArr.y.length - 1){
          yLast = yRef;
        } else {
          if (toMerge.includes(tlId)){
          	yLast = Number(ySortedArr.y[i5 + 1]);
          } else {
          	yLast = Number(ySortedArr.y[i5 + 1]) + yInc;
          }
        }
        
        let yDist = (yInit - yLast);
        let dDist = yDist*(u + d);
        let yTlN = yTl - dDist;
        let yNumN = yNum - dDist;
        
        function moveSlowly(tile, num, axis, dT, dN, inc){
          let tlMove = tile;
          let numMove = num;  

          let slowly = setInterval(function(){
            let tlInit = Number(tlMove.getAttribute(axis));
            let numInit = Number(numMove.getAttribute(axis));

            tlMove.setAttribute(axis, tlInit - inc);
            numMove.setAttribute(axis,numInit - inc);
            if (Number(tlMove.getAttribute(axis)) == dT){
              clearInterval(slowly);
              return resolve();
            }
          }, 10);

        }
        
        let increment
        if (yDist == 0){
        	increment = 0;
        } else {
        	increment = dDist/(3);
          moveSlowly(tlMove, numMove, "y", yTlN, yNumN, increment);
        }
        
        //tlMove.setAttribute("y", yTlN);
        //numMove.setAttribute("y", yNumN);
				
        
        ySortedArr.y[i5] = yInit - yDist;
        regTile.yP[regTile.id.indexOf(Number(tlId))] -= yDist;

        if (yDist !== 0){
          moving = true;
        }
      }

    }
    
    if (moving == false){
    	return resolve();
    }
    
		});
    
    await waitMove;
    for (let i6 = 0; i6 < mergedArr.length; i6 ++){
      	mergeTile(mergedArr[i6][0], mergedArr[i6][1])
    }

  } else if (key == "a" || key == "A" || key == "d" || key == "D"){
    keyReg.splice(0,1);
    let mergedArr = [];
    let waitMove = new Promise(function(resolve){
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
      let toMerge = [];
      let xOldArr = [];
      

      for (let i3 = xSortedArr.id.length - 2; i3 >= 0; i3 --){
        if (skipM == true){
          continue;
        }
        let id1 = Number(xSortedArr.id[i3]);
        let id2 = Number(xSortedArr.id[i3 + 1]);
        skipM = false;
        if (toMerge.includes(id1) || toMerge.includes(id2)){
        	continue;
        }

        if (regTile.num[regTile.id.indexOf(id1)] == regTile.num[regTile.id.indexOf(id2)]){
          let mergePair = [id1, id2];
          mergedArr.push(mergePair);
          
          toMerge.push(id1);
          

          let mergedInto = regTile.id.indexOf(id2);
  				let mergeNum = regTile.num[mergedInto] + 1;
  				let mergeX = regTile.xP[mergedInto];
  				let mergeY = regTile.yP[mergedInto];
          
          let ind = xSortedArr.x.indexOf(mergeX.toString());
          let xOld = xSortedArr.x[ind - 1];
          xOldArr.push(xOld);
          xSortedArr.x[ind - 1] = mergeX;
          

          merging = true;

        }
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
        
        
        let tlId = Number(xSortedArr.id[i5]);
        let xInit
        if (toMerge.includes(tlId)){
        	xInit = xOldArr[toMerge.indexOf(tlId)];
        } else {
        	xInit = xSortedArr.x[i5];
        }
        
        
        const tlMove = document.getElementById(tlId);
        const numMove = document.getElementById("n" + tlId);
        let xTl = Number(tlMove.getAttribute("x"));
        let xNum = Number(numMove.getAttribute("x"));
        let xLast;
        if (i5 == xSortedArr.x.length - 1){
          xLast = xRef;
        } else {
          if (toMerge.includes(tlId)){
          	xLast = Number(xSortedArr.x[i5 + 1]);
          } else {
          	xLast = Number(xSortedArr.x[i5 + 1]) + xInc;
          }
          
        }
        let xDist = (xInit - xLast);
        
        let dDist = xDist*(u + d);

        let xTlN = xTl - dDist;
        let xNumN = xNum - dDist;
        
        
        
        //tlMove.setAttribute("x", xTlN);
        //numMove.setAttribute("x", xNumN);
        

        
        function moveSlowly(tile, num, axis, dT, dN, inc){
          let tlMove = tile;
          let numMove = num;  

          let slowly = setInterval(function(){
            let tlInit = Number(tlMove.getAttribute(axis));
            let numInit = Number(numMove.getAttribute(axis));

            tlMove.setAttribute(axis, tlInit - inc);
            numMove.setAttribute(axis,numInit - inc);
            if (Number(tlMove.getAttribute(axis)) == dT){
              clearInterval(slowly);
              return resolve();
            }
          }, 10);

        }
        
        let increment;
				if (xDist == 0){
        	increment = 0;
          
        } else {
        	increment = dDist/(3);
          moveSlowly(tlMove, numMove, "x", xTlN, xNumN, increment);
        }
				

        xSortedArr.x[i5] = xInit - xDist;
        regTile.xP[regTile.id.indexOf(Number(tlId))] -= xDist;
        
        if (xDist !== 0){
          moving = true;
        }
      }
    
    }
    
    if (moving == false){
    	return resolve();
    }
    
    
    });
    
    
    await waitMove;
    for (let i6 = 0; i6 < mergedArr.length; i6 ++){
      	mergeTile(mergedArr[i6][0], mergedArr[i6][1])
    }
    
    
    
  }

  //tText.innerHTML = testArr[0] + " | " + testArr[1] + " | " + testArr[2] + " | " + testArr[3]

  
  if (moving == true || merging == true){
    newTile();   
  } else {
    tilesDrawn();
  }
  
}


function mergeTile(a, b){
  let id1 = a;
  let id2 = b;
  let tlIndex = regTile.id.indexOf(id2);

  let mergeNum = regTile.num[tlIndex] + 1;
  let mergeX = regTile.xP[tlIndex];
  let mergeY = regTile.yP[tlIndex];
  m ++;
  
  
  drawTile(mergeX, mergeY, mergeNum, "merge");
  clearTile(id1);
  clearTile(id2);
  
  score += 2**mergeNum;
  scr.textContent = "Score: " + score;

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


function overScreen(){
	let wBox = Number(svgBox.getAttribute("width"));
  let hBox = Number(svgBox.getAttribute("height"));
  let gradArr = ["#FFFF9900", "#FFFF9920", "#FFFF9940", "#FFFF9960", "#FFFF9980"]
  const over = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  over.setAttribute("x", 0);
  over.setAttribute("y", 0);
  over.setAttribute("width", wBox);
  over.setAttribute("height", hBox);
  over.setAttribute("fill", "#FFFF9900");
  over.setAttribute("class", "over");
	svgF.appendChild(over);
  
  function overText(){
  	const gameOver = document.createTextNode("Game over!")
    const tGradArr = ["#33333300", "#33333340", "#33333380", "#333333C0", "#333333"]
    const oText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    oText.setAttribute("x", wBox/2);
    oText.setAttribute("y", hBox/2);
    oText.setAttribute("dominant-baseline", "middle");
    oText.setAttribute("text-anchor", "middle");
    oText.setAttribute("font-family", "sans-serif");
    oText.setAttribute("font-weight", "bold");
    oText.setAttribute("fill", "#33333300");
    oText.setAttribute("class", "over");
    oText.setAttribute("font-size", 40);
    oText.appendChild(gameOver);
    svgF.appendChild(oText);
    let p = 1;
    let changeText = setInterval(function(){
      oText.setAttribute("fill", tGradArr[p]);
      p ++;
      if (p > tGradArr.length - 1){
        clearInterval(changeText);
      }
    }, 100);
    
  }
  
  let t = 1;
  let changeOver = setInterval(function(){
  	over.setAttribute("fill", gradArr[t]);
    t ++;
    if (t > gradArr.length - 1){
    	clearInterval(changeOver);
      overText();
    }
  }, 100);
  
  
}
