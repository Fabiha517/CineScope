import App from "./App";
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import Favorites from "./pages/Favorites"
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import { createBrowserRouter } from "react-router-dom";

export const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails/>,
      },
      {
        path: "/search",
        element: <SearchResults/>,
      },
    ]
  }
])