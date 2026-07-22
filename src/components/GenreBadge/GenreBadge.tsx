import type { FC } from 'react';
import './GenreBadge.css';

interface GenreBadgeProps {
    name: string;
}

const GenreBadge: FC<GenreBadgeProps> = ({ name }) => {
    return (
        <span className="genre-badge">
            {name}
        </span>
    );
};

export default GenreBadge;