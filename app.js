/* define all elements */
const searchBtn = document.querySelector('.search-btn');
const input = document.querySelector('input');
const searchResult = document.querySelector('.search-result');
const nxtPrev = document.querySelector('.next-prev');
const lyrics = document.querySelector('.lyric');
const title = document.querySelector('.single-lyrics h2');
const url = 'https://api.lyrics.ovh';

/* Update UI controller */
function updateUI (data) {
	searchResult.innerHTML = '';
	data.data.forEach((item, idx) => {
		if (idx < 10) {
			searchResult.innerHTML += `
        <div class="single-result row align-items-center mb-3 p-3">
            <div class="col-md-9 d-flex align-items-center">
                <img src="${item.album.cover_medium}">
                    <div class="ml-3">
                        <h3 class="lyrics-name">${item.title}</h3>
                        <p class="author lead">Album by <span>${item.artist.name}</span></p>
                    </div>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" data-artist="${item.artist
					.name}" data-title="${item.title}">Get Lyrics</button>
            </div>
        </div>
        `;
		}
	});
	lyrics.innerHTML = '';
}

/* Display Lyrics to the DOM */
function displayLyrics (data) {
	let lyric = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
	lyrics.innerHTML = lyric;
}

/* Sow message if lyrics is not found */
function errorHandle () {
	lyrics.innerHTML = '<p style="font-size:1.7rem" class="text-danger">Lyrics Not Found. Try another song</p>';
}

/* Fetch data from API */
async function fetchData (name) {
	searchResult.innerHTML = '<p class="text-center" style="font-size:2rem">Loading...</p>';
	let response = await fetch(`${url}/suggest/${name}`);
	let data = await response.json();
	updateUI(data);
}

/* Fetch lyrics from API */
function fetchLyrics (artist, song) {
	lyrics.innerHTML = '<p class="text-center" style="font-size:2rem">Loading...</p>';
	fetch(`${url}/v1/${artist}/${song}`)
		.then((res) => res.json())
		.then((data) => {
			displayLyrics(data);
		})
		.catch((err) => {
			console.log(err);
			errorHandle();
		});
	title.innerHTML = `<strong>${artist}</strong> - ${song}`;
}

/* Search button click */
searchBtn.addEventListener('click', () => {
	lyrics.innerHTML = '';
	title.innerHTML = '';
	let searchSong = input.value.trim();
	if (!searchSong) {
		alert('Enter Your Song Name');
	}
	else {
		fetchData(searchSong);
	}
	input.focus();
});

/* Get lyrics button click */
searchResult.addEventListener('click', function (event) {
	const clickItem = event.target;
	if (clickItem.tagName === 'BUTTON') {
		const artistName = clickItem.getAttribute('data-artist');
		const songTitle = clickItem.getAttribute('data-title');
		fetchLyrics(artistName, songTitle);
	}
});
