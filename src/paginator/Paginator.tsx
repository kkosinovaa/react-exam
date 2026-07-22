import type {FC} from "react";
import './Paginator.css'

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onNextPage: () => void;
    onPreviousPage: () => void;

}
const Paginator: FC<PaginatorProps> = ({currentPage, totalPages, onNextPage, onPreviousPage}) => {
    return (
        <div className="pagination-container">
            <button
                className="pagination-btn"
                onClick={onPreviousPage}
                disabled={currentPage === 1}
            >
                Попередня
            </button>

            <span className="pagination-info">
        Сторінка {currentPage} з {totalPages > 500 ? 500 : totalPages}
      </span>

            <button
                className="pagination-btn"
                onClick={onNextPage}
                disabled={currentPage === totalPages || currentPage === 500}
            >
                Наступна
            </button>
        </div>
    );
}

export default Paginator;