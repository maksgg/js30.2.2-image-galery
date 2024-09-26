const accessKey = 'zcEqAVSkkmgtfthOh8ZogG1DxWPCeozNCVNRwKbfrYg';

const formEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const magnifyingGlass = document.querySelector('.magnifying-glass');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-button');

let inputData = '';
let page = 1;

async function searchImages () {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&per_page=9&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = '';
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = 'block';
    }

}

formEl.addEventListener('submit', (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener('click', () =>{
    searchImages();
})
magnifyingGlass.addEventListener('click', () =>{
    searchImages();
})


function fetchData() {
    // Запит на випадкові фотографії
    const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=9`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка отримання даних з API');
        }
        return response.json();
      })
      .then(data => {
        const searchResults = document.querySelector('.search-results');
        searchResults.innerHTML = ''; // Очищаємо попередні результати

        data.forEach(photo => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('search-result');

            const img = document.createElement('img');
            img.src = photo.urls.small;
            img.alt = photo.alt_description || 'Image from Unsplash';

            const link = document.createElement('a');
            link.href = photo.links.html;
            link.target = '_blank';
            link.textContent = photo.alt_description || 'View on Unsplash';

            imageWrapper.appendChild(img);
            imageWrapper.appendChild(link);
            searchResults.appendChild(imageWrapper);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);  // Виводимо помилки
      });
}

window.onload = function () {
    document.getElementById('search-input').focus();
    fetchData();
}


