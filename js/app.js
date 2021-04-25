'use strict';

let productsArray=[];
let leftImageElement=document.getElementById('leftImageElement');
let middleImageElement=document.getElementById('middleImageElement');
let rightImageElement=document.getElementById('rightImageElement');
let container=document.getElementsByClassName('produts')[0];
let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
let maxAttempts=25;
let userAttemptCounter=0;
let button=document.createElement('button');
let resultDiv=document.getElementsByClassName('resultsCol')[0];
let resultList=document.createElement('ul');
button.hidden=true;

let imgArry = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep.png',
  'tauntaun',
  'unicorn',
  'usb.gif',
  'water-can',
  'wine-glass'
];

function Products(name){
  this.name=name;

  if(this.name==='sweep.png'||this.name==='usb.gif'){
    this.img=`./img/${name}`;
  }else{this.img=`./img/${name}.jpg`;}

  this.occurrence=0;
  this.votes=0;
  productsArray.push(this);
}


for(let i=0;i<imgArry.length;i++){
  new Products(imgArry[i]);
}
function generateRandomIndex(){
  return Math.floor(Math.random()*productsArray.length);
}

function renderThreeImages(){
  leftImageIndex=generateRandomIndex(0,imgArry.length-1);
  do{
    middleImageIndex=generateRandomIndex(0,imgArry.length-1);
  }
  while(middleImageIndex===leftImageIndex);
  do{rightImageIndex=generateRandomIndex(0,imgArry.length-1);
  }
  while(rightImageIndex===leftImageIndex||rightImageIndex===middleImageIndex);

  leftImageElement.src=productsArray[leftImageIndex].img;
  productsArray[leftImageIndex].occurrence++;

  middleImageElement.src=productsArray[middleImageIndex].img;
  productsArray[middleImageIndex].occurrence++;

  rightImageElement.src=productsArray[rightImageIndex].img;
  productsArray[rightImageIndex].occurrence++;
}
renderThreeImages();

container.addEventListener('click',handleUserClick);

function viewResults(event){
  button.hidden=true;
  console.log(event.target.value);
  resultDiv.appendChild(resultList);
  let listItem;
  for(let i=0;i<productsArray.length;i++){
    listItem=document.createElement('li');
    listItem.textContent=`${productsArray[i].name} had ${productsArray[i].votes} votes,and was seen ${productsArray[i].occurrence} TimeRanges.`;
    resultList.appendChild(listItem);
  }
}

function handleUserClick(event){
  userAttemptCounter++;
  if(userAttemptCounter<=maxAttempts){
    if(event.target.id==='leftImageElement'){
      productsArray[leftImageIndex].votes++;
    }else if(event.target.id==='middleImageElement'){
      productsArray[middleImageIndex].votes++;
    }else{productsArray[rightImageIndex].votes++;
    }
    renderThreeImages();
  }else{
    button.hidden=false;
    resultDiv.appendChild(button);
    button.textContent='View Results';
    button.addEventListener('click',viewResults);
    container.removeEventListener('click',handleUserClick);
  }
}
