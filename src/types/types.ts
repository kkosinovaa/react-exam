export interface IMovie {
    id: number
    title: string
    overview: string
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
}
export interface IGenre {
    id: number;
    name: string;
}
export interface IGenresResponse {
    genres: IGenre[];
}
export interface IMoviesResponse {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IMovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    runtime:  number;
    budget: number;
    status:  string;
    genres: IGenre[];
}