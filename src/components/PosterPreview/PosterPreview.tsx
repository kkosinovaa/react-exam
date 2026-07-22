import type { FC } from 'react';
import './PosterPreview.css';
import noPoster from '../../images/no-poster.png';
interface PosterPreviewProps {
    posterPath: string | null;
    title: string;
}

const PosterPreview: FC<PosterPreviewProps> = ({ posterPath, title }) => {
    const imageUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : noPoster;

    return (
        <div className="poster-container">
            <img src={imageUrl} alt={title} className="movie-poster" />
        </div>
    );
};

export default PosterPreview;