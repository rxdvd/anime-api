const button = document.querySelector("button");

button.addEventListener('click', () => {
    getRandomAnime();
});

function getRandomAnime(){
    fetch("http://localhost:3000")
    .then(response => response.json())
    .then(renderRandomAnime);
}

function renderRandomAnime(json){
    const title = document.querySelector("");
    const summary = document.querySelector("");
    const genres = document.querySelector("");
    const episodes = document.querySelector("");
    const seasons = document.querySelector("");
    const year = document.querySelector("");

    title.textContent = json.title;
    summary.textContent = json.summary;
    genres.textContent = json.genres.join(", ");
    episodes.textContent = json.episodes;
    seasons.textContent = json.seasons;
    year.textContent = json.year;
}
