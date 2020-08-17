const searchBtn = document.querySelector('.search-btn')
const input = document.querySelector('input')
const searchResult = document.querySelector('.search-result')
const nxtPrev = document.querySelector('.next-prev')
const url = 'https://api.lyrics.ovh';
let nxtUrl = 'http://api.deezer.com/search?limit=15&q=one&index=15'

async function fetchData(name) {
    let response = await fetch(`${url}/suggest/${name}`);
    let data = await response.json()
    updateUI(data)
}

function updateUI(data) {
    data.data.forEach((item, idx) => {
        if (idx < 10) {
            searchResult.innerHTML +=
                `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${item.title}</h3>
                <p class="author lead">Album by <span>${item.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" data-artist="${item.artist.name}" data-title="${item.title}">Get Lyrics</button>
            </div>
        </div>
        `;
        }
    });
}

searchBtn.addEventListener('click', () => {
    let searchSong = input.value.trim();
    if (!searchSong) {
        alert('Enter Your Song Name')
    } else {
        fetchData(searchSong)
    }
})

fetch('https://api.lyrics.ovh/suggest/one')
    .then(res => {
        return res.json()
    }).then(data => {
        console.log(data)
    })