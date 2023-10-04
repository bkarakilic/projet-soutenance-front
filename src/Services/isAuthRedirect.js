import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const IsAuthRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('user_token_id');
    const userRoles = sessionStorage.getItem('user_roles');

    useEffect(() => {
        if (token && location.pathname == '/login') {
            if (userRoles === 'comptable') {
              navigate('/admin/conges');
          } else {
              navigate('/conges');
          }
        }

        if (!token) {
            navigate('/login');
        }
    }, [token, userRoles, navigate, location]);
};
