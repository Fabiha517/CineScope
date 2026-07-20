import { useSearchParams } from "react-router-dom";
import { searchMovies } from "./CineScope/src/services/tmdb";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NotFound from "./CineScope/src/pages/NotFound";

const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("query");
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	let pageArr;
	if (page <= 3) {
		pageArr = [1, 2, 3, 4, 5];
	} else if (page >= totalPages - 2) {
		pageArr = [
			totalPages - 4,
			totalPages - 3,
			totalPages - 2,
			totalPages - 1,
			totalPages,
		];
	} else {
		pageArr = [page - 2, page - 1, page, page + 1, page + 2];
	}
	useEffect(() => {
		async function fetchSearchMovies() {
			setLoading(true);

			const data = await searchMovies(query, page);
			setMovies(data.results);
			setLoading(false);
			setTotalPages(data.total_pages);
		}
		if (query) {
			fetchSearchMovies();
		}
	}, [query, page]);
	useEffect(() => {
		setPage(1);
	}, [query]);
	return (
		<div className=" px-4 py-6 sm:px-8 lg:px-10 pl-0">
			{loading ? (
				<div className="flex justify-center items-center py-20">
					<p className="text-gray-400">Searching...</p>
				</div>
			) : movies.length === 0 ? (
				<NotFound />
			) : (
				<>
					<h2 className="text-sm sm:text-base text-gray-400 pb-6">
						Found {movies.length} results for "{query}"
					</h2>
					<div className="flex flex-col gap-4 ">
						{movies.map((movie) => (
							<Link
								key={movie.id}
								to={`/movies/${movie.id}`}
								className="flex items-center gap-4 rounded-xl bg-[#151b26] hover:bg-[#1b2332] transition p-3">
								<img
									src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
									alt={movie.title}
									className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-lg flex-shrink-0"
								/>

								<div className="flex-1 min-w-0">
									<h3 className="font-semibold text-sm sm:text-base line-clamp-2">
										{movie.title}
									</h3>

									<p className="text-sm text-gray-400 mt-1">
										{movie.release_date?.slice(0, 4) || "—"}
									</p>
								</div>

								<div className="flex items-center gap-1 text-sm sm:text-base flex-shrink-0">
									<span className="text-violet-500">★</span>
									<span>{movie.vote_average.toFixed(1)}</span>
								</div>
							</Link>
						))}
					</div>

					<div className="flex flex-wrap justify-center items-center gap-2 pt-8">
						<button
							onClick={() => setPage((p) => p - 1)}
							disabled={page === 1}
							className="cursor-pointer hover:text-violet-600 bg-[#1d253b] p-2 sm:p-3 rounded-sm ">
							<FiChevronLeft />
						</button>

						{pageArr
							.filter((num) => num >= 1 && num <= totalPages)
							.map((num) => (
								<button
									key={num}
									onClick={() => setPage(num)}
									className={`px-3 py-1 md:px-4 md:py-2 rounded cursor-pointer ${
										page === num
											? "bg-violet-600"
											: "bg-[#151b26] hover:bg-[#1b2332]"
									}`}>
									{num}
								</button>
							))}

						<button
							onClick={() => setPage((p) => p + 1)}
							disabled={page === totalPages}
							className="cursor-pointer hover:text-violet-600 bg-[#1d253b] p-2 sm:p-3 rounded-sm mr-4">
							<FiChevronRight />
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default SearchResults;
