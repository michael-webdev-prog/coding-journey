const movieInput = document.getElementById("movieInput");
const searchMovie = document.getElementById("searchMovie");
const movieResult = document.getElementById("movieResult");

const apiKey = "7a51f911";

searchMovie.addEventListener("click", function () {
    
    
    const movie = movieInput.value.trim();
    
    if (movie === "") {
        movieResult.innerHTML = "Please enter a movie name.";
        return;
    }
    
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;
    
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        if (data.Response === "False") {
            movieResult.innerHTML = "Movie not found.";
            return;
        }

        movieResult.innerHTML = `
            <img src="${data.Poster}" width="250">

            <h2>${data.Title}</h2>

            <p><strong>Year:</strong> ${data.Year}</p>

            <p><strong>Genre:</strong> ${data.Genre}</p>

            <p><strong>IMDb:</strong> ${data.imdbRating}</p>

            <p><strong>Plot:</strong> ${data.Plot}</p>
        `;

        });

});