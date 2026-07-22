import type { FC } from 'react';
import type { IMovie } from '../../types/types';
import MoviesListCard from '../MoviesListCard/MoviesListCard';
import './MoviesList.css';

interface MoviesListProps {
    movies: IMovie[];
}

const MoviesList: FC<MoviesListProps> = ({ movies }) => {
    return (
        <div className="movies-grid">
            {movies.map((movie) => (
                <MoviesListCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MoviesList;