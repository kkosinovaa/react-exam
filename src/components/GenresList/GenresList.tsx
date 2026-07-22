import type { FC } from 'react';
import type { IGenre } from '../../types/types.ts';
import './GenresList.css';

interface GenresListProps {
    genres: IGenre[];
    selectedGenre: number | null;
    onSelectGenre: (id: number | null) => void;
}

const GenresList: FC<GenresListProps> = ({ genres, selectedGenre, onSelectGenre }) => {
    return (
        <div className="genres-wrapper">
            <div className="genres-container">
                <button
                    className={`genre-btn ${selectedGenre === null ? 'active' : ''}`}
                    onClick={() => onSelectGenre(null)}
                >
                    Усі фільми
                </button>
                {genres.map((genre) => (
                    <button
                        key={genre.id}
                        className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
                        onClick={() => onSelectGenre(genre.id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GenresList;