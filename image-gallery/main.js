
const accessKey = 'KIFJow7qbNoe-AkxlJEvCpyN_Fk1j59jxpd96PLD0hU';

const search = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const resultsSearch = document.querySelector('.results')
let page = 1;
const perPage = 12;

// Поиск картинок
async function searchImages(){
    const getData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?query=${getData}&page=${page}&per_page=${perPage}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
		console.log(data)

    const results = data.results;
        if(page === 1) {
            resultsSearch.innerHTML = '';
        };
   
    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
				imageWrapper.classList.add ('results__search');
        const image = document.createElement('img');
        image.classList.add ('results__search-img');
        image.src = result.urls.small;

        imageWrapper.appendChild(image);
        resultsSearch.appendChild(imageWrapper);
    });

}

search.addEventListener('submit',(event) => {
    event.preventDefault();
    searchImages();
});

searchImages();
