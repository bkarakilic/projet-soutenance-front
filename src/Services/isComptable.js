import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const isComptable = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const userRoles = sessionStorage.getItem('user_roles');

    useEffect(() => {
        if (userRoles !== 'comptable' && location.pathname.startsWith('/admin/')) {
            const newPath = location.pathname.replace('/admin/', '/');
            navigate(newPath);
        }
    }, [userRoles, navigate, location]);
};

export default isComptable;