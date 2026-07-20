const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";
const fetchOptions = {
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${TOKEN}`,
	},
};
export async function getTrendingMovies() {
	const response = await fetch(
		`${BASE_URL}/trending/movie/day?language=en-US`,
		fetchOptions,
	);
	const data = await response.json();
	return data.results;
}

export async function getTopRatedMovies() {
	const response = await fetch(
		`${BASE_URL}/movie/top_rated?language=en-US&page=1`,
		fetchOptions,
	);
	const data = await response.json();
	return data.results;
}

export async function getUpcomingMovies() {
	const response = await fetch(
		`${BASE_URL}/movie/upcoming?language=en-US&page=1`,
		fetchOptions,
	);
	const data = await response.json();
	return data.results;
}
export async function getMovies(page = 1, genre = "", sortBy = "", year = "") {
	const today = new Date().toISOString().split("T")[0];
	let url = `${BASE_URL}/discover/movie?language=en-US&include_adult=false&without_genres=10749&page=${page}`;

	if (genre) {
		url += `&with_genres=${genre}`;
	}
	if (sortBy) {
		url += `&sort_by=${sortBy}`;
	}
	if (year) {
		url += `&primary_release_date.gte=${year}-01-01`;
		url += `&primary_release_date.lte=${year}-12-31`;
	} else {
		url += `&primary_release_date.lte=${today}`;
	}
	const response = await fetch(url, fetchOptions);

	const data = await response.json();
	return data;
}

export async function getGenre() {
	const response = await fetch(
		`${BASE_URL}/genre/movie/list?language=en`,
		fetchOptions,
	);
	const data = await response.json();
	return data.genres;
}
export async function getMovieDetails(id) {
	const response = await fetch(
		`${BASE_URL}/movie/${id}?language=en-US`,
		fetchOptions,
	);

	const data = await response.json();
	return data;
}

export async function getMovieCredits(id) {
	const response = await fetch(`${BASE_URL}/movie/${id}/credits`, fetchOptions);

	return await response.json();
}
export async function getSimilarMovies(id) {
	const response = await fetch(`${BASE_URL}/movie/${id}/similar`, fetchOptions);

	const data = await response.json();
	return data.results;
}
export async function getMovieTrailer(id) {
	const response = await fetch(
		`${BASE_URL}/movie/${id}/videos?language=en-US`,
		fetchOptions,
	);
	return await response.json();
}
export async function searchMovies(query, page = 1) {
	const response = await fetch(
		`${BASE_URL}//search/movie?query=${encodeURIComponent(
			query,
		)}&include_adult=false&language=en-US&page=${page}`,
		fetchOptions,
	);
	const data = await response.json();
	return data;
}
