import { create } from "zustand";
export const useMoviestore = create((set) => ({
	favorites: [],
	addToFav: (movie) =>
		set((state) => {
			const exists = state.favorites.some((fav) => fav.id === movie.id);
			if (exists) return state;
			return { favorites: [...state.favorites, movie] };
		}),
		removeFromFav:(movieId)=>
			set((state)=>{
					return {
					favorites: state.favorites.filter((fav) => fav.id !== movieId),
				};
			}),
	toggleFav: (movie) =>
		set((state) => {
			const exists = state.favorites.some((fav) => fav.id === movie.id);
			if (exists)
				return {
					favorites: state.favorites.filter((fav) => fav.id !== movie.id),
				};
			return { favorites: [...state.favorites, movie] };
		}),

	currentPage: 1,
	selectedCategory: "",
	sortBy: "",
	selectedYear: "",

	setCurrentPage: (page) => set({ currentPage: page }),
	setTotalPages: (pages) => set({ totalPages: pages }),
	setSelectedCategory: (category) => set({ selectedCategory: category }),

	setSortBy: (sort) => set({ sortBy: sort }),

	setSelectedYear: (year) => set({ selectedYear: year }),
}));
