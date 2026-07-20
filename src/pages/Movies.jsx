import { useState, useEffect } from "react";
import { getMovies } from "../services/tmdb";
import { getGenre } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { useMoviestore } from "../store/MovieStore";

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const currentPage = useMoviestore((state) => state.currentPage);
	const setCurrentPage = useMoviestore((state) => state.setCurrentPage);
	const totalPages = useMoviestore((state) => state.totalPages);
	const setTotalPages = useMoviestore((state) => state.setTotalPages);
	const selectedCategory = useMoviestore((state) => state.selectedCategory);
	const setSelectedCategory = useMoviestore(
		(state) => state.setSelectedCategory,
	);

	const sortBy = useMoviestore((state) => state.sortBy);
	const setSortBy = useMoviestore((state) => state.setSortBy);

	const selectedYear = useMoviestore((state) => state.selectedYear);
	const setselectedYear = useMoviestore((state) => state.setSelectedYear);
	const [categories, setCategory] = useState([]);

	const [genreOpen, setgenreOpen] = useState(false);
	const [sortByOpen, setSortByOpen] = useState(false);
	const [yearOpen, setYearOpen] = useState(false);

	const normalClass =
		"px-4 py-2 rounded-lg bg-[#1B2438] border border-[#2D3A56] text-gray-300 hover:border-violet-400 hover:text-violet-300 hover:bg-violet-500/10 transition";

	const activeClass =
		"px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-400 text-violet-300 shadow-[0_0_12px_rgba(168,85,247,0.25)]";
	let pageArr;
	if (currentPage <= 3) {
		pageArr = [1, 2, 3, 4, 5];
	} else if (currentPage >= totalPages - 2) {
		pageArr = [
			totalPages - 4,
			totalPages - 3,
			totalPages - 2,
			totalPages - 1,
			totalPages,
		];
	} else {
		pageArr = [
			currentPage - 2,
			currentPage - 1,
			currentPage,
			currentPage + 1,
			currentPage + 2,
		];
	}
	const START_YEAR = 1995;
	const currentYear = new Date().getFullYear();

	const years = Array.from(
		{ length: currentYear - START_YEAR + 1 },
		(_, i) => currentYear - i,
	);
	const sortOptions = [
		{ label: "No Sorting", value: "" },
		{ label: "Popular", value: "popularity.desc" },
		{ label: "Top Rated", value: "vote_average.desc" },
		{ label: "Most Voted", value: "vote_count.desc" },
		{ label: "Newest", value: "primary_release_date.desc" },
		{ label: "Oldest", value: "primary_release_date.asc" },
	];

	useEffect(() => {
		async function fetchGetMovies() {
			try {
				const data = await getMovies(
					currentPage,
					selectedCategory,
					sortBy,
					selectedYear,
				);
				setMovies(data.results);
				setTotalPages(data.total_pages);
			} catch (error) {
				console.error("Failed to get Movies", error);
			}
		}
		async function fetchGetGenre() {
			try {
				const data = await getGenre();
				setCategory(data);
			} catch (error) {
				console.error("Failed to get genre", error);
			}
		}
		fetchGetMovies();
		fetchGetGenre();
	}, [currentPage, selectedCategory, sortBy, selectedYear, setTotalPages]);

	const resetFilters = () => {
		setSelectedCategory("");
		setSortBy("");
		setselectedYear("");
		setCurrentPage(1);

		setgenreOpen(false);
		setSortByOpen(false);
		setYearOpen(false);
	};
	return (
		<div className="p-4">
			<div className="relative z-100 flex flex-col gap-6">
				<h1 className="text-2xl md:text-4xl font-bold">All Movies</h1>

				{/* Filters */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{/* ================= Genre ================= */}

					<div className="relative">
						<div
							onClick={() => {
								setgenreOpen(!genreOpen);
								setSortByOpen(false);
								setYearOpen(false);
							}}
							className="w-full h-11 bg-[#111827] border border-[#2D3A56]
						rounded-xl px-4 flex items-center justify-between cursor-pointer">
							<span className="truncate">
								{selectedCategory
									? categories.find((c) => c.id === selectedCategory)?.name
									: "Genres"}
							</span>

							<FiChevronDown
								className={`transition ${genreOpen ? "rotate-180" : ""}`}
							/>
						</div>

						{genreOpen && (
							<div
								className="absolute left-0 top-full mt-2
							w-80 max-w-[90vw]
							bg-[#111827]
							border border-[#2D3A56]
							rounded-xl
							p-4
							flex flex-wrap gap-3
							z-50
							">
								<button
									onClick={() => {
										setSelectedCategory("");
										setgenreOpen(false);
										setCurrentPage(1);
									}}
									className={
										selectedCategory === "" ? activeClass : normalClass
									}>
									All
								</button>

								{categories
									.filter((category) => category.id !== 10749)
									.map((category) => (
										<button
											key={category.id}
											onClick={() => {
												setSelectedCategory(category.id);
												setgenreOpen(false);
												setCurrentPage(1);
											}}
											className={
												selectedCategory === category.id
													? activeClass
													: normalClass
											}>
											{category.name}
										</button>
									))}
							</div>
						)}
					</div>

					{/* ================= Sort ================= */}

					<div className="relative">
						<div
							onClick={() => {
								setSortByOpen(!sortByOpen);
								setgenreOpen(false);
								setYearOpen(false);
							}}
							className="w-full h-11 bg-[#111827] border border-[#2D3A56]
						rounded-xl px-4 flex items-center justify-between cursor-pointer">
							<span className="truncate">
								{sortBy
									? sortOptions.find((s) => s.value === sortBy)?.label
									: "Sort By"}
							</span>

							<FiChevronDown
								className={`transition ${sortByOpen ? "rotate-180" : ""}`}
							/>
						</div>

						{sortByOpen && (
							<div
								className="absolute right-0 md:left-0 top-full mt-2
							w-72
							bg-[#111827]
							border border-[#2D3A56]
							rounded-xl
							p-4
							flex flex-wrap gap-3
							z-10000	">
								{sortOptions.map((sort) => (
									<button
										key={sort.value}
										onClick={() => {
											setSortBy(sort.value);
											setSortByOpen(false);
											setCurrentPage(1);
										}}
										className={
											sortBy === sort.value ? activeClass : normalClass
										}>
										{sort.label}
									</button>
								))}
							</div>
						)}
					</div>

					{/* ================= Year ================= */}

					<div className="relative">
						<div
							onClick={() => {
								setYearOpen(!yearOpen);
								setgenreOpen(false);
								setSortByOpen(false);
							}}
							className="w-full h-11 bg-[#111827] border border-[#2D3A56]
						rounded-xl px-4 flex items-center justify-between cursor-pointer">
							<span>{selectedYear || "Year"}</span>

							<FiChevronDown
								className={`transition ${yearOpen ? "rotate-180" : ""}`}
							/>
						</div>

						{yearOpen && (
							<div
								className="absolute left-0 top-full mt-2
							w-80 max-w-[90vw]
							bg-[#111827]
							border border-[#2D3A56]
							rounded-xl
							p-4
							flex flex-wrap gap-3
							z-50">
								{years.map((year) => (
									<button
										key={year}
										onClick={() => {
											setselectedYear(year);
											setYearOpen(false);
											setCurrentPage(1);
										}}
										className={
											selectedYear === year ? activeClass : normalClass
										}>
										{year}
									</button>
								))}
							</div>
						)}
					</div>

					{/* ================= Reset ================= */}

					<button
						onClick={resetFilters}
						className="w-full h-11
					bg-[#111827]
					border border-[#2D3A56]
					rounded-xl
					cursor-pointer
					hover:border-violet-400
					transition">
						Reset
					</button>
				</div>
			</div>

			{/* Movies Grid */}
			<div class="relative z-50">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			</div>

			{/* Pagination */}
			<div className="flex justify-center items-center flex-wrap gap-2 mt-10 mb-6">
				<button
					onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
					className="cursor-pointer bg-[#1d253b] hover:bg-violet-600
				p-2 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed">
					<FiChevronLeft size={20} />
				</button>

				{pageArr
					.filter((page) => page >= 1 && page <= totalPages)
					.map((page) => (
						<button
							key={page}
							onClick={() => setCurrentPage(page)}
							className={`w-10 h-10 rounded-lg transition cursor-pointer
						${
							currentPage === page
								? "bg-violet-600 text-white"
								: "bg-[#1d253b] text-gray-300 hover:bg-[#2d3650]"
						}`}>
							{page}
						</button>
					))}

				<button
					onClick={() =>
						currentPage < totalPages && setCurrentPage(currentPage + 1)
					}
					disabled={currentPage === totalPages}
					className="cursor-pointer bg-[#1d253b] hover:bg-violet-600
				p-2 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed">
					<FiChevronRight size={20} />
				</button>
			</div>
		</div>
	);
};
export default Movies;
