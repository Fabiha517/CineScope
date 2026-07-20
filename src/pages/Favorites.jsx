import { FaRegHeart } from "react-icons/fa";
import { useMoviestore } from "../store/MovieStore";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
	const favorites = useMoviestore((state) => state.favorites);

	return (
		<div className="px-4 py-6 sm:px-8 lg:px-10">
			<div className="flex items-center gap-3 pb-8">
				<FaRegHeart className="w-8 h-8 sm:w-10 sm:h-10 text-violet-900" />
				<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
					My Favorites
				</h1>
			</div>

			{favorites.length === 0 ? (
				<div className="min-h-[55vh] w-full rounded-xl bg-[#1d253b] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-6">
					<div className="w-24 h-24 sm:w-30 sm:h-30 rounded-full bg-[#262e45] flex items-center justify-center">
						<FaRegHeart className="w-16 h-16 sm:w-24 sm:h-24 p-3 text-violet-900/60" />
					</div>

					<div className="flex flex-col gap-2">
						<p className="text-2xl sm:text-3xl font-bold">No favorites yet</p>

						<p className="text-gray-400">
							Add the movies you love and they will appear here.
						</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
					{favorites.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			)}
		</div>
	);
};

export default Favorites;
