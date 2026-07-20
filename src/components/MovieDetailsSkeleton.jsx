const MovieDetailsSkeleton = () => {
	return (
		<div className="animate-pulse">
			{/* Hero */}
			<div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-[#1b2235] ">
				<div className="absolute left-4 sm:left-8 lg:left-15 bottom-7 h-[40%] sm:h-[50%] lg:h-[65%] w-40 lg:w-60 bg-[#2a344d] rounded-lg   " />

				<div className="absolute inset-0 px-4 sm:px-8 lg:px-20 flex items-end pb-10">
					<div className="pl-[35%] sm:pl-[30%] lg:pl-[25%] w-full flex flex-col gap-5 ">
						<div className="h-10 w-80 bg-[#2a344d] rounded mb-4" />
						<div className="h-6 w-60 bg-[#2a344d] rounded mb-6" />

						<div className="flex gap-6 ">
							<div className="h-4 w-12 bg-[#2a344d] rounded" />
							<div className="h-4 w-16 bg-[#2a344d] rounded" />
							<div className="h-4 w-20 bg-[#2a344d] rounded" />
						</div>

						<div className="flex gap-5">
							<div className="h-10 w-36 rounded-full bg-[#2a344d]" />
							<div className="h-10 w-40 rounded-full bg-[#2a344d]" />
						</div>
					</div>
				</div>
			</div>

			{/* Overview */}
			<div className="px-4 sm:px-8 lg:px-15 py-10 flex flex-col gap-3">
				<div className="h-8 w-40 bg-[#2a344d] rounded pb-6" />

				<div className="space-y-3 flex flex-col gap-3 ">
					<div className="h-4 w-full bg-[#2a344d] rounded" />
					<div className="h-4 w-11/12 bg-[#2a344d] rounded" />
					<div className="h-4 w-10/12 bg-[#2a344d] rounded" />
					<div className="h-4 w-8/12 bg-[#2a344d] rounded" />
				</div>
			</div>
		</div>
	);
};

export default MovieDetailsSkeleton;