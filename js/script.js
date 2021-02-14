const card = document.querySelector('.card');
const imageLink = document.getElementById('image-link');
const image = document.getElementById('image');
let imgArr = [];

//Show loader, hide card
function showLoader() {
  loader.hidden = false;
  card.classList.add('hidden');
}

//Hide loader, show card
function hideLoader() {
  loader.hidden = true;
  card.classList.remove('hidden');
}

//Get current APOD from NASA API
const getAPOD = async () => {
  showLoader();
  //comes as an object
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    imgArr.push(data);
    displayImg(data);
  } catch (error) {
    console.log(error);
  }
};

//Get random APOD from archive
const getRandomAPOD = async () => {
  showLoader();
  //Comes as an array
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    imgArr.splice(0, 1);
    imgArr = data;
    displayImg(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//Display APOD data
const displayImg = (data) => {
  document.getElementById('title').textContent = imgArr[0].title;
  document.getElementById('date').textContent = imgArr[0].date;
  imageLink.href = imgArr[0].hdurl;
  image.src = imgArr[0].url;
  document.getElementById('explanation').textContent = imgArr[0].explanation;
  if (imgArr[0].copyright) {
    document.getElementById('credit').innerHTML =
      '&#169; ' + imgArr[0].copyright;
  } else {
    document.getElementById('credit').innerHTML = '&#169; Unknown';
  }

  //Wait until image is fully loaded to display the card
  image.addEventListener('load', () => {
    hideLoader();
  });
};

//On load
getAPOD();

//On btn click
document.querySelector('button').addEventListener('click', getRandomAPOD);
