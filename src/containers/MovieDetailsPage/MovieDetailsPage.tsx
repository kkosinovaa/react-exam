import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IMovieDetails } from "../../types/types.ts";
import { getMovieDetails } from "../../api/movies.ts";
import './MovieDetailsPage.css';
import Loader from "../../components/Loader/Loader.tsx";
import GenreBadge from "../../components/GenreBadge/GenreBadge.tsx";

export const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    const [movie, setMovie] = useState<IMovieDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getMovieDetails(Number(id));
                setMovie(data);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Помилка завантаження деталей: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="details-container"><Loader/></div>;
    if (!movie) return <div className="details-container"><p>Фільм не знайдено!</p></div>;

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours} год ${mins} хв` : `${mins} хв`;
    };

    return (
        <div className="details-page">
            <div className="details-hero-bg" style={{ backgroundImage: `url(${backdropUrl})` }} />

            <div className="details-container">
                <Link to="/" className="go-to-main back-link">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                             strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </span>
                    <span>Повернутися на головну</span>
                </Link>

                <div className="details-main">
                    <div className="details-poster-wrapper">
                        <img className="details-poster" src={posterUrl} alt={movie.title} />
                    </div>

                    <div className="details-info">
                        <h1 className="details-title">{movie.title}</h1>

                        <div className="details-meta">
                            <span className="details-rating">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ marginRight: '5px', color: 'var(--rating-color)' }}>
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                </svg>
                                {movie.vote_average.toFixed(1)}
                            </span>

                            <span className="details-runtime">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ marginRight: '5px' }}>
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                {formatRuntime(movie.runtime)}
                            </span>

                            <span className="details-release">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ marginRight: '5px' }}>
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
                            </span>

                            <span className="details-status-tag">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ marginRight: '5px' }}>
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 14 14"></polyline>
                                </svg>
                                {movie.status}
                            </span>

                            {movie.budget > 0 && (
                                <span className="details-budget-tag">
                                    ${movie.budget.toLocaleString()}
                                </span>
                            )}
                        </div>

                        <div className="details-genres">
                            {movie.genres
                                ?.filter((genre, index, self) =>
                                    index === self.findIndex((g) => g.id === genre.id)
                                )
                                .map((genre) => (
                                    <GenreBadge key={genre.id} name={genre.name} />
                                ))
                            }
                        </div>

                        <h2 className="details-overview-title">Опис фільму</h2>
                        <p className="details-overview">{movie.overview || "Опис до цього фільму поки що відсутній."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};