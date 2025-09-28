// Just keep the API key value
const API_KEY = "4644973a"; // Only the key, nothing else
const BASE_URL = "https://www.omdbapi.com/";
async function searchMovie() {
  const query = document.getElementById("searchInput").value;
  if (!query) return alert("Enter a movie name!");

  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${query}`);
  const data = await res.json();

  if (data.Response === "False") {
    document.getElementById("movie-container").innerHTML = "<p>No movie found!</p>";
    return;
  }

  displayMovie(data);
}

function displayMovie(movie) {
  const container = document.getElementById("movie-container");
  container.innerHTML = `
    <div class="movie-card">
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <p>⭐ ${movie.imdbRating} | 📅 ${movie.Year}</p>
      <p>${movie.Plot}</p>

      <div class="review-section">
        <textarea id="reviewText" placeholder="Write your review..."></textarea>
        <button class="submit-review" onclick="saveReview('${movie.Title}')">Submit Review</button>
        <div id="reviews-${movie.Title}" class="reviews"></div>
      </div>
    </div>
  `;

  loadReviews(movie.Title);
}

function saveReview(title) {
  const reviewText = document.getElementById("reviewText").value;
  if (!reviewText) return;

  let reviews = JSON.parse(localStorage.getItem(title)) || [];
  reviews.push(reviewText);
  localStorage.setItem(title, JSON.stringify(reviews));

  loadReviews(title);
  document.getElementById("reviewText").value = "";
}

function loadReviews(title) {
  let reviews = JSON.parse(localStorage.getItem(title)) || [];
  const reviewsDiv = document.getElementById(`reviews-${title}`);
  reviewsDiv.innerHTML = "<h3>Reviews:</h3>" + reviews.map(r => `<p>📝 ${r}</p>`).join("");
}
