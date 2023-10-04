import React, { useEffect, useState } from 'react';
import { IsAuthRedirect } from "../Services/isAuthRedirect";
import Header from "../Components/Header";
import TitlePage from '../Components/TitlePage';
import countWorkdays from '../utils/countWorkDays';
import LinkToBack from '../Components/LinkToBack';
import { useNavigate } from "react-router-dom";


const AddConges = () => {
    IsAuthRedirect();

    const [description, setDescription] = useState('');
    const [typeConges, setTypeConges] = useState('CP');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [nbConges, setNbConges] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if (startDate && endDate) {
        const days = countWorkdays(startDate, endDate);
        setNbConges(days);
      }
    }, [startDate, endDate]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (nbConges !== 0) {
        try {
          const token = sessionStorage.getItem('user_token_id');

          const response = await fetch(process.env.REACT_APP_API_URL + '/conges/add', {
              method: 'POST',
              headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
              body: JSON.stringify({
                  type_conges: typeConges,
                  date_debut: startDate,
                  date_fin: endDate,
                  raison: description,
                  nbConges
              })
          });

          const data = await response.json();

          if (data.success) {
              navigate('/conges');
          }

          setError(response.message);


        } catch (error) {
          setError(error);
        }
      }
    };

    const handleStartDateChange = (e) => {
      setStartDate(new Date(e.target.value));
    }

    const handleEndDateChange = (e) => {
      setEndDate(new Date(e.target.value));
      if (startDate) {
        const days = countWorkdays(startDate, new Date(e.target.value));
        setNbConges(days);
      }
    }

    return (
        <div className="page-add-conges">
            <Header />
            <LinkToBack path={'/conges'} text={'Retour à la page précédente'}/>
            <form onSubmit={handleSubmit} className='page-add-conges__form formulaire'>
              <TitlePage title={'Demande de Congés'} />
              <div className='page-add-conges__form__type-conges'>
                <label>Type de congés</label>
                <select
                  name="type_conges"
                  value={typeConges}
                  onChange={(e) => setTypeConges(e.target.value)}
                >
                  <option value="CP">CP</option>
                  <option value="CP sans soldes">CP sans soldes</option>
                  <option value="RTT">RTT</option>
                </select>
              </div>
              <div className='page-add-conges__form__nb-jours'>
                <label>Nombre de jours</label>
                <input
                  type="number"
                  name="nbConges"
                  value={nbConges}
                  disabled
                  min={1}
                  max={30}
                />
              </div>
              <div className='page-add-conges__form__date-debut'>
                <label>Date de début</label>
                <input
                  type="date"
                  name="date_debut"
                  value={startDate ? startDate.toISOString().split('T')[0] : ""}
                  onChange={handleStartDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className='page-add-conges__form__date-fin'>
                <label>Date de fin</label>
                <input
                  type="date"
                  name="date_fin"
                  value={endDate ? endDate.toISOString().split('T')[0] : ""}
                  onChange={handleEndDateChange}
                  disabled={!startDate}
                  min={startDate ? new Date(startDate.getTime() + 86400000).toISOString().split('T')[0] : ''}
                  required
                />
              </div>
              <div className='page-add-conges__form__description'>
                <label>Description</label>
                <textarea
                  type="text"
                  name="raison"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                />
              </div>
              <button type="submit" disabled={nbConges == 0}>Soumettre</button>
            </form>
        </div>
    );
}

export default AddConges;