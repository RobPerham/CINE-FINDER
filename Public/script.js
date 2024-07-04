const tmdbKey = '80d5c3e08e504c203c5c4971d1b959ea';
const tmdbBaseUrl = 'https://api.themoviedb.org/';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequest = '/genre/movie/list';  // Get a list of movie genres
  const reqestParams = `?api_key=${tmdbKey}&language=en-US`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${reqestParams}`;

  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
     const jsonResponse = await response.json();
     const genres = jsonResponse.genres;
     return genres;

    }
  }catch(error){
    console.log(error);
  };
};

const getMovies =  () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  
};

const getMovieInfo = () => {

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;