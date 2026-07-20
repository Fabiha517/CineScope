import App from "./App";
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import Favorites from "./pages/Favorites"
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import { createBrowserRouter } from "react-router-dom";

export const router=createBrowserRouter([
  {
    path:"/CineScope",
    element:<App/>,
    children:[
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/CineScope/movies",
        element: <Movies />,
      },
      {
        path: "/CineScope/favorites",
        element: <Favorites />,
      },
      {
        path: "/CineScope/movies/:id",
        element: <MovieDetails/>,
      },
      {
        path: "/CineScope/search",
        element: <SearchResults/>,
      },
    ]
  }
])