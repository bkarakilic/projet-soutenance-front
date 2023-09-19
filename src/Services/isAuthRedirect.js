import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const IsAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('user_token_id');

    useEffect(() => {
        if (token && location.pathname == '/login') {
            navigate('/ndf');
        }

        if (!token) {
            navigate('/login');
        }
    }, [token, navigate, location]);
};
