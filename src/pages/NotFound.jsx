import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import BG from "../assets/images/bgImage.png";
import TMDB from "../assets/icons/TMDB.svg";
const NotFound = () => {
	return (
		<div className="		h-screen flex flex-col bg-[#0a0f1d] text-white">

			<section className="relative flex-1 overflow-hidden">
			
				<img
					src={BG}
					alt="404 Illustration"
			className="absolute inset-0 w-full h-full  select-none pointer-events-none"
				/>

				<div className="absolute inset-0 bg-linear-to-t from-[#0a0f1d] via-transparent to-transparent h-full" />

			<div className="relative z-20 h-full flex mt-10 ml-40 md:ml-5	justify-center md:justify-end px-5 sm:px-10 lg:px-20 pb-11">
					<div className="max-w-sm text-left">
						<h1 className="text-7xl sm:text-8xl lg:text-[160px] font-black leading-none bg-linear-to-b from-[#E9D5FF] to-[#8B5CF6] bg-clip-text text-transparent">
							404
						</h1>

						<h2 className="pt-2 text-2xl sm:text-3xl lg:text-4xl font-bold ">
							Page not found
						</h2>

						<p className="pt-5 text-gray-400 text-base sm:text-lg leading-7 sm:leading-8 max-w-md mx-auto lg:mx-0 pb-8">
							Looks like this movie escaped our archive.
							<br />
							Let's get you back to discovering something great.
						</p>

				<div className="flex justify-center lg:justify-start">
  <Link
    to="/CineScope"
    className="inline-flex items-center gap-3 rounded-full bg-cyan-500 hover:bg-cyan-400 px-7 py-3 font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,.35)]"
  >
    <FiHome size={20} />
    Return Home
  </Link>
</div>
					</div>
				</div>
			</section>
			{/* FOOTER */}

			<footer className="border-t border-white/10 px-5 sm:px-10 lg:px-20 py-6">
				<div className="flex flex-col items-center lg:flex-row lg:justify-between gap-8 text-center lg:text-left">
					<div>
						<p className="text-gray-500 text-sm">
							© {new Date().getFullYear()} CineScope
						</p>

						<div className="flex flex-wrap gap-6 text-gray-400 text-sm">
							<Link className="hover:text-violet-400 transition">About</Link>

							<Link className="hover:text-violet-400 transition">Contact</Link>

							<Link className="hover:text-violet-400 transition">
								Privacy Policy
							</Link>

							<Link className="hover:text-violet-400 transition">
								Terms of Use
							</Link>
						</div>
					</div>

				

					<div className="flex  md:flex-col items-start lg:items-end gap-2">
						<p className="text-gray-400 text-sm pb-3">
							Movie data and images provided by
						</p>

						<img src={TMDB} alt="TMDB" className="h-9 object-contain" />
					</div>
				</div>
			</footer>
		</div>
	);
};

export default NotFound;
