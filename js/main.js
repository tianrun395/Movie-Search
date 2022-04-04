// raise jQuery
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searTxt = $('#searchText').val();
        getMovies(searTxt);
        e.preventDefault();
    });
});

function getMovies(searTxt) {
    axios.get('http://www.omdbapi.com?s=' + searTxt + '&apikey=thewdb')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let res = '';
            $.each(movies, (index, movie) => {
                res += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieChosen('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>
                `
            });
            $('#movies').html(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieChosen(id) {
    sessionStorage.setItem('movieID', id);
    window.location = 'movie.html';
    return false;
}

function getMv() {
    let movieID = sessionStorage.getItem('movieID');
    axios.get('http://www.omdbapi.com?i=' + movieID + '&apikey=thewdb')
        .then((response) => {
            console.log(response);
            let curMovie = response.data;
            let output = `
            <br></br>
            <div class="row">
                <div class="col-md-4">
                    <img src="${curMovie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${curMovie.Title}</h2>
                    <br></br>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${curMovie.Genre}</li>
                        <li class="list-group-item"><strong>Year:</strong> ${curMovie.Year}</li>
                        <li class="list-group-item"><strong>Country:</strong> ${curMovie.Country}</li>
                        <li class="list-group-item"><strong>Language:</strong> ${curMovie.Language}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${curMovie.Released}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${curMovie.Director}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${curMovie.Actors}</li>
                        <li class="list-group-item"><strong>Rating:</strong> ${curMovie.imdbRating}</li>
                        <li class="list-group-item"><strong>Runtime:</strong> ${curMovie.Runtime}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <hr>
                    <h3>Plot</h3>
                    ${curMovie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${curMovie.imdbID}" target="_blank" class="btn btn-primary">View at IMDB</a>
                    <a href="index.html" class="btn btn-default">Go To Search Other Movies</a>
                    <br></br>
                    <br></br>
                </div>
            </div>
            `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}