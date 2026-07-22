import type { FC } from 'react';
import { Link } from 'react-router-dom';
import PosterPreview from '../PosterPreview/PosterPreview';
import MovieInfo from '../MovieInfo/MovieInfo';
import type { IMovie } from '../../types/types';
import './MoviesListCard.css';

interface MoviesListCardProps {
    movie: IMovie;
}

const MoviesListCard: FC<MoviesListCardProps> = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="movie-card">
            <PosterPreview posterPath={movie.poster_path} title={movie.title} />
            <MovieInfo
                title={movie.title}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
            />
        </Link>
    );
};

export default MoviesListCard;