import Logo from "../../Components/Logo";
import React, { useState } from 'react';
import { IsAuthRedirect } from "../../Services/isAuthRedirect";
import { useNavigate } from "react-router-dom";


function Login () {
    IsAuthRedirect();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [comptable, setComptable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_API_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password, comptable }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                sessionStorage.setItem('user_token_id', data.token);
                sessionStorage.setItem('user_login', data.username);
                sessionStorage.setItem('user_roles', data.roles);

                navigate('/');
              } else {
                setErrorMessage(data.message);
              }
        })
        .catch((error) => {
            console.error('Une erreur est survenue lors de la connexion:', error);
        });
    }

    return (
        <div className="page-login">
            <Logo />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form className="page-login__form" onSubmit={handleSubmit}  >
                <h1>Espace Privé / ABSMEDIC</h1>
                <input type="text" name="username" placeholder="Username" className="page-login__form__username" value={login} onChange={(e) => setLogin(e.target.value)} required/>
                <input type="password" name="password" placeholder="Password" className="page-login__form__password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <a href="#" className="page-login__form__link-forgot">Mot de passe oublié ?</a>
                <div className="page-login__form__wrapper-comptable">
                    <input type="checkbox" name="comptable" cked={comptable} onChange={(e) => setComptable(e.target.checked)} />
                    <label>Comptable</label>
                </div> 
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
