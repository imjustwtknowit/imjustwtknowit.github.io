const writeBox = document.getElementById("random");
const maxNum = document.getElementById("max")

function getRandom(){
  let max = Number(maxNum.value);
  if (max !== 0){
    let n = Math.floor((Math.random() * max)) + 1;
    writeBox.setAttribute("value", n);
  }
}
