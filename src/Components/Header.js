import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { DestroySession } from '../Services/DestroySession';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Header = () => {
    const username = sessionStorage.getItem('user_login');
    const location = useLocation();
    const navigate = useNavigate();
    
    const [routes, setRoutes] = useState([
        { path: '/conges', name: 'Congés', isActive: false },
        { path: '/ndf', name: 'Note de frais', isActive: false },
        { path: '/profil', name: 'Profil', isActive: false },
        // { path: '/historique', name: 'Historique', isActive: false },
    ]);

    useEffect(() => {
        setRoutes(prevRoutes =>
            prevRoutes.map(route =>
                route.path === location.pathname 
                    ? { ...route, isActive: true }
                    : { ...route, isActive: false }
            )
        );
    }, [location]);

    const handleLogout = (e) => {
        e.preventDefault();

        DestroySession();

        navigate('/login');
    }

    return (
        <header className="header">
            <Logo />
            <nav className='header__nav'>
                <ul>
                    {routes.map(route => (
                        <li className={route.isActive ? 'active' : ''} key={route.path}>
                            {route.isActive ? (
                                route.name
                            ) : (
                                <Link to={route.path}>{route.name}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className='header__infos-logout'>
                <p>Bonjour <b>{username}</b></p>
                <button onClick={(e) => handleLogout(e)}>Deconnexion</button>
            </div>
        </header>
    );
}

export default Header;