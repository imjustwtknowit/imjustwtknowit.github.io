const tText = document.getElementById("tText");
const aText = document.getElementById("aText");
const tLog = document.getElementById("log");
const stBut = document.getElementById("startBut")
const nPly = document.getElementById("players")
const svg = document.getElementById("svgF");
const svgNS = "http://www.w3.org/2000/svg";
const colArr = ["r", "g", "b", "y"];
const numArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "v", "s", "p"];
const wildArr = ["wc", "fc"];


let posArr = {
  x: [140, 150, 60, 50],
  y: [430, 20, 130, 340]
}

let markerArr = [
	"100,440 130,440 120,430 130,440 120,450 130,440",
  "110,30 140,30 130,20 140,30 130,40 140,30",
  "20,140 50,140 40,130 50,140 40,150 50,140",
  "10,350 40,350 30,340 40,350 30,360 40,350"
];

let deck = [];

let drawPile;
let discardPile = [];
let playerArr = [];

let nPlayers;

let handArr = {
	func: [],
  id: []
};

let winArr = [];

let turn = 0;
let turnRot = 1;

//let drawStack = 0;


function start(){
	while(svg.childNodes.length > 2){
  	svg.lastChild.remove();
  }
  
  
  
  deck.length = 0;
  drawPile = undefined;
  discardPile.length = 0;
  playerArr.length = 0;
  nPlayers = undefined;
  handArr.func.length = 0;
  handArr.id.length = 0;
  winArr.length = 0
  turn = 0;
  turnRot = 1;
  nPlayers = Number(nPly.value);
  
  tText.innerHTML = "";
  aText.innerHTML = "";
  tLog.innerHTML = "Log: <br>"
  
  stBut.setAttribute("disabled", "");

  
  createDeck();
 	drawAll();
}

function createDeck(){
	
  colArr.forEach(function(value, index, arr){
    let id;
    for (let i = 0; i < numArr.length; i ++){
    	if (i == 0){
      	let n = 1;
        id = numArr[i] + value + n;
        deck.push(id);
      } else {
      	let n = 1;
        while (n < 3){
        	id = numArr[i] + value + n;
          deck.push(id);
          n ++;
        }
      }
      
      
    }
  })

	wildArr.forEach(function(value, index, arr){
  	let id;
    let n = 1;
    while (n < 5){
      id = value + n;
      deck.push(id);
      n ++;
    }
  
  })
  
  
  
  //tText.innerHTML = deck.length + " | " + deck;
}




function createCard(id, x, y){
	let x0 = x;
  let y0 = y;
  let w = 35;
  let h = 49;
  let r = w/50;
  let cClass = id + "id";
  
  let colCode = id.charAt(1);
  let col;
  switch(colCode){
  	case "r":
    	col = "red";
     	break;
    case "g":
    	col = "green";
     	break;
    case "b":
    	col = "blue";
     	break;
    case "y":
    	col = "yellow";
     	break;
    case "c":
    	col = "black";
     	break;
    default:
    	tText.innerHTML = "Error!";
  }
  
  let textCode = id.charAt(0);
  let tx;
  if (Number.isInteger(parseInt(textCode))){
  	tx = textCode;
  } else {
  	switch(textCode){
    	case "v":
        tx = decodeURI("%E2%87%85");
        break;
      case "s":
        tx = decodeURI("%E2%8A%98");
        break;
      case "p":
        tx = "+2";
        break;
      case "w":
        tx = "W";
        break;
      case "f":
        tx = "+4";
        break;
      default:
    		tText.innerHTML = "Error!";
    }
  }
  
  const card = document.createElementNS(svgNS, "rect");
  card.setAttribute("x", x0);
  card.setAttribute("y", y0);
  card.setAttribute("width", w);
  card.setAttribute("height", h);
  card.setAttribute("stroke", "black");
  card.setAttribute("stroke-width", 0.8);
  card.setAttribute("fill", col);
  card.setAttribute("class", cClass);
  card.setAttribute("id", id + "card");
  svg.appendChild(card);
  
  const nText = document.createTextNode(tx);
  const text = document.createElementNS(svgNS, "text");
  if (tx == "+2" || tx == decodeURI("%E2%8A%98") || tx == "W" || tx == "+4"){
    text.setAttribute("x", x0 + 10*r);
    text.setAttribute("font-size", 30*r);
  } else {
  	text.setAttribute("x", x0 + 13*r);
  	text.setAttribute("font-size", 40*r);
  }
  
  text.setAttribute("y", y0 + 35*r);
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("font-family", "sans-serif");
  if (tx == "6" || tx == "9"){
  	  text.setAttribute("text-decoration", "underline");
  }
  text.setAttribute("stroke", "black");
  text.setAttribute("stroke-width", 0.8);
  text.setAttribute("fill", "white");
  text.setAttribute("class", cClass);
  text.appendChild(nText);
  svg.appendChild(text);
}





function drawAll(){
	let p = 0;

  let drawCards = setInterval(function(){
  	
    createCard(deck[p], 10 + 40*(p%12), 8 + 53*Math.floor(p/12));
  	p ++;
  if (p > 107){
  	clearInterval(drawCards);
    flipAll();
  }
  }, 10);
  
  function flipAll(){
    let f = 0;
    let flipIt = setInterval(function(){
      flipCard(deck[f]);
      f ++;
      if (f > 107){
        clearInterval(flipIt);
        setTimeout(function(){
        	oneStack();
          drawPlayer();
        }, 500);
      }
    }, 10);
  }
  
  
  function oneStack(){
  	deck.forEach(function(value, index, arr){
    	let classId = value + "id";
      let cardId = value + "card";
      const cardColl = document.getElementsByClassName(classId);
      const card = document.getElementById(cardId);
      let x0 = Number(card.getAttribute("x"));
  		let y0 = Number(card.getAttribute("y"));
      let xDiff = 250 - x0;
      let yDiff = 250 - y0;
      
      let c = 0
      while(c < cardColl.length){
      	let xOld = Number(cardColl[c].getAttribute("x"));
        let yOld = Number(cardColl[c].getAttribute("y"));
        cardColl[c].setAttribute("x", xOld + xDiff);
        cardColl[c].setAttribute("y", yOld + yDiff);
        c ++;
      }

    })
    
  }
}


function drawPlayer(){
	drawPile = deck.slice(0);
  
  let playerCards = [];
  for (let i = 0; i < 7*nPlayers; i ++){
  	let randCard = drawPile[Math.floor(Math.random()* drawPile.length)];
    drawPile.splice(drawPile.indexOf(randCard), 1);
    playerCards.push(randCard);
  }
  
  
  for (let i = 0; i < nPlayers; i ++){
  	if (i == 0){
    	let mineArr = [];
      playerArr.push(mineArr);
    } else {
    	let oppArr = [];
      playerArr.push(oppArr);
    }
  }
  
  for (let i = 0; i < playerCards.length; i ++){
  	let pNum = i%nPlayers;
    playerArr[pNum].push(playerCards[i]);
  }
  
  //tText.innerHTML = playerCards + " | " + playerArr[1];
  tLog.innerHTML += "-Player cards: <br>" + "You: " + playerArr[0] + "<br>";
  for (let i = 1; i < nPlayers; i ++){
  	tLog.innerHTML += "COM" + i + ": " + playerArr[1] + "<br>";
  }
  
  
  
  let m = 0;
  
  
  let giveCards = setInterval(function(){
  
  	let tId = playerCards[m];
  	let classId = playerCards[m] + "id";
    let cardId = playerCards[m] + "card";
    let coverId = playerCards[m] + "cover";
    const cardColl = document.getElementsByClassName(classId);
    const coverColl = document.getElementsByClassName(coverId);
    const card = document.getElementById(cardId);
    let x0 = Number(card.getAttribute("x"));
    let y0 = Number(card.getAttribute("y"));
    
    

    
    
    let xDiff = posArr.x[m%nPlayers] + (Math.floor(m/nPlayers))*40 - x0;
    let yDiff = posArr.y[m%nPlayers] - y0;
    

    let c = 0
    while(c < cardColl.length){
      let xOld = Number(cardColl[c].getAttribute("x"));
      let yOld = Number(cardColl[c].getAttribute("y"));
      cardColl[c].setAttribute("x", xOld + xDiff);
      cardColl[c].setAttribute("y", yOld + yDiff);
      if (m%nPlayers == 0){
        let handler = function(){
          playIt(tId, 0);
        }
        handArr.func.push(handler);
        handArr.id.push(tId);
        cardColl[c].addEventListener("click", handler);
              
      }
      c ++;
      
    }
    if (m%nPlayers == 0){
      while (coverColl.length > 0){
        coverColl[0].remove();
      }
    }
    
    m ++;
    
    if (m > playerCards.length - 1){
    	clearInterval(giveCards);
      setTimeout(openFirst, 200);
      //tText.innerHTML = drawPile;
    }
    
   }, 200);

}


function openFirst(){
	let randCard = drawPile[Math.floor(Math.random()* drawPile.length)];
  let cType = randCard.charAt(0);
  while (cType == "v" || cType == "s" || cType == "p" || cType == "w" || cType == "f"){
  	randCard = drawPile[Math.floor(Math.random()* drawPile.length)];
    cType = randCard.charAt(0);
    //tText.innerHTML = randCard;
  }
  
  drawPile.splice(drawPile.indexOf(randCard), 1);
  discardPile.push(randCard);
  
  let classId = randCard + "id";
  let cardId = randCard + "card";
  let coverId = randCard + "cover";
  const cardColl = document.getElementsByClassName(classId);
  const coverColl = document.getElementsByClassName(coverId);
  const card = document.getElementById(cardId);
  let x0 = Number(card.getAttribute("x"));
  let y0 = Number(card.getAttribute("y"));
  let w = Number(card.getAttribute("width"));
  let h = Number(card.getAttribute("height"));
  
  let xDiff = 200 - x0;
  let yDiff = 250 - y0;
  
  let c = 0
  while(c < cardColl.length){
    let xOld = Number(cardColl[c].getAttribute("x"));
    let yOld = Number(cardColl[c].getAttribute("y"));
    cardColl[c].setAttribute("x", xOld + xDiff);
    cardColl[c].setAttribute("y", yOld + yDiff);
    c ++;
  }
  
  while (coverColl.length > 0){
  	coverColl[0].remove();
  }
  
  tLog.innerHTML += "-First card is " + randCard + "<br>";
  
  const overPile = document.createElementNS(svgNS, "rect");
  overPile.setAttribute("x", 250);
  overPile.setAttribute("y", 250);
  overPile.setAttribute("width", w);
  overPile.setAttribute("height", h);
  overPile.setAttribute("fill", "transparent");
  overPile.setAttribute("stroke", "transparent");
  overPile.setAttribute("id", "oPile");
  let handler = function(){
  	meDrawOne();
  }
  handArr.func.push(handler);
  handArr.id.push("oPile");
  overPile.addEventListener("click", handler);
  svg.appendChild(overPile);
  
  const mark = document.createElementNS(svgNS, "polyline");
  mark.setAttribute("points", markerArr[0]);
  mark.setAttribute("stroke", "black");
  mark.setAttribute("id", "marker");
  svg.appendChild(mark);
  
  
  mePlay("play");
  stBut.innerHTML = "Restart";
  stBut.removeAttribute("disabled");
}

function checkTurn(tt){
	
  if (turn%nPlayers == 0){
    const oPile = document.getElementById("oPile");
    oPile.removeEventListener("click", handArr.func[handArr.id.indexOf("oPile")]);

    playerArr[0].forEach(function(value, index, arr){
      let tId = value;
      let classId = tId + "id";
      const cardColl = document.getElementsByClassName(classId);
      let c = 0;
      while (c < cardColl.length){
        cardColl[c].removeEventListener("click", handArr.func[handArr.id.indexOf(tId)]);
        c ++;
      }

    })
  }
  
  function incTurn(){
  	if (turn == 0 && turnRot == -1){
      turn = nPlayers;
    }
    turn += turnRot;
  }
  

  switch(tt){
  	case "play":
    	let isOver = checkWin(turn%nPlayers);
      if (isOver){
      	tText.innerHTML = "Game over! " + drawPile;
      	break;
      }
    	let onDisc = discardPile[discardPile.length - 1];
  		let cType = onDisc.charAt(0);
      if (cType == "v" || cType == "s" || cType == "p" || cType == "w" || cType == "f"){
      	switch(cType){
        	case "v":
            if (nPlayers == 2 || nPlayers - winArr.length == 2){
            	incTurn();
              while(winArr.includes(turn%nPlayers)){
              	incTurn();
              }
              if (turn%nPlayers == 0){
                mePlay("skip");
              } else {
                oppPlay(turn%nPlayers, "skip");
              }
            } else {
            	tLog.innerHTML += "-Order of turn reversed <br>"
              turnRot = turnRot*(-1);
              incTurn();
              while(winArr.includes(turn%nPlayers)){
              	incTurn();
              }
              if (turn%nPlayers == 0){
                mePlay("play");
              } else {
                oppPlay(turn%nPlayers, "play");
              }
            }
            break;
          case "s":
          	incTurn();
              while(winArr.includes(turn%nPlayers)){
              	incTurn();
              }
            if (turn%nPlayers == 0){
            	mePlay("skip");
            } else {
            	oppPlay(turn%nPlayers, "skip");
            }        
            break;
          case "p":
          	incTurn();
              while(winArr.includes(turn%nPlayers)){
              	incTurn();
              }
            if (turn%nPlayers == 0){
            	mePlay("drawTwo");
            } else {
            	oppPlay(turn%nPlayers, "drawTwo");
            }
            break;
          case "w":
          	incTurn();
              while(winArr.includes(turn%nPlayers)){
              	incTurn();
              }
            if (turn%nPlayers == 0){
            	mePlay("play");
            } else {
            	oppPlay(turn%nPlayers, "play");
            }
            break;
          case "f":
          	incTurn();
              while(winArr.includes(turn%nPlayers)){
              	incTurn();
              }
            if (turn%nPlayers == 0){
            	mePlay("drawFour");
            } else {
            	oppPlay(turn%nPlayers, "drawFour");
            }
            break;
          default:
          	tText.innerHTML = "Error!";
          	          
        }
      } else {
      	incTurn();
              while(winArr.includes(turn%nPlayers)){
              	incTurn();
              }
        if (turn%nPlayers == 0){
          mePlay("play");
        } else {
					oppPlay(turn%nPlayers, "play");
        }
        
      }
      
      
      break;
    case "draw":
    	incTurn();
      while(winArr.includes(turn%nPlayers)){
        incTurn();
      }
      if (turn%nPlayers == 0){
        mePlay("play");
      } else {
        oppPlay(turn%nPlayers, "play");
      }
      break;
    case "skipped":
    	incTurn();
      while(winArr.includes(turn%nPlayers)){
        incTurn();
      }
      if (turn%nPlayers == 0){
        mePlay("play");
      } else {
        oppPlay(turn%nPlayers, "play");
      }
      break;
    default:
    	tText.innerHTML = "Error!";
  }
  
}




function mePlay(tp){
  aText.innerHTML = "Your turn!";
  const marker = document.getElementById("marker");
  marker.setAttribute("points", markerArr[0]);
  
  setTimeout(function(){
    switch (tp){
      case "play":

        const oPile = document.getElementById("oPile");
        oPile.addEventListener("click", handArr.func[handArr.id.indexOf("oPile")]);

        playerArr[0].forEach(function(value, index, arr){
          let tId = value;
          let classId = tId + "id";
          const cardColl = document.getElementsByClassName(classId);
          let c = 0;
          while (c < cardColl.length){
            cardColl[c].addEventListener("click", handArr.func[handArr.id.indexOf(tId)]);
            c ++;
          }

        })


        break;
      case "drawTwo":
        let t = 0;
        let giveTwo = setInterval(function(){
          drawOne(0);
          let tId = playerArr[0][playerArr[0].length - 1];
          let classId = tId + "id";
          const cardColl = document.getElementsByClassName(classId);

          let c = 0;
          while (c < cardColl.length){
            let handler = function(){
              playIt(tId, 0);
            }
            handArr.func.push(handler);
            handArr.id.push(tId);
            cardColl[c].addEventListener("click", handler);
            c ++;
          }
          t ++;
          if (t > 1){
            clearInterval(giveTwo);
          }
        }, 200);

        tLog.innerHTML += "-You draw two cards <br>";

        checkTurn("draw");
        break;
      case "drawFour":
        let f = 0;
        let giveFour = setInterval(function(){
          drawOne(0);
          let tId = playerArr[0][playerArr[0].length - 1];
          let classId = tId + "id";
          const cardColl = document.getElementsByClassName(classId);

          let c = 0;
          while (c < cardColl.length){
            let handler = function(){
              playIt(tId, 0);
            }
            handArr.func.push(handler);
            handArr.id.push(tId);
            cardColl[c].addEventListener("click", handler);
            c ++;
          }
          f ++;
          if (f > 3){
            clearInterval(giveFour);
          }
        }, 200);


        tLog.innerHTML += "-You draw four cards <br>";
        checkTurn("draw");
        break;
      case "skip":
        tLog.innerHTML += "-Your turn is skipped <br>";
        checkTurn("skipped");
        break;
      default:
        tText.innerHTML = "Error!";

    }
  }, 500)

}

async function oppPlay(n, tp){
  let displayFirst = new Promise(function(resolve){
    setTimeout(function(){
      aText.innerHTML = "COM" + n + "'s turn!";
      const marker = document.getElementById("marker");
  		marker.setAttribute("points", markerArr[n]);
      return resolve();
    }, 1000);

  })

  await displayFirst;

  setTimeout(function(){
    switch(tp){
      case "play":
        let onDisc = discardPile[discardPile.length - 1];
        let numDisc = onDisc.charAt(0);
        let colDisc = onDisc.charAt(1);
        let possibleCards = [];

        playerArr[n].forEach(function(value, index, arr){
          let onHand = value;
          let numHand = onHand.charAt(0);
          let colHand = onHand.charAt(1);
          if (colDisc == colHand || numDisc == numHand || colHand == "c"){
            possibleCards.push(onHand);
          }

        })

        if (possibleCards.length !== 0){
          let cardToPlay = possibleCards[Math.floor(Math.random() * possibleCards.length)];
          //tText.innerHTML = cardToPlay;
          let coverId = cardToPlay + "cover";
          const coverColl = document.getElementsByClassName(coverId);
          while (coverColl.length > 0){
            coverColl[0].remove();
          }
          setTimeout(function(){
            playIt(cardToPlay, n);
          }, 1000);
        } else {
          drawOne(n);  
          tLog.innerHTML += "-COM" + n + " draw one card <br>";
          let onHand = playerArr[n][playerArr[n].length - 1];
          let numHand = onHand.charAt(0);
          let colHand = onHand.charAt(1);
          let coverId = onHand + "cover";
          const coverColl = document.getElementsByClassName(coverId);

          if (colDisc == colHand || numDisc == numHand || colHand == "c"){
            setTimeout(function(){
              while (coverColl.length > 0){
                coverColl[0].remove();
              }
              playIt(onHand, n);
            }, 500);
          } else {
            checkTurn("draw");
          }

        }




        break;
      case "drawTwo":
        let t = 0;
        let giveTwo = setInterval(function(){
          drawOne(n);
          t ++;
          if (t > 1){
            clearInterval(giveTwo);
          }
        }, 200);
        tLog.innerHTML += "-COM" + n + " draw two cards <br>";
        checkTurn("draw");
        break;
      case "drawFour":
        let f = 0;
        let giveFour = setInterval(function(){
          drawOne(n);
          f ++;
          if (f > 3){
            clearInterval(giveFour);
          }
        }, 200);
        tLog.innerHTML += "-COM" + n + " draw four cards <br>";
        checkTurn("draw");
        break;
      case "skip":
        tLog.innerHTML += "-COM" + n + "'s turn is skipped <br>";
        checkTurn("skipped");
        break;
      default:
        tText.innerHTML = "Error!";
    }
  }, 1000);

}

function playIt(id, p){
	//tText.innerHTML = id;
  let onDisc = discardPile[discardPile.length - 1];
  let numDisc = onDisc.charAt(0);
  let colDisc = onDisc.charAt(1);
  
  let onHand = id;
  let numHand = onHand.charAt(0);
  let colHand = onHand.charAt(1);
  
  if (colDisc == colHand || numDisc == numHand || colHand == "c"){
  	
    if ((numDisc == "w" || numDisc == "f") && (colDisc !== "c")){
    	let tSubs = onDisc.replace(colDisc, "c")
      discardPile.splice(discardPile.indexOf(onDisc), 1, tSubs);
    }
    
    onDisc = discardPile[discardPile.length - 1];
    
    let classId = id + "id";
  	let cardId = id + "card";
    let coverId = id + "cover";
    const cardColl = document.getElementsByClassName(classId);
    const coverColl = document.getElementsByClassName(coverId);
    const card = document.getElementById(cardId);
    let x0 = Number(card.getAttribute("x"));
    let y0 = Number(card.getAttribute("y"));
    let xDiff = 200 - x0;
  	let yDiff = 250 - y0;
    
    let cr = 0;
    while (cr < cardColl.length){
      cardColl[cr].removeEventListener("click", handArr.func[handArr.id.indexOf(id)]);
      cr ++;
    }
    //tText.innerHTML = cardColl.length;
    let c = 0
    while(c < cardColl.length){
      let xOld = Number(cardColl[c].getAttribute("x"));
      let yOld = Number(cardColl[c].getAttribute("y"));
      cardColl[c].setAttribute("x", xOld + xDiff);
      cardColl[c].setAttribute("y", yOld + yDiff);
      c ++;
    }
    
    /*if (p !== 0){
    	while (coverColl.length > 0){
        coverColl[0].remove();
      }
    }*/
    
    let classDisc = onDisc + "id";
    const discColl = document.getElementsByClassName(classDisc);
        
    while(discColl.length > 0){
      discColl[0].remove();
    }
    discardPile.push(id);
    playerArr[p].splice(playerArr[p].indexOf(id), 1)
    //tText.innerHTML = discardPile + " | " + playerArr[p];
    
    playerArr[p].forEach(function(value, index, arr){
    	let rClassId = value + "id";
      let rCardId = value + "card";
      const rCard = document.getElementById(rCardId);
      let xR = Number(rCard.getAttribute("x"));
      if (xR > x0){
        const rCardColl = document.getElementsByClassName(rClassId);
        let rc = 0;
        while (rc < rCardColl.length){
        	let xOldR = Number(rCardColl[rc].getAttribute("x"));
          rCardColl[rc].setAttribute("x", xOldR - 40);
          rc ++;
        }
        
      }
    })
    
    if (p == 0){
    	tLog.innerHTML += "-You played " + id + "<br>";
    } else {
    	tLog.innerHTML += "-COM" + p + " played " + id + "<br>";
    }
    
    
    
    if (colHand == "c"){
    	if (p == 0){
      	chooseColor();
      } else {
      	let colors = ["red", "green", "blue", "yellow"];
        setTimeout(function(){
        	let chosen = colors[Math.floor(Math.random() * colors.length)];
          changeTo(chosen);
        }, 1000)
      }    
    } else {
    	checkTurn("play");
    }
    
  }
  
}

function meDrawOne(){
	drawOne(0);
  tLog.innerHTML += "-You draw one card <br>";
  let tId = playerArr[0][playerArr[0].length - 1];
  let classId = tId + "id";
  const cardColl = document.getElementsByClassName(classId);
  
  let c = 0;
  while (c < cardColl.length){
    let handler = function(){
      playIt(tId, 0);
    }
    handArr.func.push(handler);
    handArr.id.push(tId);
    cardColl[c].addEventListener("click", handler);
    c ++;
  }
  
  let onDisc = discardPile[discardPile.length - 1];
  let numDisc = onDisc.charAt(0);
  let colDisc = onDisc.charAt(1);
  
  let onHand = tId;
  let numHand = onHand.charAt(0);
  let colHand = onHand.charAt(1);
  
  if (colDisc == colHand || numDisc == numHand || colHand == "c"){
  	setTimeout(function(){
  		playIt(tId, 0);
  	}, 500);
  } else {
  	checkTurn("draw");
  }
    
    
}


function drawOne(p){
	//tText.innerHTML = "Take one!"
  
  let whoDrawId = playerArr[p][playerArr[p].length - 1];
  let wCardId = whoDrawId + "card";
  const wCard = document.getElementById(wCardId);
  let xWho = Number(wCard.getAttribute("x"));
  let yWho = Number(wCard.getAttribute("y"));
  
  let randCard = drawPile[Math.floor(Math.random()* drawPile.length)];
  drawPile.splice(drawPile.indexOf(randCard), 1);
  
  
  
  let classId = randCard + "id";
  let cardId = randCard + "card";
  let coverId = randCard + "cover";
  const cardColl = document.getElementsByClassName(classId);
  const coverColl = document.getElementsByClassName(coverId);
  const card = document.getElementById(cardId);
  let x0 = Number(card.getAttribute("x"));
  let y0 = Number(card.getAttribute("y"));
  let w = Number(card.getAttribute("width"));
  let h = Number(card.getAttribute("height"));
  
  let xDiff = xWho + 40 - x0;
  let yDiff = yWho - y0;
  
  let c = 0
  while(c < cardColl.length){
    let xOld = Number(cardColl[c].getAttribute("x"));
    let yOld = Number(cardColl[c].getAttribute("y"));
    cardColl[c].setAttribute("x", xOld + xDiff);
    cardColl[c].setAttribute("y", yOld + yDiff);
    c ++;
  }
  
  if (p == 0){
  	while (coverColl.length > 0){
      coverColl[0].remove();
    }
  }
  
    
  playerArr[p].push(randCard);
  
  
  
  //tText.innerHTML = playerArr[p];
  
}

function chooseColor(){
	const chPad = document.createElementNS(svgNS, "rect");
  chPad.setAttribute("x", 50);
  chPad.setAttribute("y", 400);
  chPad.setAttribute("width", 56);
  chPad.setAttribute("height", 56);
  chPad.setAttribute("stoke", "black");
  chPad.setAttribute("fill", "gray");
  chPad.setAttribute("class", "colPad");
  svg.appendChild(chPad);
  
  let colors = ["red", "green", "blue", "yellow"];
  for (let i = 0; i < colors.length; i ++){
  	let tCol = colors[i];
    const colPad = document.createElementNS(svgNS, "rect");
    colPad.setAttribute("x", 52 + (i%2)*27);
    colPad.setAttribute("y", 402 + Math.floor(i/2)*27);
    colPad.setAttribute("width", 25);
    colPad.setAttribute("height", 25);
    colPad.setAttribute("fill", tCol);
    colPad.addEventListener("click", function(){
    	changeTo(tCol);
    });
    colPad.setAttribute("class", "colPad");
    svg.appendChild(colPad);
  }
  
}

function changeTo(c){
	//tText.innerHTML = "The color is " + c;
  
  let onDisc = discardPile[discardPile.length - 1];
  let classDisc = onDisc + "id";
  
  
  const colSign = document.createElementNS(svgNS, "rect");
  colSign.setAttribute("x", 213);
  colSign.setAttribute("y", 285);
  colSign.setAttribute("width", 9);
  colSign.setAttribute("height", 9);
  colSign.setAttribute("fill", c);
  colSign.setAttribute("class", classDisc);
  svg.appendChild(colSign);
  
  let tSubs = onDisc.replace("c", c.charAt(0));
  discardPile.splice(discardPile.indexOf(onDisc), 1, tSubs);
  
  const padColl = document.getElementsByClassName("colPad");
  while (padColl.length > 0){
    padColl[0].remove();
  }
  
  tLog.innerHTML += "-Color changed to " + c + "<br>";
  
  //tText.innerHTML = discardPile;
  
  checkTurn("play");
  
}

function checkWin(p){
	let rank = ["2nd", "3rd", "4th"];
  if (playerArr[p].length == 0 && winArr.includes(p) == false){
  	let player;
    if (p == 0){
    	player = "-You";
    } else {
    	player = "-COM" + p;
    }
    if (winArr.length == 0){
    	tLog.innerHTML += player + " finished first! <br>";
    } else {
    	let place = winArr.length + 1;
      
      tLog.innerHTML += player + " finished " + rank[place - 2] + "! <br>";
    }
    winArr.push(p);
    
    if ((nPlayers - winArr.length) == 1){
    	let lastPlayer = playerArr.forEach(function(value, index, arr){
      	if (value.length !== 0){
        	return index;
        }
      })
      if (lastPlayer == 0){
        player = "-You";
      } else {
        player = "-COM" + p;
      }
      tLog.innerHTML += player + " finished " + rank[nPlayers - 2] + "! <br>";
      tLog.innerHTML += "-Game over!";
      return true;
    }
  }
}

function flipCard(id){
	let cardId = id + "card";
  
  const card = document.getElementById(cardId);
  let x0 = Number(card.getAttribute("x"));
  let y0 = Number(card.getAttribute("y"));
  let w = card.getAttribute("width");
  let h = card.getAttribute("height");
  let coverId = id + "cover";
  let classId = id + "id";

  const cover = document.createElementNS(svgNS, "rect");
  cover.setAttribute("x", x0);
  cover.setAttribute("y", y0);
  cover.setAttribute("width", w);
  cover.setAttribute("height", h);
  cover.setAttribute("stroke", "black");
  cover.setAttribute("fill", "darkslategray");
  cover.classList.add(coverId, classId);
  svg.appendChild(cover);

  
  const cText = document.createTextNode("UNO");
  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("x", x0);
  text.setAttribute("font-size", 24*35/50); 
  text.setAttribute("y", y0 + 35*35/50);
	text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("textLength", 50*35/50)
  text.setAttribute("font-family", "sans-serif");
  text.setAttribute("stroke", "black");
  text.setAttribute("stroke-width", 0.5);
  text.setAttribute("fill", "gold");
	text.classList.add(coverId, classId);
  text.appendChild(cText);
  svg.appendChild(text);

}
