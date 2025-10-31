let sText = document.getElementById("sudTest");
let rText = document.getElementById("resTest");
let fText = document.getElementById("fillTest");
const mode = document.getElementById("mode");
const loadMsg = document.getElementById("loadMsg");
const createBut = document.getElementById("createBut");
const solveBut = document.getElementById("solveBut");
const puzzleBut = document.getElementById("puzzleBut");
const solvPuzBut = document.getElementById("solvPuzBut");
const difficulty = document.getElementById("difficulty");
const difficultyLabel = document.getElementById("difficultyLabel");
const addText = document.getElementById("addText");
const butDiv = document.getElementById("butDiv");

const regDoku = {
  digit: [],
  num: []
}

const copyReg = [];

const solReg = [];

let highlightedCellId = "";

let puzzleDokuReg;

let thePuzzleGrid;


const sudoku = [
  [4,0,0,0,0,0,8,0,7],
  [0,3,0,0,0,0,0,0,6],
  [0,0,0,7,0,0,0,0,0],
  [0,2,0,0,0,0,3,6,0],
  [0,0,0,0,8,0,4,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,6,0,3,0,7,0],
  [5,0,0,2,0,0,0,0,0],
  [1,0,4,0,0,0,0,0,0]
]

const sudoku1 = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
]

const sudoku2 = [
  [0,7,0,0,3,0,0,0,0],
  [0,0,8,0,0,0,0,0,1],
  [0,3,0,0,8,6,0,0,0],
  [7,0,6,4,0,0,2,0,0],
  [0,0,2,0,0,0,4,0,0],
  [0,0,9,0,0,2,6,0,8],
  [0,0,0,2,1,0,0,5,0],
  [5,0,0,0,0,0,8,0,0],
  [0,0,0,0,4,0,0,7,0]
]

const sudoku3 = [
  [0,0,0,0,0,0,3,2,1],
  [1,2,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,4,0,0,0,0],
  [0,0,0,0,0,0,0,4,0],
  [0,0,0,1,2,3,0,0,0],
  [0,0,0,0,0,0,1,3,2],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
]

const sudoku4 = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,2,5,0,8,0,6,0],
  [3,0,0,0,2,0,0,0,0],
  [0,2,0,8,0,6,9,0,0],
  [0,4,0,0,0,0,0,2,0],
  [0,0,6,2,0,1,0,4,0],
  [0,0,0,0,8,0,0,0,9],
  [0,1,0,4,0,3,7,0,0],
  [6,0,0,0,0,0,8,0,0]
]

const sudoku5 = [
  [0,0,1,0,0,0,0,0,2],
  [0,0,2,5,0,8,0,6,0],
  [3,0,0,0,2,0,0,0,0],
  [0,2,0,8,0,6,9,0,0],
  [0,4,0,0,0,0,0,2,0],
  [0,0,6,2,0,1,0,4,0],
  [0,0,0,0,8,0,0,0,9],
  [0,1,0,4,0,3,7,0,0],
  [6,0,0,0,0,0,8,0,0]
]

const sudokuToFill = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
]

const emptySudoku = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
]
let nSudoku = 0;
let nWrong = 0;
let nBranch = 0;
let nSolution = 0;


startMode();

//displayToFill();

//displaySudoku(makeGrid());

/*
setTimeout(function(){
  displaySudoku(makeGrid());
}, 2000);
setTimeout(function(){
  displaySudoku(makeGrid());
}, 1000);
*/

function startMode(){
  let modeType = mode.value;
  if (modeType == "grid"){
    createBut.style.display = "block";
    solveBut.style.display = "none";
    difficulty.style.display = "none";
    difficultyLabel.style.display = "none";
    puzzleBut.style.display = "none";
    solvPuzBut.style.display = "none";
    butDiv.style.display = "none";
    sText.innerHTML = "";
    addText.innerHTML = "";

    createGrid();
  } else if (modeType == "solve"){
    while (fText.childNodes.length > 0){
      fText.childNodes[0].remove();
    }
    createBut.style.display = "none";
    solveBut.style.display = "block";
    difficulty.style.display = "none";
    difficultyLabel.style.display = "none";
    puzzleBut.style.display = "none";
    solvPuzBut.style.display = "none";
    butDiv.style.display = "none";
    sText.innerHTML = "";
    addText.innerHTML = "";

    displayToFill();
  } else if (modeType == "play"){
    createBut.style.display = "none";
    solveBut.style.display = "none";
    difficultyLabel.style.display = "inline";
    difficulty.style.display = "inline";
    puzzleBut.style.display = "inline";
    solvPuzBut.style.display = "inline";
    butDiv.style.display = "block";
    sText.innerHTML = "";
    addText.innerHTML = "";
    
    createPuzzle();
  }
}

function digitSet(n, reg){
  let ind = reg.num.indexOf(n);
  let digit = reg.digit[ind];
  return digit;
  
}

function createGrid(){
  while (fText.childNodes.length > 0){
    fText.childNodes[0].remove();
  }
  registerSudoku();
  //displaySudoku(emptySudoku);
  startFill(emptySudoku);
}


function startFill(grid){
  
  for (let i = 0; i < 81; i ++){
    let r = Math.floor(i/9);
    let c = i - r*9;
    let digit = grid[r][c];
    let digitStr = digit.toString();
    //console.log(`${n} | ${digitSet(n)}`)
    if (digitStr !== "0"){
      let fillKnown = fill(i, digitStr, regDoku);
      if (fillKnown == false){
        //displaySudoku(makeGrid(regDoku));
        
        let msg = "No solution!"
        console.log("No solution");
        return msg;
      }
      
    }
  }
  /*
  if (searchDeep(regDoku) == true){
    
    let isAllOne = true;
    
    for (let digSet of regDoku.digit){
      if (digSet.length > 1){
        isAllOne = false;
      }
    }
    if (isAllOne && checkSolution(regDoku)){
      displaySudoku(makeGrid(regDoku));
      //listAllDigit(regDoku);
      console.log(`It is solved. Wrong attempts: ${nWrong}. Branches tested: ${nBranch}`);
    }
  } else {
    displaySudoku(makeGrid(regDoku));
    console.log("No solution");
  }
  */
  searchDeep(regDoku);
  if (nSolution > 0){
    displaySudoku(makeGrid(solReg[0]));
    regDoku.digit = solReg[0].digit.slice(0);
    regDoku.num = solReg[0].num.slice(0);
    let nSolMsg;
    if (nSolution == 1){
      nSolMsg = "One possible solution."
    } else {
      nSolMsg = "Multiple possible solutions."
    }
    //console.log(`Solved! ${nSolMsg}`);
    return nSolution;
  } else {
    let msg = "No solution!"
    //console.log("No solution");
    return msg;
  }
  
  
}



function searchDeep(reg){
  if (reg == false){
    return false;
  }
  let minimalPossible = 9;
  let squareMinimal;
  //console.log(squareMinimal)
  for (let n of reg.num){
    if (digitSet(n, reg).length > 1 && digitSet(n, reg).length <= minimalPossible){
      squareMinimal = n;
      minimalPossible = digitSet(n, reg).length;
    }
  }
  
  if (squareMinimal == undefined){
    //no square with more than 1 possible digit
    if (checkSolution(reg)){
      //the sudoku solved
      const regSolution = {
        digit: [],
        num: []
      };
      regSolution.digit = reg.digit.slice(0);
      regSolution.num = reg.num.slice(0);
      solReg.push(regSolution);
      
      //regDoku.digit = reg.digit.slice(0);
      //regDoku.num = reg.num.slice(0);
      //console.log(makeGrid(reg));
      nSolution ++;
      if (nSolution > 1){
        return true;
      } else {
        return reg;
      }
      
    } else {
      //console.log("wrong branch");
      nWrong ++;
      return false;
    }
  }
  let minimalDigitSet = digitSet(squareMinimal, reg);
  let newDigitSet = randomOrder(minimalDigitSet);
  
  
  
  for (let d3 of newDigitSet){
    const regCopy = {
      digit: [],
      num: []
    };
    regCopy.digit = reg.digit.slice(0);
    regCopy.num = reg.num.slice(0);
    copyReg.push(regCopy);
    nBranch ++;
    //console.log(squareMinimal + " || " + newDigitSet + "->" + d3 + " branch: " + nBranch);
    if (nSolution > 1){
      return true;
    }
    /*
    if (searchDeep(fill(squareMinimal, d3, regCopy)) !== false){
      return true;
    }
    */
    searchDeep(fill(squareMinimal, d3, regCopy));
    //displaySudoku(makeGrid(testReg));
    
  }
  

  function randomOrder(digits){
    let n = digits.length;
    let nArr = [];
    for (let i = 0; i < n; i ++){
      nArr.push(i);
    }
    let orderArr = [];
    let rand = Math.floor(Math.random()*nArr.length);
    while (nArr.length > 0){
      orderArr.push(nArr[rand]);
      nArr.splice(rand, 1);
      rand = Math.floor(Math.random()*nArr.length);
    }
    //console.log(orderArr);

    let newDigits = "";
    for (let i of orderArr){
      newDigits += digits[i];
    }
    //console.log(digits);
    //console.log(newDigits);
    return newDigits;
  }
  /*
  let testReg = fill(squareMinimal, minimalDigitSet[1], regCopy);
  console.log(squareMinimal + " || " + minimalDigitSet + "->" + minimalDigitSet[1] + " -- times x" + nSudoku);
  searchDeep(testReg);
  */
  
}

function allUnit(){
  let unitsArr = [];
  for (let i = 0; i < 9; i ++){
    let rowSquares = [];
    let colSquares = [];
    let boxSquares = [];
    for (let q = 0; q < 9; q ++){
      let sqRow = i*9 + q;
      let sqCol = i + q*9;
      let startBox = (i%3)*3 + Math.floor(i/3)*27;
      let sqBox = startBox + (q%3) + Math.floor(q/3)*9;
      rowSquares.push(sqRow);
      colSquares.push(sqCol);
      boxSquares.push(sqBox);
    }
    unitsArr.push(rowSquares, colSquares, boxSquares);
  }
  return unitsArr;
}

function listAllDigit(reg){
  let unitsArr = allUnit();
  let digitSetArr = []
  for (let unit of unitsArr){
    let theDigitSet = unit.map(function(value, index, array){
      return digitSet(value, reg);
    })
    digitSetArr.push(theDigitSet);
  }
  rText.innerHTML += "<br>"
  const listDiv = document.createElement("div");
  const listTab = document.createElement("table");
  for (let i = 0; i < 9; i ++){
    let unitType;
    let unitNum = i;
    const newRow = document.createElement("tr");
    for (let tp = 0; tp < 3; tp ++){
      if (tp == 0){
        unitType = "Row";
      } else if (tp == 1){
        unitType = "Column";
      } else if (tp == 2){
        unitType = "Box";
      }
      const newCell = document.createElement("td");
      let digitList = `${unitType} ${unitNum}: ${digitSetArr[i*3 + tp].join("")}`;
      const newText = document.createTextNode(digitList);
      newCell.appendChild(newText);
      newRow.appendChild(newCell);
    }
    listTab.appendChild(newRow);
  }
  listDiv.appendChild(listTab);
  rText.appendChild(listDiv);
  
}


function checkSolution(reg){
  let isSolution;
  
  let unitsArr = allUnit();
  let digitSetArr = []
  for (let unit of unitsArr){
    let theDigitSet = unit.map(function(value, index, array){
      return digitSet(value, reg);
    })
    digitSetArr.push(theDigitSet);
  }

  let isTrueUniqueArr = [];
  for (let digitArr of digitSetArr){
    let isTrueUnique = true;
    for (let i = 1; i < 10; i ++){
      let digitSearch = i.toString();
      if (!digitArr.includes(digitSearch)){
        isTrueUnique = false;
        break;
      }
      
    }
    isTrueUniqueArr.push(isTrueUnique);
  }
  if (isTrueUniqueArr.includes(false)){
    isSolution = false;
  } else {
    isSolution = true;
  }
  return isSolution
  
}


function fill(n, d, reg){
  //fill square "n" with digit d, by eliminate all digit except d
  let ind = reg.num.indexOf(n);
  if (!digitSet(n, reg).includes(d)){
    //console.log("It is false");
    return false;
  }
  //console.log(`${n} -- ${d}`)
  let res = true;
  for (let d2 of digitSet(n, reg)){
    if (d2 !== d){
      //console.log(resReg);
      if (eliminate (n, d2, reg) == false){
        //console.log(false);
        return false;
      }
    }
  }
  if (res == false){
    
    return false;
  } else {
    return reg;
  }
  

}

function eliminate(n, d, reg){
  
  let ind = reg.num.indexOf(n);
  
  if (!reg.digit[ind].includes(d)){
    return reg
  }
  
  reg.digit[ind] = reg.digit[ind].replace(d, "");
  
  if (digitSet(n, reg).length == 0){
    //console.log(`${n} | ${digitSet(n, reg)}`);
    //console.log("start falsing");
    return false;
  } else if (digitSet(n, reg).length == 1){
    //console.log(`${n} | ${digitSet(n, reg)} | ${peers(n)}`);
    let d1 = digitSet(n, reg); //digit to eliminate
    
    for (let p of peers(n)){
      eliminate(p, d1, reg);
      
      
    }
  }

  let unitsSq = units(n);
  for (let un of unitsSq){
    //check for every unit of n
    for (let d = 1; d < 10; d ++){
      let d2 = d.toString();
      // check possible places for digit d2 in a unit
      let possiblePlaces = [];
      for (let sq of un){
        if (digitSet(sq, reg).includes(d2)){
          possiblePlaces.push(sq);
        }
      }
      // if only one possible place/square for digit d2 in a unit, fill the square with digit
      if (possiblePlaces.length == 1){
        fill(possiblePlaces[0], d2, reg);
      }
    }
  }
  return reg;
  
}


/*
function possibleDigit(n){
  let ind = regDoku.num.indexOf(n);
  let digitArr = [];
  if (regDoku.digit[ind] !== 0){
    digitArr.push(regDoku.digit[ind]);
  } else {
    for (let i = 1; i < 10; i ++){
      if (peers(n).includes(i)){
        continue;
      }
      digitArr.push(i);
    }
  }
  return digitArr;
}
*/

function units(n){
  
  //row
  let rowUnit = [];
  let rowNum = Math.floor(n/9);
  for (let i = 0; i < 9; i ++){
    let sq = rowNum*9 + i;
    rowUnit.push(sq);
  }
  //column
  let colUnit = [];
  let colNum = n%9;
  for (let i = 0; i < 9; i ++){
    let sq = i*9 + colNum;
    colUnit.push(sq);
  }
  //box
  let boxUnit = [];
  let boxCol = Math.floor(colNum/3);
  let boxRow = Math.floor(rowNum/3)
  let boxNum = boxCol + 3*(boxRow);
  let startSq = boxCol*3 + boxRow*3*9;
  for (let i = 0; i < 9; i ++){
    let sq = startSq + (i%3) + Math.floor(i/3)*9;
    boxUnit.push(sq);
  }
  let units = [rowUnit, colUnit, boxUnit];
  return units;
}

function peers(n){
  //row
  let rowUnit = [];
  let rowNum = Math.floor(n/9);
  for (let i = 0; i < 9; i ++){
    let sq = rowNum*9 + i;
    if (sq == n){
      continue;
    }
    rowUnit.push(sq);
  }
  //column
  let colUnit = [];
  let colNum = n%9;
  for (let i = 0; i < 9; i ++){
    let sq = i*9 + colNum;
    if (sq == n){
      continue;
    }
    colUnit.push(sq);
  }
  //box
  let boxUnit = [];
  let boxCol = Math.floor(colNum/3);
  let boxRow = Math.floor(rowNum/3)
  let boxNum = boxCol + 3*(boxRow);
  let startSq = boxCol*3 + boxRow*3*9;
  for (let i = 0; i < 9; i ++){
    let sq = startSq + (i%3) + Math.floor(i/3)*9;
    if (sq == n){
      continue;
    }
    boxUnit.push(sq);
  }

  let peers = [...rowUnit, ...colUnit, ...boxUnit];
  return peers;
}



function displaySudoku(grid){
  
  let theDiv = document.getElementById("resultSud");
  if (theDiv !== null){
    theDiv.remove();
  }

  const divTab = document.createElement("div");
  divTab.setAttribute("id", "resultSud");
  

  

  const tab = document.createElement("table");
  for (let r = 0; r < 9; r ++){
    const newRow = document.createElement("tr");
    for (let c = 0; c < 9; c ++){
      const newCell = document.createElement("td");
      const digit = document.createTextNode(grid[r][c]);
      newCell.setAttribute("id", `${r*9 + c}disp`);
      newCell.appendChild(digit);
      newRow.appendChild(newCell);
      if (c%3 == 0){
        newCell.setAttribute("style", "border-left:2px solid black")
      } else if (c == 8){
        newCell.setAttribute("style", "border-right:2px solid black")
      }
    }
    tab.appendChild(newRow);
    if (r%3 == 0){
      newRow.setAttribute("style", "border-top:2px solid black")
    } else if (r == 8){
      newRow.setAttribute("style", "border-bottom:2px solid black")
    }
  }
  divTab.appendChild(tab);
  fText.appendChild(divTab);
  /*
  if (nSudoku > 0){
    rText.appendChild(divTab);
  } else {
    sText.appendChild(divTab);
    sText.innerHTML += "<br>";
  }
  */

  nSudoku ++;
}


function displayToFill(){
  
  let theDiv = document.getElementById("toFillSud");
  if (theDiv !== null){
    theDiv.remove();
  }

  const divTab = document.createElement("div");

  divTab.setAttribute("id", "toFillSud");


  

  const tab = document.createElement("table");
  for (let r = 0; r < 9; r ++){
    const newRow = document.createElement("tr");
    for (let c = 0; c < 9; c ++){
      const newCell = document.createElement("td");
      newCell.setAttribute("class", "tabInput");
      const cellInput = document.createElement("input");
      cellInput.setAttribute("id", `${r*9 + c}inp`);

      cellInput.setAttribute("type", "text");
      cellInput.setAttribute("size", 1);
      cellInput.setAttribute("maxlength", "1");

      newCell.appendChild(cellInput);
      newRow.appendChild(newCell);
      if (c%3 == 0){
        newCell.setAttribute("style", "border-left:2px solid black")
      } else if (c == 8){
        newCell.setAttribute("style", "border-right:2px solid black")
      }
    }
    tab.appendChild(newRow);
    if (r%3 == 0){
      newRow.setAttribute("style", "border-top:2px solid black")
    } else if (r == 8){
      newRow.setAttribute("style", "border-bottom:2px solid black")
    }
  }
  divTab.appendChild(tab);

  fText.appendChild(divTab);
  fText.innerHTML += " ";
  
  

  nSudoku ++;
}

function trySolve(){
  for (let i = 0; i < 81; i ++){
    let id = i + "inp";
    let theInput = document.getElementById(id);
    let rowCell = Math.floor(i/9);
    let colCell = i%9;
    let inpVal = theInput.value;
    let valToFill;
    if (inpVal == ""){
      valToFill = 0;
    } else {
      valToFill = Number(inpVal);
    }
    
    sudokuToFill[rowCell][colCell] = valToFill;
    
  }
  registerSudoku();
  displaySudoku(sudokuToFill);
  let nSolution = startFill(sudokuToFill);
  if (nSolution > 1){
    addText.innerHTML = "Solved! Multiple solutions are possible!";

  } else if (nSolution == 1) {
    addText.innerHTML = "Solved! One solution only!"
  } else {
    addText.innerHTML = "No solution!";
  }
}

function createPuzzle(){
  createGrid();
  addText.innerHTML = "";
  puzzleDokuReg = undefined;
  nSolution = 0;
  
  

  const puzzleReg = [];

  let difficultyArr = [35, 30, 25];
  let difficultyValue = Number(difficulty.value) - 1;
  let difficultyBasedOnRemainingSquare = difficultyArr[difficultyValue];
  /*
  let randNum = Math.floor(Math.random()*difficultyArr.length);
  let difficultyBasedOnRemainingSquare = difficultyArr[randNum];
  sText.innerHTML = "Difficulty Level: " + (randNum + 1);
  */

  const remainingSquare = [];
  for (let i = 0; i < 81; i ++){
    remainingSquare.push(i);
  }
  let currSol;
  let nTry = 0;

  let tryIt = tryMakePuzzle();

  function tryMakePuzzle(){
    return new Promise(async function(resolve){
      loadMsg.style.display = "block";
      fText.style.display = "none";
      butDiv.style.display = "none";
      while (remainingSquare.length > difficultyBasedOnRemainingSquare){
        const regCopy = {
          digit: [],
          solution: []
        }
        
        let remSquareCopy = remainingSquare.slice(0);
        
        function chooseRandom(){
          if (currSol == undefined){
            regCopy.digit = regDoku.digit.slice(0);
            regCopy.num = regDoku.num.slice(0);
          } else {
            regCopy.digit = puzzleReg[puzzleReg.length - 1].digit.slice(0);
            regCopy.num = puzzleReg[puzzleReg.length - 1].num.slice(0);
          }
          let randomDelete = Math.floor(Math.random()*remSquareCopy.length);
          let numDelete = remSquareCopy[randomDelete];
          regCopy.digit[numDelete] = "0";
          return randomDelete;
        }
        
        let randDel = chooseRandom();
        
        registerSudoku();
        let nSol = startFill(makeGrid(regCopy));
        nTry ++;
        while (nSol !== 1 && remSquareCopy.length > 0){
          remSquareCopy.splice(randDel, 1);
          randDel = chooseRandom();
          registerSudoku();
          nSol = startFill(makeGrid(regCopy));
          nTry ++;
          if (nSol !== 1 && remSquareCopy.length == 0){
            remSquareCopy = remainingSquare.slice(0);
            puzzleReg.splice(puzzleReg.length - 1, 1);
            randDel = chooseRandom();
            registerSudoku();
            nSol = startFill(makeGrid(regCopy));
            nTry ++;
          }
          await new Promise(function(resolve){
            setTimeout(resolve, 10);
          })
        }
        
        currSol = nSol;
        let deletedSquare = remSquareCopy[randDel];
        //console.log(remainingSquare[randDel] + " || " + nSol + " solution");
        remainingSquare.splice(remainingSquare.indexOf(deletedSquare), 1);
        puzzleReg.push(regCopy);
        //console.log(remainingSquare.length);
        
        
      }
      resolve();
    });
  }

  tryIt.then(function(){
    fText.style.display = "block";
    butDiv.style.display = "block";
    loadMsg.style.display = "none";
    
    let thePuzzleReg = puzzleReg[puzzleReg.length - 2]
  //displaySudoku(makeGrid(thePuzzleReg));
    puzzleDokuReg = thePuzzleReg;
    displayPuzzle(thePuzzleReg);
  })

  //console.log(nTry);
  
  
  //displaySudoku(makeGrid(regDoku));
}

function displayPuzzle(reg){
  let puzzleGrid = makeGrid(reg);
  thePuzzleGrid = puzzleGrid.slice(0);
  console.log(thePuzzleGrid);
  if (fText.childNodes.length > 0){
    fText.childNodes[0].remove();
  }
  const divTab = document.createElement("div");

  divTab.setAttribute("id", "puzzleSud");


  

  const tab = document.createElement("table");
  for (let r = 0; r < 9; r ++){
    const newRow = document.createElement("tr");
    for (let c = 0; c < 9; c ++){
      const newCell = document.createElement("td");
      
      
      let cellNum = r*9 + c;
      if (puzzleGrid[r][c] == "0"){
        /*
        const cellInput = document.createElement("input");
        cellInput.setAttribute("id", `${r*9 + c}inp`);
        
        cellInput.setAttribute("type", "text");
        cellInput.setAttribute("size", 1);
        cellInput.setAttribute("maxlength", "1");
        newCell.appendChild(cellInput);
        */
        newCell.setAttribute("class", "blank");
        newCell.style.color = "blue";
      } else {
        const cellDigit = document.createTextNode(puzzleGrid[r][c]);
        newCell.setAttribute("class", "clue");
        newCell.style.color = "black";
        newCell.appendChild(cellDigit);
      }
      newCell.setAttribute("id", `${r*9 + c}puz`);
      
      
      
      newRow.appendChild(newCell);
      if (c%3 == 0){
        newCell.style.borderLeft = "2px solid black";
      } else if (c == 8){
        newCell.style.borderRight = "2px solid black";
      }
    }
    tab.appendChild(newRow);
    if (r%3 == 0){
      newRow.style.borderTop = "2px solid black";
    } else if (r == 8){
      newRow.style.borderBottom = "2px solid black";
    }
  }
  divTab.appendChild(tab);

  fText.appendChild(divTab);
  fText.innerHTML += " ";
  for (let i = 0; i < 81; i ++){
    let theCell = document.getElementById(`${i}puz`);
    
    theCell.addEventListener("click", function(){
      highlightCell(i);
    });
    
  }
  
}


function trySolvePuzzle(){
  registerSudoku();
  
  let nSolution = startFill(makeGrid(puzzleDokuReg));
  for (let n of puzzleDokuReg.num){
    let digit = puzzleDokuReg.digit[n];
    if (digit !== "0"){
      let cellId = `${n}disp`;
      let cellDisplay = document.getElementById(cellId);
      cellDisplay.style.color = "black";
    }
  }


  if (nSolution > 1){
    addText.innerHTML = "Solved! Multiple solutions are possible!";

  } else if (nSolution == 1) {
    addText.innerHTML = "Solved! One solution only!"
  } else {
    addText.innerHTML = "No solution!";
  }
}

function registerSudoku(){
  if (regDoku.digit.length > 0){
    regDoku.digit.length = 0;
  }
  if (regDoku.num.length > 0){
    regDoku.num.length = 0;
  }
  nWrong = 0;
  nBranch = 0;
  nSolution = 0;
  copyReg.length = 0;
  solReg.length = 0;
  for (let i = 0; i < 81; i ++){
    let col = i%9;
    let row = Math.floor(i/9);
    let digit = sudoku[row][col];
    let theDigitSet = "123456789";
    regDoku.digit.push(theDigitSet);
    regDoku.num.push(i);
  }
}

function makeGrid(reg){
  let sudokuGrid = [];
  for (let r = 0; r < 9; r ++){
    let rowArr = [];
    for (let c = 0; c < 9; c ++){
      let n = r*9 + c;
      let ind = reg.num.indexOf(n);
      let digit = reg.digit[ind];
      rowArr.push(digit);
    }
    sudokuGrid.push(rowArr);
  }
  return sudokuGrid;
}

function highlightCell(n){
  if (highlightedCellId !== ""){
    let previousCell = document.getElementById(highlightedCellId);
    previousCell.style.backgroundColor = "transparent";
  }
  let cellId = `${n}puz`;
  let theCell = document.getElementById(cellId);
  theCell.style.backgroundColor = "aquamarine";
  highlightedCellId = cellId;
}



function clickButton(t){
  if (highlightedCellId !== ""){
    let clickedCell = document.getElementById(highlightedCellId);
    if (clickedCell.className == "blank"){
      let cellNum = Number(highlightedCellId.slice(0, highlightedCellId.indexOf("puz")));
      let rowNum = Math.floor(cellNum/9);
      let colNum = cellNum % 9;
      //console.log(cellNum);
      if (t !== "0"){
        clickedCell.innerHTML = t;
        thePuzzleGrid[rowNum][colNum] = t;
      } else {
        clickedCell.innerHTML = "";
        thePuzzleGrid[rowNum][colNum] = t;
      }
      
      //console.log(thePuzzleGrid);
      checkError(thePuzzleGrid);
    }
  }
}

function checkError(grid){
  let theUnits = allUnit();
  //console.log("Checking...");
  let allDigits = [];
  for (let u of theUnits){
    let digitInUnit = u.map(function(value, index, array){
      let digit = grid[Math.floor(value/9)][value%9];
      let boxNum = value;
              
      let theBox = document.getElementById(`${boxNum}puz`);
      let boxClass = theBox.className;
      if (boxClass == "blank"){
        theBox.style.color = "blue";
      }

      return digit
    })

    allDigits.push(digitInUnit)
  }
  let isAllFilled = true;
  let duplicates = [];
  for (let i = 0; i < allDigits.length; i ++){
    
    let tUnit = allDigits[i].slice(0);
    let oneToNine = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (tUnit.includes("0")){
      isAllFilled = false;
    }


    for (let n of oneToNine){
      if (tUnit.includes(n)){
        if (tUnit.indexOf(n) !== tUnit.lastIndexOf(n)){
          //console.log("found duplicate");
          tUnit.forEach(function(value, index, array){
            if (value == n){
              let boxNum = theUnits[i][index];
              
              let theBox = document.getElementById(`${boxNum}puz`);
              let boxClass = theBox.className;
              //console.log(boxClass);
              if (boxClass == "blank" && !duplicates.includes(boxNum)){
                duplicates.push(boxNum);
                theBox.style.color = "red";
              }
            }
          })
        }
      }
    }


    
    
  }




  //console.log(allDigits);
  //console.log(duplicates);
  if (isAllFilled && duplicates.length == 0){
    console.log("You solved the puzzle!");
    addText.innerHTML = "You solved the puzzle!"
  }

}