import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import MoviesPage from "../containers/MoviesPage/MoviesPage.tsx";
import {MovieDetailsPage} from "../containers/MovieDetailsPage/MovieDetailsPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <MoviesPage />,
            },
            {
                path: '/movie/:id',
                element: <MovieDetailsPage/>
            }
        ],
    },
]);