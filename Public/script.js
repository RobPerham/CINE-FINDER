const tmdbKey = 'ecd094e3ef3b28faa2739217add8d5cd';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');
/*
const form = document.getElementById('form');
const select = document.getElementById('genres');

const mylikedMovies = loadlikedMovies()
const mydislikedMovies = loaddislikedMovies()
console.log(mylikedMovies)

if (myLikedMovies) {
  myLikedMovies.forEach((movie) => createLikedMovie(movie))
}

if (myDislikedMovies) {
  myDislikedMovies.forEach((movie) => createDislikedMovie(movie))
}
*/


// Gets the selected genre from the dropdown menu
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list'  // Get a list of movie genres
  const reqestParams = `?api_key=${tmdbKey}`  // Request parameters
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${reqestParams}`
  
    try{
      const response = await fetch(urlToFetch)
      if(response.ok){
      const jsonResponse = await response.json()
      const genres = jsonResponse.genres
      return genres

      }
        }catch(error){
          console.log(error)
        }
}

// search for a person
const searchPerson  = async () => {
  const searchPersonEndpoint = '/search/person'
  const castInput = getCastValue()
  const requestParams = `?api_key=${tmdbKey}&query=${searchPerson}`
  const urlToFetch = `${tmdbBaseUrl}${searchPersonEndpoint}${requestParams}`

  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      const person = jsonResponse.results
      return person
    }
  }catch(error){
    console.log(error)
  }
}


// Populates the genre dropdown menu with the list of genres
const getMovies = async () => {   
  const selectedGenre = getSelectedGenre()
  const discoverMovieEndpoint = '/discover/movie'
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`

  try{
    const response = await fetch(urlToFetch)

    if(response.ok){
      const jsonResponse = await response.json()
      const movies = jsonResponse.results
      return movies
    }

      } catch(error){
        console.log(error);
      }
    }

    // Gets a list of movies and ultimately displays the info of a random movie from the list
const getMoviesWithActor = async (person) => {
  const selectedGenre = getSelectedGenre()
  const castChoice = getCastChoice(person)
  const discoverMovieEndpoint = '/discover/movie'
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&with_cast=${castChoice}`
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json()
      const movies = jsonResponse.results
      return movies
    }
  } catch (error) {
    console.log(error)
  }
}



// Populates the genre dropdown menu with the list of genres
const getMovieInfo = async (movie) => {
  const movieId = movie.id
  const movieInfoEndpoint = `/movie/${movieId}`
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${movieInfoEndpoint}${requestParams}`

  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      return jsonResponse;
      return movieInfo
      }

    }catch(error){
      console.log(error);
    };

};

const getCast = async (movie) => {
  const movieId = movie.id
  const castEndpoint = `/movie/${movieId}/credits`
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${castEndpoint}${requestParams}`

  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      const cast = jsonResponse.cast
      return cast
    }
  }catch(error){
    console.log(error)
  }
}

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  
  displayMovie(info);

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;