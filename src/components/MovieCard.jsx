import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useMoviestore } from "../store/MovieStore";

const MovieCard = ({ movie }) => {
	const favorites = useMoviestore((state) => state.favorites);
	const isFavorite = favorites.some((m) => m.id === movie.id);
	const toggleFav = useMoviestore((state) => state.toggleFav);
	const navigate = useNavigate();

	const imageUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
	return (
		<div
			className="relative h-full w-full  overflow-hidden rounded-xl border border-white/5  cursor-pointer shrink-0 "
			onClick={() => navigate(`/movies/${movie.id}`)}>
			<img
				src={imageUrl}
				alt={movie.title}
				className="h-full w-full object-cover"
			/>

			<div className="absolute inset-0 bg-linear-to-t from-[#07111f] via-[#07111f40] to-transparent" />
			<div className="absolute inset-0 bg-linear-to-b from-[#07111f66] via-[#07111f40] to-transparent" />

			<div className="absolute top-2 left-2 flex items-center gap-1 bg-violet-900/15 backdrop-blur-md border border-violet-400/50 rounded-md px-1   py-0.5 md:py-2">
				<span className="text-violet-700">★</span>
				<span className="text-white text-sm font-medium">
					{movie.vote_average.toFixed(1)}
				</span>
			</div>

			<div className="absolute top-2 right-2 flex items-center gap-1 bg-violet-900/15 backdrop-blur-md border border-violet-400/50 rounded-md px-1 md:px-2 py-0.5 md:py-1">
				<button
					onClick={(e) => {
						e.stopPropagation();
						toggleFav(movie);
					}}
					className="z-10 cursor-pointer">
					{isFavorite ? (
						<FaHeart className=" w-4 h-4 md:w-6 md:h-6 text-purple-600 outline-0" />
					) : (
						<FaRegHeart className="w-4 h-4 md:w-6 md:h-6 text-white hover:text-violet-700/50" />
					)}
				</button>
			</div>

			{/* Text */}
			<div className="absolute bottom-3 left-3 right-3">
				<h3>{movie.title}</h3>
				<p>{movie.release_date.slice(0, 4)}</p>
			</div>
		</div>
	);
};

export default MovieCard;
