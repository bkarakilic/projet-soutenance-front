import React, { useEffect, useState } from 'react';
import { IsAuthRedirect } from "../../Services/isAuthRedirect";
import Header from '../../Components/Header/Header';
import Table from '../../Components/Table/Table';


const Conges = () => {
    IsAuthRedirect();

    const [conges, setConges] = useState([]);
    const login = sessionStorage.getItem('user_login');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('user_token_id');
                
                const response = await fetch(process.env.REACT_APP_API_URL + '/conges', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
    
    
                if (response.status == 200) {
                    const data = await response.json();
        
                    setConges(data);
                }
    
            } catch (error) {
                console.error("Erreur lors de la récupération des congés:", error);
            }
        };
    
        fetchData();
    }, []);

    console.log(conges);

    return (
        <div className="page-conges">
            <Header />
            <div className='page-conges__container'>
                <h1>NOTE DE FRAIS / {login}</h1>
                <Table congesData={conges} />   
            </div>
        </div>
    );
}

export default Conges;
