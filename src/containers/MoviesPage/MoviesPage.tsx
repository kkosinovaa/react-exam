import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import type { IMoviesResponse, IGenre } from "../../types/types.ts";
import { getMovies, getGenres, searchMovies } from "../../api/movies.ts";
import MoviesList from "../../components/MoviesList/MoviesList.tsx";
import Paginator from "../../paginator/Paginator.tsx";
import HeroBanner from "../../components/HeroBanner/HeroBanner.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import GenresList from "../../components/GenresList/GenresList.tsx";
import './MoviesPage.css';

const MoviesPage = () => {
    const [movies, setMovies] = useState<IMoviesResponse['results']>([]);
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [prevQuery, setPrevQuery] = useState(query);

    if (query !== prevQuery) {
        setPrevQuery(query);
        setCurrentPage(1);
        setSelectedGenre(null);
    }

    const sectionRef = useRef<HTMLDivElement>(null);
    const shouldScroll = useRef<boolean>(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const genresData = await getGenres();
                setGenres(genresData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                let data;

                if (query) {
                    data = await searchMovies(query, currentPage);
                } else {
                    data = await getMovies(currentPage, selectedGenre);
                }

                setMovies(data?.results || []);
                setTotalPages(data?.total_pages || 1);

                if (currentPage === 1 && !shouldScroll.current) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } catch (e) {
                console.error(e);
                setMovies([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [currentPage, selectedGenre, query]);

    useEffect(() => {
        if (!loading && shouldScroll.current) {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            shouldScroll.current = false;
        }
    }, [loading]);

    const handleGenreSelect = (genreId: number | null) => {
        if (query) {
            searchParams.delete('query');
            setSearchParams(searchParams);
        }
        setSelectedGenre(genreId);
        setCurrentPage(1);
        shouldScroll.current = true;
    };

    const handleNextPage = () => {
        shouldScroll.current = true;
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        shouldScroll.current = true;
        setCurrentPage((prev) => prev - 1);
    };

    return (
        <div>
            {!loading && movies?.length > 0 && currentPage === 1 && selectedGenre === null && !query && (
                <HeroBanner movies={movies.slice(0, 5)} />
            )}

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
                <div className="section-header-premium" ref={sectionRef}>
                    <div className="premium-badge">
                        <span className="badge-dot"></span>
                        {query ? 'Search' : 'Trending'}
                    </div>
                    <h2 className="premium-title">
                        {query
                            ? `Результати пошуку: "${query}"`
                            : selectedGenre
                                ? genres.find(g => g.id === selectedGenre)?.name
                                : 'Популярні фільми'}
                    </h2>
                    <div className="premium-divider"></div>
                </div>

                <GenresList
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onSelectGenre={handleGenreSelect}
                />

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {movies?.length === 0 && query ? (
                            <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.2rem', color: '#888' }}>
                                На жаль, за запитом "{query}" нічого не знайдено. Спробуйте змінити ключові слова.
                            </div>
                        ) : (
                            <MoviesList movies={movies} />
                        )}

                        {totalPages > 1 && movies?.length > 0 && (
                            <Paginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onNextPage={handleNextPage}
                                onPreviousPage={handlePrevPage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;