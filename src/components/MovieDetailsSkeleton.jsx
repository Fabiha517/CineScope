const MovieDetailsSkeleton = () => {
	return (
		<div className="animate-pulse">
			{/* HERO */}
			<div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-[#1b2332] overflow-hidden">
				{/* Poster */}
				<div className="hidden md:block absolute left-8 lg:left-15 bottom-0 h-[50%] lg:h-[65%] w-52 lg:w-64 rounded-xl bg-[#2a344d]" />

				<div className="absolute inset-0 bg-linear-to-t from-[#0a0f1d] via-[#0a0f1d70] to-transparent" />

				<div className="absolute inset-0 flex items-end px-5 md:px-8 lg:px-20 pb-8">
					<div className="w-full md:pl-[35%] lg:pl-[28%] flex flex-col gap-5">
						{/* Title */}
						<div className="h-8 sm:h-10 w-56 sm:w-72 lg:w-80 rounded bg-[#2a344d]" />

						{/* Tagline */}
						<div className="h-5 sm:h-6 w-40 sm:w-56 lg:w-60 rounded bg-[#2a344d]" />

						{/* Info */}
						<div className="flex gap-4 flex-wrap">
							<div className="h-4 w-12 rounded bg-[#2a344d]" />
							<div className="h-4 w-16 rounded bg-[#2a344d]" />
							<div className="h-4 w-20 rounded bg-[#2a344d]" />
						</div>

						{/* Genres */}
						<div className="flex flex-wrap gap-3">
							<div className="h-8 w-20 rounded-md bg-[#2a344d]" />
							<div className="h-8 w-24 rounded-md bg-[#2a344d]" />
							<div className="h-8 w-16 rounded-md bg-[#2a344d]" />
						</div>

						{/* Buttons */}
						<div className="flex flex-wrap gap-3 pt-2">
							<div className="h-10 w-32 sm:w-36 rounded-full bg-[#2a344d]" />
							<div className="h-10 w-36 sm:w-40 rounded-full bg-[#2a344d]" />
						</div>
					</div>
				</div>
			</div>

			{/* CONTENT */}
			<div className="px-5 md:px-8 lg:px-15 py-8 lg:py-12 flex flex-col gap-12">
				{/* Overview */}
				<section>
					<div className="h-8 w-40 rounded bg-[#2a344d] mb-6" />

					<div className="space-y-4">
						<div className="h-4 w-full rounded bg-[#2a344d]" />
						<div className="h-4 w-11/12 rounded bg-[#2a344d]" />
						<div className="h-4 w-10/12 rounded bg-[#2a344d]" />
						<div className="h-4 w-8/12 rounded bg-[#2a344d]" />
					</div>
				</section>

				{/* Cast */}
				<section>
					<div className="h-8 w-28 rounded bg-[#2a344d] mb-6" />

					<div className="flex gap-6 overflow-hidden">
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className="min-w-22.5 sm:min-w-27.5 flex flex-col items-center">
								<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#2a344d]" />

								<div className="h-4 w-16 rounded bg-[#2a344d] mt-3" />

								<div className="h-3 w-12 rounded bg-[#2a344d] mt-2" />
							</div>
						))}
					</div>
				</section>

				{/* Similar Movies */}
				<section>
					<div className="h-8 w-52 rounded bg-[#2a344d] mb-6" />

					<div className="flex gap-5 overflow-hidden">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="min-w-42.5 sm:min-w-50 lg:min-w-55">
								<div className="aspect-[2/3] rounded-xl bg-[#2a344d]" />

								<div className="h-5 w-3/4 rounded bg-[#2a344d] mt-3" />

								<div className="h-4 w-1/3 rounded bg-[#2a344d] mt-2" />
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default MovieDetailsSkeleton;
