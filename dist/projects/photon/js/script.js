const auth = "563492ad6f9170000100000192a29a37a70647e3a5b23d6170362bbb";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-form__input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".nav-button__more");

const apiObj = {
    method: "GET",
    headers: {
        Accept: 'application/json',
        Authorization: auth

    }
};

let searchValue;
let page = 1;
let fetchLink;
let currentSearch;



// Event listeners 

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);



function updateInput(e) {
    searchValue = e.target.value;
}


async function fetchApi(url) {
    const dataFetch = await fetch(url, apiObj);
    const data = await dataFetch.json();

    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
            
        </div>
        <img src=${photo.src.large}></img>
        `;

        gallery.appendChild(galleryImg);
    })
}

async function curatedPhotos () {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
 
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;

    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}


async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    }else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos ();



