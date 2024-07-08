const tmdbKey = 'ecd094e3ef3b28faa2739217add8d5cd';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');




const form = document.getElementById('form')
const select = document.getElementById('genres')

// Load liked and disliked movies from local storage
const myLikedMovies = loadLikedMovies()
console.log(myLikedMovies)
const myDislikedMovies = loadDislikedMovies()

if (myLikedMovies) {
  myLikedMovies.forEach((movie) => createLikedMovie(movie))
}

if (myDislikedMovies) {
  myDislikedMovies.forEach((movie) => createDislikedMovie(movie))
}

// API calls
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list'
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json()
      const genres = jsonResponse.genres
      return genres
    }
  } catch (error) {
    console.log(error)
  }
}

const searchPerson = async () => {
  const searchPersonEndpoint = '/search/person'
  const castInput = getCastValue()
  const requestParams = `?api_key=${tmdbKey}&query=${castInput}`
  const urlToFetch = tmdbBaseUrl + searchPersonEndpoint + requestParams

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json()
      const person = jsonResponse.results
      return person
    }
  } catch (error) {
    console.log(error)
  }
}

const getMovies = async () => {
  const selectedGenre = getSelectedGenre()
  const randomPage = getRandomPage()
  const discoverMovieEndpoint = '/discover/movie'
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`
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

const getMovieInfo = async (movie) => {
  const movieId = movie.id
  const movieEndpoint = `/movie/${movieId}`
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const movieInfo = await response.json()
      return movieInfo
    }
  } catch (error) {
    console.log(error)
  }
}

const getCast = async (movie) => {
  const movieId = movie.id
  const movieEndpoint = `/movie/${movieId}/credits`
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams

  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const movieCast = await response.json()
      const actorsNames = movieCast.cast
        .map((actor) => actor.name.trim())
        .slice(0, 5)
        .join(', ')
      return actorsNames
    }
  } catch (error) {
    console.log(error)
  }
}

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async (person) => {
  const movieInfo = document.getElementById('movieInfo')
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie()
  }
  let movies
  if (person.length !== 0) {
    movies = await getMoviesWithActor(person)
  } else {
    movies = await getMovies()
  }
  let randomMovie = getRandomMovie(movies)
  const info = await getMovieInfo(randomMovie)
  const cast = await getCast(randomMovie)
  displayMovie(info, cast)
}

getGenres().then(populateGenreDropdown)

playBtn.addEventListener('click', () => searchPerson().then(showRandomMovie))

form.addEventListener('submit', (e) => {
  e.preventDefault()
  searchPerson().then(showRandomMovie)
})



const apiKey = 'da372d2500msh991e68d6a34e093p1121bfjsn146a93bfa564';
const movieTitle = 'movie'; // Example movie title

async function fetchStreamingServices(title) {
  const response = await fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${title}&country=us`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      'x-rapidapi-key': apiKey
    }
  });
  const data = await response.json();
  return data;
}

function displayStreamingServices(services) {
  const servicesContainer = document.getElementById('services-showall');
  servicesContainer.innerHTML = ''; // Clear previous results

  services.forEach(service => {
    const serviceElement = document.createElement('div');
    serviceElement.classList.add('service');
    serviceElement.innerHTML = `
      <img src="${service.icon}" alt="${service.display_name}">
      <p>${service.display_name}</p>
    `;
    servicesContainer.appendChild(serviceElement);
  });
}

fetchStreamingServices(movieTitle).then(data => {
  const services = data.results[0].locations;
  displayStreamingServices(services);
});