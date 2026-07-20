import { useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb";
import { useEffect, useState } from "react";
import { getMovieTrailer } from "../services/tmdb";

const HeroSection = ({ movie }) => {
	const navigate = useNavigate();
	const [movieDetails, setMovieDetails] = useState(null);
	const [trailerKey, setTrailerKey] = useState("");
	const [showTrailer, setShowTrailer] = useState(false);
	
	useEffect(() => {
		async function fetchDetails() {
			const data = await getMovieDetails(movie.id);
			setMovieDetails(data);

			const trailerData = await getMovieTrailer(movie.id);

		const trailer =
			trailerData.results.find(
				(v) => v.site === "YouTube" && v.type === "Trailer"
			) ||
			trailerData.results.find(
				(v) => v.site === "YouTube" && v.type === "Teaser"
			) ||
			trailerData.results.find(
				(v) => v.site === "YouTube"
			);
			setTrailerKey(trailer ? trailer.key : "");
		}

		if (movie) {
			fetchDetails();
		}
	}, [movie]);
	if (!movie) {
		return null;
	}

	const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
	return (
		<section className="max-w-screen overflow-hidden">
			
			<div className="mx-auto  h-[85vh] sm:h-[75vh] lg:h-[70vh] w-screen ">
				<div
					className="relative h-full "
					style={{
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "50% 25%",
						backgroundRepeat: "no-repeat",
					}}>
					<div className="absolute inset-0 bg-linear-to-t from-[#0a0f1d] via-[#0a0f1d80] to-transparent"></div>
					<div className="absolute inset-0 bg-linear-to-r from-[#0a0f1d] via-[#0a0f1d40] to-transparent" />
					<div className="absolute bg-black/10"></div>

					<div className="absolute  inset-0 z-20   px-5 sm:px-8 lg:px-20 	">
						<div
							className="max-w-xl
		lg:max-w-2xl
		h-full
		flex
		flex-col
		justify-end
		lg:justify-center
		pb-12
		lg:pb-0">
							<h1
								className="text-3xl
sm:text-5xl
lg:text-6xl font-extrabold leading-tight tracking-tight">
								{movie.title}
							</h1>

							<div
								className="mt-5
		flex
		flex-wrap
		items-center
		gap-3
		sm:gap-5
		text-gray-300
		text-sm
		sm:text-base">
								<span>
									<span className="text-purple-500">★</span>
									{movie.vote_average.toFixed(1)}{" "}
								</span>
								<span>|</span>
								<span>{movie.release_date.slice(0, 4)} </span>
								<span>|</span>
								<span className="flex flex-wrap gap-2">
									{movieDetails?.genres.map((genre) => (
										<span
											key={genre.id}
											className="bg-violet-500/35 rounded-md px-2 py-1 text-xs
	sm:text-sm">
											{genre.name}
										</span>
									))}
								</span>
							</div>
							<p
								className="mt-5
	text-sm
	sm:text-base
	lg:text-lg
	text-gray-300
	leading-7
	sm:leading-8
	max-w-2xl">
								{movie.overview}
							</p>

							<div
								class="flex
		flex-col
		sm:flex-row
		gap-4
		pt-8">
								<button
									className=" bg-violet-600 hover:bg-violet-500 w-full
sm:w-auto
px-6
py-3 rounded-full font-semibold transition   cursor-pointer"
									onClick={() => navigate(`/movies/${movie.id}`)}>
									View Details
								</button>

							<button
	disabled={!trailerKey}
	onClick={() => setShowTrailer(true)}
	className={`w-full sm:w-auto px-6 py-3 rounded-full transition font-semibold
	${
		trailerKey
			? "border border-violet-400 text-violet-300 hover:bg-violet-500/20 cursor-pointer"
			: "border border-gray-600 text-gray-500 cursor-not-allowed opacity-60"
	}`}
>
	{trailerKey ? "Watch Trailer" : "Trailer Unavailable"}
</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{showTrailer && (
	<div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

		<button
			onClick={() => setShowTrailer(false)}
			className="absolute top-6 right-6 text-4xl text-white hover:text-violet-400 cursor-pointer"
		>
			✕
		</button>

		<iframe
			className="w-[92%] md:w-[80%] lg:w-[70%] aspect-video rounded-xl"
			src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
			title="Trailer"
			allow="autoplay; encrypted-media"
			allowFullScreen
		/>

	</div>
)}
		</section>
	);
};

export default HeroSection;
