import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
	getMovieDetails,
	getMovieCredits,
	getSimilarMovies,
	getMovieTrailer,
} from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useMoviestore } from "../store/MovieStore";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";

const MovieDetails = () => {
	const { id } = useParams();

	const [movie, setMovie] = useState(null);
	const [cast, setCast] = useState([]);
	const [similarMovies, setSimilarMovies] = useState([]);
	const [trailerKey, setTrailerKey] = useState("");
	const [showTrailer, setShowTrailer] = useState(false);

	const castRef = useRef(null);
	const movieRef = useRef(null);

	const favorites = useMoviestore((state) => state.favorites);
	const addToFav = useMoviestore((state) => state.addToFav);
	const removeFromFav = useMoviestore((state) => state.removeFromFav);
	const isFavorite = movie && favorites.some((fav) => fav.id === movie.id);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
	}, [id]);
	useEffect(() => {
		async function fetchMovie() {
			setMovie(null);
			setShowTrailer(false);
			const data = await getMovieDetails(id);
			const castData = await getMovieCredits(id);
			const similarData = await getSimilarMovies(id);
			const trailerData = await getMovieTrailer(id);

			setMovie(data);
			setCast(castData.cast.slice(0, 10));
			setSimilarMovies(
				similarData.filter((movie) => !movie.genre_ids.includes(10749)),
			);

			const trailer =
				trailerData.results.find(
					(v) => v.site === "YouTube" && v.type === "Trailer",
				) ||
				trailerData.results.find(
					(v) => v.site === "YouTube" && v.type === "Teaser",
				) ||
				trailerData.results.find((v) => v.site === "YouTube");

			setTrailerKey(trailer ? trailer.key : "");
		}

		fetchMovie();
	}, [id]);

	if (!movie) {
		return <MovieDetailsSkeleton />;
	}

	const scrollRight = () => {
		const firstCard = castRef.current.firstChild;

		castRef.current.scrollBy({
			left: firstCard.offsetWidth + 24,
			behavior: "smooth",
		});
	};

	const scrollLeft = () => {
		const firstCard = castRef.current.firstChild;

		castRef.current.scrollBy({
			left: -(firstCard.offsetWidth + 24),
			behavior: "smooth",
		});
	};

	const movieScrollRight = () => {
		const firstCard = movieRef.current.firstChild;

		movieRef.current.scrollBy({
			left: firstCard.offsetWidth + 24,
			behavior: "smooth",
		});
	};

	const movieScrollLeft = () => {
		const firstCard = movieRef.current.firstChild;

		movieRef.current.scrollBy({
			left: -(firstCard.offsetWidth + 24),
			behavior: "smooth",
		});
	};

	const backdropImageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
	const posterImageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;

	const hours = Math.floor(movie.runtime / 60);
	const minutes = movie.runtime % 60;

	return (
		<div className="flex flex-col">
			{/* HERO */}

			{/* HERO */}

			<div className="relative min-h-[85vh] md:h-[75vh] lg:h-[85vh]">
				<div
					className="relative h-full"
					style={{
						backgroundImage: `url(${backdropImageUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}>
					{/* overlays */}
					<div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1dbb] to-black/20" />
					<div className="absolute inset-0 bg-black/20" />

					<div className="relative z-20 h-full flex items-end">
						<div className="w-full px-5 md:px-8 lg:px-16 pb-8">
							<div className="flex flex-col md:flex-row md:items-end gap-8">
								{/* Poster */}
								<div className="flex justify-center mt-5 md:block shrink-0">
									<img
										src={posterImageUrl}
										alt={movie.title}
										className="
                w-44
                sm:w-52
                md:w-56
                lg:w-72
                rounded-xl
                shadow-2xl
              "
									/>
								</div>

								{/* Details */}

								<div className="flex-1">
									<div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
										<div>
											<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
												{movie.title}
											</h1>

											{movie.tagline && (
												<p className="mt-2 text-gray-300 italic text-lg">
													{movie.tagline}
												</p>
											)}

											<div className="flex flex-wrap items-center gap-3 mt-5 text-gray-300">
												<span>{movie.release_date.slice(0, 4)}</span>

												<span>•</span>

												<span>
													{hours}h {minutes}m
												</span>
											</div>

											<div className="flex flex-wrap gap-2 mt-5">
												{movie.genres.map((genre) => (
													<span
														key={genre.id}
														className="bg-violet-500/30 px-3 py-1 rounded-md text-sm">
														{genre.name}
													</span>
												))}
											</div>

											{/* Mobile rating */}

											<div className="flex md:hidden items-center gap-2 mt-5">
												<span className="text-violet-500 text-xl">★</span>

												<span className="text-xl font-semibold">
													{movie.vote_average.toFixed(1)}
												</span>
											</div>

											{/* Buttons */}

											<div className="flex flex-col sm:flex-row gap-4 mt-8">
												<button
													disabled={!trailerKey}
													onClick={() => setShowTrailer(true)}
													className={`px-6 py-3 rounded-full font-semibold transition
                    ${
											trailerKey
												? "bg-violet-600 hover:bg-violet-500 cursor-pointer"
												: "bg-gray-600 opacity-60 cursor-not-allowed"
										}`}>
													{trailerKey ? "Watch Trailer" : "Trailer Unavailable"}
												</button>

												<button
													onClick={() => {
														if (isFavorite) {
															removeFromFav(movie.id);
														} else {
															addToFav(movie);
														}
													}}
													className="border border-violet-400 text-violet-300 hover:bg-violet-500/20 px-6 py-3 rounded-full transition cursor-pointer">
													{isFavorite
														? "Remove from Favorites"
														: "Add to Favorites"}
												</button>
											</div>
										</div>

										{/* Desktop rating */}

										<div className="hidden md:flex items-center gap-2 text-5xl font-bold">
											<span className="text-violet-600">★</span>

											<span>{movie.vote_average.toFixed(1)}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{showTrailer && (
				<div className="absolute inset-0 z-700 bg-black/90 flex items-center justify-center">
					<button
						onClick={() => setShowTrailer(false)}
						className="absolute top-5 right-5 text-white text-3xl cursor-pointer hover:text-violet-400">
						✕
					</button>

					<iframe
						className="w-[90%] h-[80%] rounded-xl"
						src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
						title="Trailer"
						allow="autoplay; encrypted-media"
						allowFullScreen
					/>
				</div>
			)}
			{/* CONTENT */}

			<div className="max-w-7xl mx-auto w-full flex flex-col gap-16 px-5 sm:px-8 lg:px-10 py-10 lg:py-16">
				{/* OVERVIEW */}

				<section className="space-y-6">
					<h2 className="text-3xl font-bold">Overview</h2>

					<p className=" max-w-4xl text-gray-400 leading-8 text-[16px] sm:text:base">
						{movie.overview}
					</p>
				</section>

				{/* CAST */}

				<section className="relative space-y-6">
					<h2 className="text-2xl font-bold">Cast</h2>

					<button
						onClick={scrollLeft}
						className=" absolute left-0 top-1/2  -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 cursor-pointer z-10 ">
						<FiChevronLeft />
					</button>

					<div
						ref={castRef}
						className="flex gap-6 overflow-x-auto pb-4 scroll-smooth md:overflow-hidden">
						{cast.map((actor) => (
							<div
								key={actor.id}
								className=" min-w-22.5 sm:min-w-30	 flex flex-col items-center text-center">
								<img
									src={
										actor.profile_path
											? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
											: "/default-avatar.png"
									}
									alt={actor.name}
									className=" w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border 	border-white/10 shadow-lg"
								/>

								<h3 className="mt-3 font-medium text-sm">{actor.name}</h3>

								<p className="text-xs text-gray-400">{actor.character}</p>
							</div>
						))}
					</div>

					<button
						onClick={scrollRight}
						className=" absolute right-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50
						hover:bg-black/70 cursor-pointer z-10 ">
						<FiChevronRight />
					</button>
				</section>

				{/* SIMILAR MOVIES */}

				<section className="relative space-y-6">
					<h2 className="text-3xl font-semibold pb-5">Similar Movies</h2>

					<button
						onClick={movieScrollLeft}
						className=" absolute left-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 cursor-pointer z-10 ">
						<FiChevronLeft />
					</button>

					<div
						ref={movieRef}
						className="flex gap-5 overflow-x-auto pb-3 scroll-smooth md:overflow-hidden">
						{similarMovies.map((movie) => (
							<div
								key={movie.id}
								className=" min-w-45  sm:min-w-55 lg:min-w-60 ">
								<MovieCard movie={movie} />
							</div>
						))}
					</div>

					<button
						onClick={movieScrollRight}
						className=" absolute right-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 cursor-pointer z-10 ">
						<FiChevronRight />
					</button>
				</section>
			</div>
		</div>
	);
};

export default MovieDetails;
