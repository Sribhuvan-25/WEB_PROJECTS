const auth = "563492ad6f9170000100000174551b52546d49e18922477e3f2d9bac";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector('.more');
let pageNum = 1;
let fetchLink;
let currentSearch;
let searchValue;

searchInput.addEventListener('input', inputUpdate);
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(currentSearch);
} )

more.addEventListener('click',loadMore);

function inputUpdate(e){
    searchValue = e.target.value;
}
async function getApi(url){
    const fetchData = await fetch(url, {
        method: 'GET',
        headers:{
            Accept:'application/json',
            Authorization:auth
        }
    });
    const data = await fetchData.json();
    return data;
    

}
async function getPictures(data){
    data.photos.forEach(photo => {
        const galleryImage = document.createElement('div');
        galleryImage.classList.add("gallery-img");
        galleryImage.innerHTML = ` 
        <div class="gallery-div">
        <p> ${photo.photographer} </p>
        <a href=${photo.src.original}>Download </a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImage);
    })
}
function clear(){
    gallery.innerHTML="";
    searchInput.value="";
}


async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await getApi(fetchLink);
    getPictures(data);
    
}
async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    const data = await getApi(fetchLink);
    getPictures(data);
}

async function loadMore(){
    pageNum++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${pageNum}`
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${pageNum}`
    }
    const data = await getApi(fetchLink);
    getPictures(data);
}

 


curatedPhotos();




