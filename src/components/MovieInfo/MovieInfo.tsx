import type { FC } from 'react';
import StarsRating from '../StarsRating/StarsRating';
import GenreBadge from '../GenreBadge/GenreBadge';
import './MovieInfo.css';

interface MovieInfoProps {
    title: string;
    rating: number;
    releaseDate?: string;
}

const MovieInfo: FC<MovieInfoProps> = ({ title, rating, releaseDate }) => {
    const year = releaseDate ? releaseDate.split('-')[0] : '';

    return (
        <div className="movie-info">
            <h3 className="movie-title">{title}</h3>
            <div className="movie-meta">
                <StarsRating rating={rating} />
                {year && <GenreBadge name={year} />}
            </div>
        </div>
    );
};

export default MovieInfo;