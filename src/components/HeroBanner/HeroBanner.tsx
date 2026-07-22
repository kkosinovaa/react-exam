import { type FC, useState, useEffect } from 'react';
import type { IMoviesResponse } from '../../types/types';
import './HeroBanner.css';

type Movie = IMoviesResponse['results'][0];

interface HeroBannerProps {
    movies: Movie[];
}

const HeroBanner: FC<HeroBannerProps> = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!movies || movies.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === movies.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000);

        return () => clearInterval(interval);
    }, [movies]);

    if (!movies || movies.length === 0) return null;

    const currentMovie = movies[currentIndex];

    return (
        <div className="hero-banner">
            <div className="hero-background-slider">
                {movies.map((movie, index) => {
                    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
                    return (
                        <div
                            key={`bg-${movie.id}`}
                            className={`hero-background-image ${index === currentIndex ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${backdropUrl})` }}
                        />
                    );
                })}
            </div>

            <div className="hero-overlay"></div>
            <div className="hero-content" key={currentMovie.id}>
                <h1 className="hero-title">{currentMovie.title}</h1>

                <div className="hero-meta">
                    <span className="meta-tag rating">IMDb {currentMovie.vote_average.toFixed(1)}</span>
                    <span className="meta-tag">HD</span>
                    <span className="meta-tag">{currentMovie.release_date?.substring(0, 4)}</span>
                </div>

                <p className="hero-overview">{currentMovie.overview}</p>

                <button className="hero-play-btn">
                    Play
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;