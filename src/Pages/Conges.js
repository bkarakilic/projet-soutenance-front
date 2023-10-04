import React, { useEffect, useState } from 'react';
import { IsAuthRedirect } from "../Services/isAuthRedirect";
import Header from '../Components/Header';
import formatDate from "../utils/formatDate";
import { Link } from 'react-router-dom';
import TitlePage from '../Components/TitlePage';


const Conges = () => {
    IsAuthRedirect();

    const [conges, setConges] = useState([]);

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

    return (
        <div className="page-conges">
            <Header />
            <div className='page-conges__container'>
              <TitlePage title={'Congés'} />

                <div className="table-historique">
                  <div className="table-historique__new">
                    <Link to="/conges/add" className="table-historique__new__link">
                      + Nouvelle demande de congé
                    </Link>
                  </div>
                  <table className="table-historique__table">
                    <thead>
                      <tr>
                        <th className="table-historique__table__ref">Ref</th>
                        <th className="table-historique__table__description">Description</th>
                        <th className="table-historique__table__date">Date</th>
                        <th className="table-historique__table__nb">Nombre de congés</th>
                        <th className="table-historique__table__type">Type de congés</th>
                        <th className="table-historique__table__status">Status</th>
                        <th className="table-historique__table__more"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {conges.map((conge) => (
                        <tr key={conge.id}>
                          <td>{conge.id}</td>
                          <td>{conge.raison}</td>
                          <td>{formatDate(conge.createdAt)}</td>
                          <td>{conge.nbConges}</td>
                          <td>{conge.type_conges}</td>
                          <td>{conge.status}</td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    );
}

export default Conges;
