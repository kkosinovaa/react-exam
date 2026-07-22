import type { IMoviesResponse, IMovieDetails, IGenre, IGenresResponse } from '../types/types.ts';
import { axiosInstance } from './axios.ts';

export const getGenres = async (): Promise<IGenre[]> => {
    const response = await axiosInstance.get<IGenresResponse>('/genre/movie/list');
    return response.data.genres;
};

export const getMovies = async (page: number = 1, genreId?: number | null): Promise<IMoviesResponse> => {
    const params: Record<string, string | number> = {
        page,
        sort_by: 'popularity.desc'
    };

    if (genreId) {
        params.with_genres = genreId;
    }

    const response = await axiosInstance.get<IMoviesResponse>('/discover/movie', { params });
    return response.data;
};

export const getMovieDetails = async (movieId: number): Promise<IMovieDetails> => {
    const response = await axiosInstance.get<IMovieDetails>(`/movie/${movieId}`);
    return response.data;
};

export const searchMovies = async (query: string, page: number = 1): Promise<IMoviesResponse> => {
    const response = await axiosInstance.get<IMoviesResponse>('/search/movie', {
        params: {
            query,
            page
        }
    });
    return response.data;
};