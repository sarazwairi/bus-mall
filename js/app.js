'use strict';

let productsArray = [];
let leftImageElement = document.getElementById('leftImageElement');
let middleImageElement = document.getElementById('middleImageElement');
let rightImageElement = document.getElementById('rightImageElement');
let container = document.getElementsByClassName('produts')[0];
let leftImageIndex;
let middleImageIndex;
let rightImageIndex;
let maxAttempts = 25;
let userAttemptCounter = 0;
let button = document.createElement('button');
let resultDiv = document.getElementsByClassName('resultsCol')[0];
let resultList = document.createElement('ul');
button.hidden = true;
let previousImages = [];
let productVotes = [];
let productOccurrence = [];
let productNames = [];


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

function Products(name) {
  this.name = name;

  if (this.name === 'sweep.png' || this.name === 'usb.gif') {
    this.img = `./img/${name}`;
  } else { this.img = `./img/${name}.jpg`; }

  this.occurrence = 0;
  this.votes = 0;
  productsArray.push(this);
}

for (let i = 0; i < imgArry.length; i++) {
  new Products(imgArry[i]);
}
//lab13
function getProducts(){
  let proStringObj=localStorage.getItem('products');
  let proObj=JSON.parse(proStringObj);

  if(proObj){
    for(let i=0;i<proObj.length;i++){
      productsArray=proObj;
    }
  }
}
function setProducts(){
  let proStringObj=JSON.stringify(productsArray);
  localStorage.setItem('products',proStringObj);
}

function generateRandomIndex() {
  return Math.floor(Math.random() * productsArray.length);
}

function renderThreeImages() {
  do {
    leftImageIndex = generateRandomIndex(0, imgArry.length - 1);
  }
  while (previousImages.includes(leftImageIndex));
  do {
    middleImageIndex = generateRandomIndex(0, imgArry.length - 1);
  }
  while ((middleImageIndex === leftImageIndex )|| previousImages.includes(middleImageIndex));
  do {
    rightImageIndex = generateRandomIndex(0, imgArry.length - 1);
  } while ((rightImageIndex === leftImageIndex )|| (rightImageIndex === middleImageIndex) || previousImages.includes(rightImageIndex));

  previousImages = [rightImageIndex, middleImageIndex, leftImageIndex];

  leftImageElement.src = productsArray[leftImageIndex].img;
  productsArray[leftImageIndex].occurrence++;

  middleImageElement.src = productsArray[middleImageIndex].img;
  productsArray[middleImageIndex].occurrence++;

  rightImageElement.src = productsArray[rightImageIndex].img;
  productsArray[rightImageIndex].occurrence++;
}
renderThreeImages();

function chartRendering() {
  let ctx = document.getElementById('dataChart').getContext('2d');
  // eslint-disable-next-line no-unused-vars
  let dataChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:productNames,
      datasets: [{
        label:'selected' ,
        data:productVotes,
        backgroundColor:
          '#daa520',
        borderColor:
          '#daa520',
        borderWidth: 1,
      }, {
        label: 'shown',
        data: productOccurrence,
        backgroundColor:
          'rgba(28,158,61)',
        borderColor:
          'rgba(28,158,61)',
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
getProducts();

container.addEventListener('click', handleUserClick);

// eslint-disable-next-line no-unused-vars
function viewResults(event) {
  button.hidden = true;
  resultDiv.appendChild(resultList);
  let listItem;
  for (let i = 0; i < productsArray.length; i++) {
    listItem = document.createElement('li');
    listItem.textContent = `${productsArray[i].name} had ${productsArray[i].votes} votes,and was seen ${productsArray[i].occurrence} TimeRanges.`;
    resultList.appendChild(listItem);
    productVotes.push(productsArray[i].votes);
    productOccurrence.push(productsArray[i].occurrence);
    productNames.push(productsArray[i].name);
  }
}

function handleUserClick(event) {
  userAttemptCounter++;
  if (userAttemptCounter <= maxAttempts) {
    if (event.target.id === 'leftImageElement') {
      productsArray[leftImageIndex].votes++;
      setProducts();
    } else if (event.target.id === 'middleImageElement') {
      productsArray[middleImageIndex].votes++;
      setProducts();
    } else {
      productsArray[rightImageIndex].votes++;
      setProducts();
    }
    renderThreeImages();
  } else {
    container.removeEventListener('click', handleUserClick);
    for(let i=0;i<productsArray.length;i++){
      productVotes.push(productsArray[i].votes);
      productOccurrence.push(productsArray[i].occurrence);
      productNames.push(productsArray[i].name);
    }
    chartRendering();
    button.hidden = false;
    resultDiv.appendChild(button);
    button.textContent = 'View Results';
    button.addEventListener('click', viewResults);
  }
}
