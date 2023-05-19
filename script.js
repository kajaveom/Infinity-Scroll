const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 2;
const  apiKey = '36544529-315d2f647bed94b7216914dd1';
const apiUrl = `https://pixabay.com/api/?key=${apiKey}&image_type=photo`;

// Check if all images were loaded

function imageLoaded() {
   // console.log('image loaded');
    imagesLoaded++;
    //console.log('Images loaded = ', imagesLoaded);
    //console.log('Total Images = ', totalImages);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}



// Create Elements for links and photos , Add to DOM

function displayPhotos() {

    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        
        //console.log(photo);

        // Create <a> element
        const item = document.createElement('a');
        item.setAttribute('href', photo.previewURL);
        item.setAttribute('target' , '_blank');
        
        // Create img for photo
        const img = document.createElement('img');
        img.setAttribute('src' , photo.largeImageURL);
        img.setAttribute('alt', "Photo");
        img.setAttribute('title', photo.tags);

        // Put <img> inside the <a> element then put both inside the image container

        // Event Listner, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Check to see if scrolling near bottom of the page

window.addEventListener('scroll', () => {
    // console.log('scrolled');
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});




// GET Photos from Unsplash api

async function getPhotos(){

    try{
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        photosArray = photosArray.hits;
        displayPhotos();
    }
    catch(err){

    }
}

// On Load
getPhotos();