import Logo from "../../Components/Logo";
import React, { useState } from 'react';


function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [comptable, setComptable] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_API_URL);
        fetch(process.env.REACT_APP_API_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, comptable }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                    // Connectez l'utilisateur ici, par exemple en stockant le token dans le local storage
                    // localStorage.setItem('token', data.token);
                    // Rediriger vers la page d'accueil ou le tableau de bord
            })
            .catch((error) => {
                console.error('Une erreur est survenue lors de la connexion:', error);
                // Gérez les erreurs supplémentaires ici
            });
    }

    return (
        <div className="page-login">
            <Logo />
            <form className="page-login__form" onSubmit={handleSubmit}  >
                <h1>Espace Privé / ABSMEDIC</h1>
                <input type="text" name="username" placeholder="Username" className="page-login__form__username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" name="password" placeholder="Password" className="page-login__form__password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <a href="#" className="page-login__form__link-forgot">Mot de passe oublié ?</a>
                <div className="page-login__form__wrapper-comptable">
                    <input type="checkbox" name="comptable" cked={comptable} onChange={(e) => setComptable(e.target.checked)} />
                    <label>Comptable</label>
                </div> 
                <button>Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
