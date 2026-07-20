import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/tmdb";
import { getTopRatedMovies } from "../services/tmdb";
import { getUpcomingMovies } from "../services/tmdb";
import HeroSection from "../components/HeroSection";
import Trending from "../components/Trending";
import TopRated from "../components/TopRated";
import Upcoming from "../components/Upcoming";
const Home = () => {
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [topRated, setTopRated] = useState([]);
	const [upcoming, setUpcoming] = useState([])
	useEffect(() => {
		async function fetchTrendingMovies() {
			try {
				const movies = await getTrendingMovies();
				setTrendingMovies(movies);
			} catch (error) {
				console.error("Failed to get the trending movies", error);
			}
		}

		async function fetchTopRatedMovies() {
			try {
				const topRatedmovies = await getTopRatedMovies();
				setTopRated(topRatedmovies);
			} catch (error) {
				console.error("Failed to get the top rated movies", error);
			}
		}
		async function fetchUpcomingMovies() {
			try {
				const upcomingmovies = await getUpcomingMovies();
				setUpcoming(upcomingmovies);
			} catch (error) {
				console.error("Failed to get the top rated movies", error);
			}
		}
		fetchUpcomingMovies()
		fetchTrendingMovies();
		fetchTopRatedMovies();
	}, []);

	return (
		<div >
			<HeroSection movie={trendingMovies[0]}  />

			<div className=" p-6 pt-3 flex flex-col gap-3">

				<Trending movies={trendingMovies} />
				<TopRated movies={topRated} />
				<Upcoming movies={upcoming}/>
			</div>
		</div>
	);
};

export default Home;
