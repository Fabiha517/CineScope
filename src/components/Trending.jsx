import MovieCard from "./MovieCard";
const Trending = ({ movies }) => {
	return (
		<section className="flex flex-col gap-3">
			<h1 className="text-2xl font-bold ">🔥Trending Today</h1>
			<div className="h-[1/3vh] flex gap-4 overflow-x-auto w-full  ">
    
				{movies.map((movie) => (
					  <div
      key={movie.id}
      className="w-[48%] sm:w-[220px] lg:w-[240px] shrink-0"
    >
					<MovieCard  movie={movie} />
					</div>
				))}
			</div>
		</section>
	);
};

export default Trending;
