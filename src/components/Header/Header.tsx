import {useState, type FC,  type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import UserInfo from "../UserInfo/UserInfo.tsx";

export const Header: FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchValue.trim()) {
            navigate(`/?query=${searchValue}`);
        } else {
            navigate(`/`);
        }
    };

    return (
        <header className='header'>
            <div className='header-container'>
                <Link to='/' className='logo'>
                    <span className='logo-accent'>Night</span>Stream
                </Link>

                <nav>
                    <Link to='/' className='nav-link active'>Головна</Link>
                    <a href="#" className='nav-link'>Фільми</a>
                    <a href="#" className='nav-link'>Серіали</a>
                </nav>
                <div className="header-actions">

                    <form className="search-box" onSubmit={handleSearchSubmit}>
                        <span className="search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Пошук фільмів..."
                            className="search-input"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </form>

                    <UserInfo/>
                </div>
            </div>
        </header>
    );
};

export default Header;