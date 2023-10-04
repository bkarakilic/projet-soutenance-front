import React, { useEffect, useState } from 'react';
import { IsAuthRedirect } from "../Services/isAuthRedirect";
import Header from '../Components/Header';
import formatDate from "../utils/formatDate";
import { Link } from 'react-router-dom';
import TitlePage from '../Components/TitlePage';


const Ndf = () => {
    IsAuthRedirect();

    const [ndf, setNdf] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const token = sessionStorage.getItem('user_token_id');

              const response = await fetch(process.env.REACT_APP_API_URL + '/ndf', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  }
              });


              if (response.status == 200) {
                  const data = await response.json();

                  setNdf(data);
              }

          } catch (error) {
              console.error("Erreur lors de la récupération des notes de frais:", error);
          }
      };

      fetchData();
  }, []);

  console.log(ndf);

    return (
        <div className="page-ndf">
           <Header />
            <div className='page-ndf__container'>
                <TitlePage title={'Note de frais'} />

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
                        <th className="table-historique__table__description">Intitulé</th>
                        <th className="table-historique__table__date">Date</th>
                        <th className="table-historique__table__nb">Nombre de congés</th>
                        <th className="table-historique__table__type">Type de congés</th>
                        <th className="table-historique__table__status">Status</th>
                        <th className="table-historique__table__more"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ndf.map((frais) => (
                        <tr key={frais.id}>
                          <td>{frais.id}</td>
                          <td>{frais.raison}</td>
                          <td>{formatDate(frais.createdAt)}</td>
                          <td>{frais.nbConges}</td>
                          <td>{frais.type_conges}</td>
                          <td>{frais.status}</td>
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

export default Ndf;
