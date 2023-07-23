const apiKey = '1912ea10';
const movieListContainer = document.getElementById('movieList');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const pageNumbersContainer = document.getElementById('pageNumbers');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesPerPage = 10;
let currentPage = 1;

// Fetch movies from OMDB API
async function fetchMovies(searchQuery, page) {
    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Search || [];
  }
  

  async function fetchMovieDetails(imdbID) {
    const apiKey = '1912ea10'; // Replace with your actual OMDB API key
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  



  let movies = [];




// Add an event listener for clicks on each movie item
function addMovieItemClickEventListeners() {
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach((movieItem, index) => {
      movieItem.addEventListener('click', () => onMovieItemClick(index));
    });
  }
  
  // Event handler when a movie item is clicked
 
  // Function to hide the movie details section
  // Add the movie details section display logic in onMovieItemClick function
function onMovieItemClick(movieIndex) {
    const selectedMovie = movieData[movieIndex];
  
    // Check if the selectedMovie exists and has the "imdbID" property
    if (selectedMovie && selectedMovie.imdbID) {
      const imdbID = selectedMovie.imdbID;
  
      // Fetch additional movie details using the IMDb ID
      fetchMovieDetails(imdbID)
        .then((movieDetails) => {
          // Update the movie details section with the selected movie's details
          const movieTitleElement = document.getElementById('movieTitle');
          const movieYearElement = document.getElementById('movieYear');
          const movieGenreElement = document.getElementById('movieGenre');
          const moviePlotElement = document.getElementById('moviePlot');
  
          movieTitleElement.textContent = `Title: ${selectedMovie.Title}`;
          movieYearElement.textContent = `Year: ${selectedMovie.Year}`;
          movieGenreElement.textContent = `Genre: ${selectedMovie.Genre}`;
          moviePlotElement.textContent = `Plot: ${selectedMovie.Plot}`;
  
          // Display the movie details section
          const movieDetailsSection = document.getElementById('movieDetails');
          movieDetailsSection.style.display = 'block';
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
        });
    }
  }
  const movieDetailsSection = document.getElementById('movieDetails');
movieDetailsSection.style.display = 'none';
// Event handler when a movie item is clicked
function displayMovieDetails(selectedMovie) {
    // Check if the movie details section exists
    const movieDetailsSection = document.getElementById('movieDetails');
    if (!movieDetailsSection) {
      console.error('Movie details section not found.');
      return;
    }
  
    // Create the movie details content
    const movieDetailsContent = `
      <h2>${selectedMovie.Title}</h2>
      <p>Year: ${selectedMovie.Year}</p>
      <p>Genre: ${selectedMovie.Genre}</p>
      <p>Plot: ${selectedMovie.Plot}</p>
      <!-- Add more elements to display other movie details as needed -->
    `;
  
    // Update the movie details section with the selected movie's details
    movieDetailsSection.innerHTML = movieDetailsContent;
  
    // Display the movie details section
    movieDetailsSection.style.display = 'block';
  }
  
  function onClearSearchButtonClick() {
    searchInput.value = '';
    currentPage = 1;
    fetchAndDisplayMovies('har');
  }
  

  const clearSearchButton = document.getElementById('clearSearchButton');
  clearSearchButton.addEventListener('click', onClearSearchButtonClick);



// Create a single movie item
function createMovieItem(movie) {
  const movieItem = document.createElement('div');
  movieItem.classList.add('movie-item');

  const posterImg = document.createElement('img');
  posterImg.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'; // Replace 'placeholder.jpg' with a default image path
  posterImg.alt = movie.Title;

  const titleElement = document.createElement('h2');
  titleElement.textContent = movie.Title;

  const yearElement = document.createElement('p');
  yearElement.textContent = `Year: ${movie.Year}`;

  movieItem.appendChild(posterImg);
  movieItem.appendChild(titleElement);
  movieItem.appendChild(yearElement);



  movieItem.addEventListener('click', async () => {
    // Fetch additional movie details using the IMDb ID
    const movieDetails = await fetchMovieDetails(movie.imdbID);

    // Display the movie details in the movie details section
    displayMovieDetails(movieDetails);
  });

  const ratingElement = document.createElement('div');
  ratingElement.classList.add('rating');

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.textContent = '★';
    star.dataset.value = i;
    ratingElement.appendChild(star);
  }


  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');
  commentElement.innerHTML = `
    <textarea placeholder="Leave a comment"></textarea>
    <button class="comment-btn">Submit</button>
  `;


  // Add event listeners to stars and comment button
  const stars = ratingElement.querySelectorAll('.star');
  stars.forEach((star) => star.addEventListener('click', () => onStarClick(star, movie.imdbID)));

  const commentButton = commentElement.querySelector('.comment-btn');
  commentButton.addEventListener('click', () => onCommentSubmit(commentElement, movie.imdbID));

  // Append rating and comment elements to the movie item
  movieItem.appendChild(ratingElement);
  movieItem.appendChild(commentElement);

  return movieItem;

}

function onStarClick(star, imdbID) {
    const rating = parseInt(star.dataset.value);
  
    // Mark the selected star and its previous siblings as active
    const stars = star.parentElement.querySelectorAll('.star');
    stars.forEach((s) => {
      const value = parseInt(s.dataset.value);
      s.classList.remove('active');
      if (value <= rating) {
        s.classList.add('active');
      }
    });
  
    // Store the user rating in local storage
    localStorage.setItem(imdbID + '_rating', rating);
  }
  
  function onCommentSubmit(commentElement, imdbID) {
    const commentTextarea = commentElement.querySelector('textarea');
    const comment = commentTextarea.value.trim();
  
    // Store the user comment in local storage
    localStorage.setItem(imdbID + '_comment', comment);
  }

// Add the movie details section display logic in onMovieItemClick function
function onMovieItemClick(movieIndex) {
    const selectedMovie = movieData[movieIndex];
  
    // Check if the selectedMovie exists and has the "imdbID" property
    if (selectedMovie && selectedMovie.imdbID) {
      const imdbID = selectedMovie.imdbID;
  
      // Fetch additional movie details using the IMDb ID
      fetchMovieDetails(imdbID)
        .then((movieDetails) => {
          // Update the movie details section with the selected movie's details
          const movieTitleElement = document.getElementById('movieTitle');
          const movieYearElement = document.getElementById('movieYear');
          const movieGenreElement = document.getElementById('movieGenre');
          const moviePlotElement = document.getElementById('moviePlot');
  
          movieTitleElement.textContent = `Title: ${selectedMovie.Title}`;
          movieYearElement.textContent = `Year: ${selectedMovie.Year}`;
          movieGenreElement.textContent = `Genre: ${selectedMovie.Genre}`;
          moviePlotElement.textContent = `Plot: ${selectedMovie.Plot}`;
  
          // Display the movie details section
          const movieDetailsSection = document.getElementById('movieDetails');
          movieDetailsSection.style.display = 'block';
        })
        .catch((error) => {
          console.error('Error fetching movie details:', error);
        });
    }
  }
  

  
  
// Modify the displayMoviesOnPage function to add a click event listener to each movie item
function displayMoviesOnPage(movies) {
    const movieListElement = document.getElementById('movie-list');
    movieListElement.innerHTML = '';
  
    movies.forEach((movie) => {
      // Check if the movie title is not "Undefined" and has a valid poster URL
      if (movie.Title !== 'Undefined' && movie.Poster !== 'N/A') {
        const movieItem = createMovieItem(movie);
  
        // Retrieve user rating and comment from local storage
        const rating = localStorage.getItem(movie.imdbID + '_rating');
        const comment = localStorage.getItem(movie.imdbID + '_comment');
        if (rating) {
          const stars = movieItem.querySelectorAll('.star');
          stars.forEach((star) => {
            const value = parseInt(star.dataset.value);
            if (value <= rating) {
              star.classList.add('active');
            } else {
              star.classList.remove('active');
            }
          });
        }
        if (comment) {
          const commentTextarea = movieItem.querySelector('textarea');
          commentTextarea.value = comment;
        }
  
        movieListElement.appendChild(movieItem);
      }
    });
  }
  
function addMovieItemClickEventListeners() {
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach((movieItem, index) => {
      movieItem.addEventListener('click', () => onMovieItemClick(index));
    });
  }
  
// Update pagination buttons and page numbers
function updatePagination(totalResults) {
  const totalPages = Math.ceil(totalResults / moviesPerPage);
  pageNumbersContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('span');
    pageNumber.textContent = i;
    pageNumber.classList.add('page-number');
    if (i === currentPage) {
      pageNumber.classList.add('active');
    }
    pageNumber.addEventListener('click', () => onPageNumberClick(i));
    pageNumbersContainer.appendChild(pageNumber);
  }

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Event handler for page number click
function onPageNumberClick(page) {
  currentPage = page;
  fetchAndDisplayMovies(searchInput.value.trim());
}

// Event handler for previous button click
function onPrevButtonClick() {
    if (currentPage > 1) {
      currentPage--; // Decrement the currentPage by 1 to move to the previous page
      const searchQuery = searchInput.value.trim();
      fetchAndDisplayMovies(searchQuery); // Call the function with the updated currentPage
    }
  }
  
  

// Event handler for next button click
function onNextButtonClick() {
    currentPage++; // Increment the currentPage by 1 to move to the next page
    const searchQuery = searchInput.value.trim();
    fetchAndDisplayMovies(searchQuery); // Call the function with the updated currentPage
  }
  
// Event handler for search input change
function onSearchInputChange() {
  const searchQuery = searchInput.value.trim();
  currentPage = 1; // Reset to the first page when performing a new search
  fetchAndDisplayMovies(searchQuery);
}

function onSearchButtonClick() {
  const searchQuery = searchInput.value.trim();
  currentPage = 1; // Reset to the first page when performing a new search
  fetchAndDisplayMovies(searchQuery);
}

let movieData = []; // Define a variable to store the fetched movies

// Fetch and display movies for the current page
async function fetchAndDisplayMovies(searchQuery) {
  try {
    const movies = await fetchMovies(searchQuery, currentPage);
    movieData = movies; // Store the fetched movies in the movieData variable
    console.log('API response:', movies);
    displayMoviesOnPage(movies);
    updatePagination(movies.totalResults);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}



// Initialize the movie list and pagination

async function init() {
    const loadingElement = document.getElementById('loading');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
  
    try {
      // Show loading state while fetching data
    
  
      // Fetch movies with the search query "har" on page load
      const movies = await fetchMovies('har', 1);
      console.log('API response:', movies);
  
      // Check if the fetched movies array is not empty
      if (movies.length > 0) {
        // Display movies and set up pagination
        displayMoviesOnPage(movies);
        updatePagination(movies.totalResults);
      } else {
        // If no movies are available, display a message
        loadingElement.textContent = 'No movies found.';
      }
  
      // Add event listeners
      prevButton.addEventListener('click', onPrevButtonClick);
      nextButton.addEventListener('click', onNextButtonClick);
      searchInput.addEventListener('change', onSearchInputChange);
      searchButton.addEventListener('click', onSearchButtonClick);
    } catch (error) {
      console.error('Error fetching movies:', error);
      loadingElement.textContent = 'Error fetching movies';
    }
  }
  
  async function onMovieItemClick(movie) {
    // Fetch additional movie details using the IMDb ID
    const movieDetails = await fetchMovieDetails(movie.imdbID);
  
    // Display the movie details in the movie details section
    displayMovieDetails(movieDetails);
  }


// Call the init function to start fetching and displaying movies
init();
