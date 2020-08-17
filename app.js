const searchBtn = document.querySelector('.search-btn')
const input = document.querySelector('input')
const searchResult = document.querySelector('.search-result')
const nxtPrev = document.querySelector('.next-prev')
const url = 'https://api.lyrics.ovh';

async function fetchData(name) {
    searchResult.innerHTML = '<p class="text-center" style="font-size:2rem">Loading...</p>'
    let response = await fetch(`${url}/suggest/${name}`);
    let data = await response.json()
    updateUI(data)
}

function updateUI(data) {
    searchResult.innerHTML = '';
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
    title.innerHTML = 'Song title';
    lyrics.innerHTML = '';
}
const lyrics = document.querySelector('.lyric')
const title = document.querySelector('.single-lyrics h2')

function displayLyrics(data) {
    let lyric = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')
    lyrics.innerHTML = lyric;
}

function errorHandle() {
    lyrics.innerHTML = 'Lyrics is missing.Try another song'
}

function fetchLyrics(artist, song) {
    lyrics.innerHTML = 'Loading...'
    fetch(`${url}/v1/${artist}/${song}`)
        .then(res => res.json())
        .then(data => {
            displayLyrics(data)
        })
        .catch(err => {
            console.log('not found');
            errorHandle()
        })
    title.innerHTML = `<strong>${artist}</strong> - ${song}`
}

searchResult.addEventListener('click', function (event) {
    const clickItem = event.target;
    if (clickItem.tagName === "BUTTON") {
        const artistName = clickItem.getAttribute('data-artist')
        const songTitle = clickItem.getAttribute('data-title')
        fetchLyrics(artistName, songTitle)
    }
})

searchBtn.addEventListener('click', () => {
    let searchSong = input.value.trim();
    if (!searchSong) {
        alert('Enter Your Song Name')
    } else {
        fetchData(searchSong)
    }
    input.focus()
})


fetch('https://api.lyrics.ovh/suggest/one')
    .then(res => {
        return res.json()
    }).then(data => {
        console.log(data)
    })