import React, { useEffect, useState } from 'react';
import { IsAuthRedirect } from "../Services/isAuthRedirect";
import Header from "../Components/Header";
import { DestroySession } from '../Services/DestroySession';
import { useNavigate } from 'react-router-dom';
import TitlePage from '../Components/TitlePage';


const Profil = () => {
    IsAuthRedirect();
    const [nom, setNom] = useState('');
    const [civilite, setCivilite] = useState('');
    const [prenom, setPrenom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [mdp, setMdp] = useState('');
    const [confirmMdp, setConfirmMdp] = useState('');
    const [login, setLogin] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const token = sessionStorage.getItem('user_token_id');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + '/profil', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status == 401) {
                    DestroySession();

                    navigate('/login');
                }

                if (!response.ok) {
                    throw new Error('Profil request failed');
                }

                const data = await response.json();

                setEmail(data.email);
                setPrenom(data.prenom);
                setNom(data.nom);
                setLogin(data.login);
                setCivilite(data.civilite);
                setVille(data.ville);
                setAdresse(data.adresse);
                setCodePostal(data.codePostal);

            } catch (error) {
              console.error("Erreur lors de la récupération du profil:", error);
            }
        };

        fetchData();

    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        let json_body = JSON.stringify({ nom, prenom, email, civilite, ville, codePostal, adresse });

        if (mdp && confirmMdp) {
            if (mdp == confirmMdp) {
                json_body = JSON.stringify({ nom, prenom, email,civilite, mdp, adresse, codePostal, ville });
            } else {
                setErrorMessage('Les mots de passe ne sont pas identiques');
                return;
            }
        }

        fetch(process.env.REACT_APP_API_URL + '/profil', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: json_body,
        }).then((response) => {
           return response.json();
        })
        .then((data) => {
            if (data && data.success) {
                navigate(0);
            }
          })
        .catch((error) => {
            console.error('Une erreur est survenue lors de la connexion:', error);
        });
    }

    return (
        <div className="page-profil">
            <Header />
            <form className="page-profil__form" onSubmit={handleSubmit}  >
                <TitlePage title={'Profil'} />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className='page-profil__form__civilite'>
                    <label>Civilité :</label>
                    <select
                        name="civilite"
                        className="page-profil__form__civilite__input"
                        value={civilite}
                        onChange={(e) => setCivilite(e.target.value)}
                        required
                    >
                        <option value="" disabled hidden>Choisir une option</option>
                        <option value="Monsieur">Monsieur</option>
                        <option value="Madame">Madame</option>
                    </select>
                </div>
                <div className='page-profil__form__nom'>
                    <label>Nom :</label>
                    <input type="text" name="nom" placeholder="Nom" className="page-login__form__nom" value={nom} onChange={(e) => setNom(e.target.value)} required/>
                </div>
                <div className='page-profil__form__prenom'>
                    <label>Prénom :</label>
                    <input type="text" name="prenom" placeholder="Prénom" className="page-login__form__prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required/>
                </div>
                <div className='page-profil__form__email'>
                    <label>Adresse email :</label>
                    <input type="text" name="email" placeholder="Email" className="page-login__form__email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled/>
                </div>
                <div className='page-profil__form__prenom'>
                    <label>Adresse :</label>
                    <input type="text" name="adresse" placeholder="Adresse" className="page-login__form__adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} required/>
                </div>
                <div className='page-profil__form__prenom'>
                    <label>Ville :</label>
                    <input type="text" name="ville" placeholder="Ville" className="page-login__form__ville" value={ville} onChange={(e) => setVille(e.target.value)} required/>
                </div>
                <div className='page-profil__form__code-postal'>
                    <label>Prénom :</label>
                    <input type="text" name="code-postal" placeholder="Code Postal" className="page-login__form__code-postal" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} required/>
                </div>
                <div className='page-profil__form__mdp'>
                    <label>Nouveau Mot de passe :</label>
                    <input type="password" name="mdp" placeholder="Nouveau mot de passe" className="page-login__form__mdp" value={mdp} onChange={(e) => setMdp(e.target.value)}/>
                </div>
                <div className='page-profil__form__confirm-mdp'>
                    <label>Confirmation Mot de passe :</label>
                    <input type="password" name="confirm-mdp" placeholder="Confirmation du nouveau mot de passe" className="page-login__form__mdp-confirm" value={confirmMdp} onChange={(e) => setConfirmMdp(e.target.value)}/>
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
}

export default Profil;
