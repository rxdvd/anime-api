const button = document.querySelector("button");

button.addEventListener('click', () => {
    getRandomAnime();
});

function getRandomAnime(){
    fetch("http://localhost:3000/animes/random")
    .then(response => response.json())
    .then(renderRandomAnime);
}

function renderRandomAnime(json){
    const container = document.querySelector(".result");

    container.innerHTML = "";

    container.innerHTML += "Title: " + json.title + "<br/>";
    container.innerHTML += "Summary: " + json.summary + "<br/>";
    container.innerHTML += "Genres: " + json.genres.join(", ") + "<br/>";
    container.innerHTML += "Episodes: " + json.episodes + "<br/>";
    container.innerHTML += "Seasons: " + json.seasons + "<br/>";
    container.innerHTML += "Year: " + json.year;
}
