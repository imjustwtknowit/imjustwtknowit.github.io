let amList = document.getElementById("am");
let amBox = 12;
let amImg;
const gen = document.getElementById("gen");
const gameRow = document.getElementById("test");
const hBut = document.getElementById("hint");
let numList = [];
let p = 0;
let playList = [];
let funcList = [];

let ch = document.getElementById("ch");
let imgList;
let trueCount = 0;

const imgRef = [
  "https://cdn-icons-png.flaticon.com/128/6401/6401524.png", 
  "https://cdn-icons-png.flaticon.com/128/254/254434.png", 
  "https://cdn-icons-png.flaticon.com/128/565/565639.png", 
  "https://cdn-icons-png.flaticon.com/128/6769/6769972.png", 
  "https://cdn-icons-png.flaticon.com/128/67/67776.png", 
  "https://cdn-icons-png.flaticon.com/128/2077/2077502.png",
  "https://cdn-icons-png.flaticon.com/128/6401/6401586.png",
  "https://cdn-icons-png.flaticon.com/128/5870/5870675.png",
  "https://cdn-icons-png.flaticon.com/128/8704/8704365.png",
  "https://cdn-icons-png.flaticon.com/128/73/73861.png"
];

gen.addEventListener("click", function() {genGame()})



function shuffleArr(array){
  for (let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i] , array[j]] = [array[j], array[i]];
  }
}

function getImg(m){
    return imgRef[m-1];
  }




function genGame(){
  let num = amList.options[amList.selectedIndex].value;
  amImg = num/2;
  ch.innerHTML = "";
  numList.length = 0;
  playList.length = 0;
  funcList.length = 0;
  p = 0;
  trueCount = 0;
  document.getElementById("te").innerHTML = "";
  hBut.removeAttribute("disabled");
  hBut.innerHTML = "Show hint";
  while (gameRow.firstChild){
    gameRow.removeChild(gameRow.firstChild);
  }
  for (let i = 1; i <= amImg; i ++){
    numList.push(i,i);
  }
  shuffleArr(numList);
  imgList = numList.map(getImg);
  for (let i = 1; i <= num; i ++){
    const func = function() {toPlay(i)};
    funcList.push(func);
    const newBox = document.createElement("div");
    const newT = document.createElement("img");
    const newId = "but" + i;
    newBox.appendChild(newT);
    gameRow.appendChild(newBox);
    newBox.setAttribute("id", newId);
    newBox.addEventListener("click", funcList[i-1]);
  }
  
}

function getAns(){
  if (hBut.innerHTML == "Show hint"){
    document.getElementById("te").innerHTML = numList.toString();
    hBut.innerHTML = "Hide hint";
  } else {
    document.getElementById("te").innerHTML = "";
    hBut.innerHTML = "Show hint";
  }
}

function showImg(n){
  const callId = "but" + n;
  const callBox = document.getElementById(callId).firstElementChild;
  document.getElementById(callId).setAttribute("class", "show");
  const newImg = imgList[n-1];
  callBox.setAttribute("src", newImg);
  callBox.setAttribute("width", "30px");
  const playNum = {num: p, box: n};
  playList.push(playNum);
}

function unshowImg(n){
  const callId = "but" + n;
  const callBox = document.getElementById(callId).firstElementChild;
  callBox.removeAttribute("src");
  document.getElementById(callId).removeAttribute("class");
}

function boxDone(n){
  const callId = "but" + n;
  const callBox = document.getElementById(callId);
  callBox.removeEventListener("click", funcList[n-1]);
}

function toPlay(n){
  if (p % 2 == 0){
    p ++;
    showImg(n);
  } else {
    p ++;
    showImg(n);
    if (numList[playList[p-1].box - 1] == numList[playList[p-2].box - 1]){
      
      boxDone(n);
      boxDone(playList[p-2].box);
      trueCount ++;
      if (trueCount == amImg){
        ch.innerHTML = "You win! Please re-generate the game!"
      }
    } else {
      
      setTimeout(function() {unshowImg(n)}, 500);
      setTimeout(function() {unshowImg(playList[p-2].box)}, 500);
    }
  }
}

