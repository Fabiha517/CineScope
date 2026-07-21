import logo from "../assets/icons/logo.svg";
import search from "../assets/icons/search.svg";
import profile from "../assets/images/profile.png";

import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [menuOpen]);

	const handleSearch = () => {
		if (searchQuery.trim()) {
			navigate(
				`/search?query=${encodeURIComponent(searchQuery)}`
			);
			setMenuOpen(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<>
			<nav className="sticky top-0 z-600 bg-[#0A0F1D] border-b border-[#1F2937]">
				<div className=" px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between	 md:gap-2 max-w-screen overflow-hidden">

					
						<div
							className=" cursor-pointer shrink-0"
							end
							onClick={() => navigate("/")}
						>
							<img
								src={logo}
								alt="Logo"
								className="h-8 md:h-full  "
							/>

						</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center lg:gap-10 md:gap-4 font-medium ">
						<NavLink
							to="/"
							end
							className={({ isActive }) =>
								`pb-1 ${
									isActive
										? "border-b-2 border-violet-500 text-white"
										: "text-gray-300 hover:text-white"
								}`
							}
						>
							Home
						</NavLink>

						<NavLink
							to="/movies"
							end
							className={({ isActive }) =>
								`pb-1 ${
									isActive
										? "border-b-2 border-violet-500 text-white"
										: "text-gray-300 hover:text-white"
								}`
							}
						>
							Movies
						</NavLink>

						<NavLink
							to="/favorites"
							end
							className={({ isActive }) =>
								`pb-1 ${
									isActive
										? "border-b-2 border-violet-500 text-white"
										: "text-gray-300 hover:text-white"
								}`
							}
						>
							Favorites
						</NavLink>
					</div>

					{/* Right Side */}
					<div className="flex items-center gap-3 md:gap-2">

						{/* Search */}
						<div className="flex items-center bg-[#111827] border border-[#1F2937] rounded-full px-3 py-2 w-36 sm:w-56 md:w-67">
							<button
								onClick={handleSearch}
								className="cursor-pointer shrink-0"
							>
								<img
									src={search}
									alt="Search"
									className="w-4 h-4"
								/>
							</button>

							<input
								type="search"
								value={searchQuery}
								onChange={(e) =>
									setSearchQuery(e.target.value)
								}
								onKeyDown={handleKeyDown}
								placeholder="Search"
								className="ml-2 w-full bg-transparent outline-none text-white placeholder:text-gray-500 text-sm"
							/>
						</div>

				
						<img
							src={profile}
							alt="Profile"
							className="hidden xs:flex w-10 h-10 rounded-full object-cover"
						/>

						{/* Hamburger */}
						<button
							onClick={() => setMenuOpen(true)}
							className="md:hidden text-3xl hover:text-violet-400 transition cursor-pointer  h-fit"
						>
							<FiMenu />
						</button>
					</div>
				</div>
			</nav>

			{/* Overlay */}
			<div
				onClick={() => setMenuOpen(false)}
				className={`fixed inset-0 bg-black/60 z-400 transition-opacity duration-300 ${
					menuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
			/>

			{/* Sliding Drawer */}
			<div
				className={`fixed top-0 right-0 h-screen w-72 bg-[#111827] border-l border-[#1F2937]
				z-700 shadow-2xl transition-transform duration-300 ease-in-out
				${menuOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				{/* Header */}
				<div className="flex justify-between items-center p-6 border-b border-[#1F2937]">


					<button
						onClick={() => setMenuOpen(false)}
						className="text-3xl hover:text-violet-400 transition cursor-pointer"
					>
						<FiX />
					</button>
				</div>

				{/* Links */}
				<div className="flex flex-col mt-6">

					<NavLink
						to="/"

						end
						onClick={() => setMenuOpen(false)}
						className={({ isActive }) =>
							`px-8 py-4 transition ${
								isActive
									? "bg-violet-600 text-white"
									: "hover:bg-[#1B2332]"
							}`
						}
					>
						🏠 Home
					</NavLink>

					<NavLink
						to="/movies"
						onClick={() => setMenuOpen(false)}
						className={({ isActive }) =>
							`px-8 py-4 transition ${
								isActive
									? "bg-violet-600 text-white"
									: "hover:bg-[#1B2332]"
							}`
						}
					>
						🎬 Movies
					</NavLink>

					<NavLink
						to="/favorites"
						onClick={() => setMenuOpen(false)}
						className={({ isActive }) =>
							`px-8 py-4 transition ${
								isActive
									? "bg-violet-600 text-white"
									: "hover:bg-[#1B2332]"
							}`
						}
					>
						❤️ Favorites
					</NavLink>
				</div>

			
			</div>
		</>
	);
};

export default Navbar;