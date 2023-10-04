import React, { useEffect, useState } from 'react';
import { IsAuthRedirect } from "../../Services/isAuthRedirect";
import { Link } from 'react-router-dom';
import TitlePage from '../../Components/TitlePage';
import { isComptable } from '../../Services/isComptable';


const Conges = () => {
    IsAuthRedirect();
    isComptable();

    return (
        <div className="page-conges">
          <TitlePage title={'Congés'} />
        </div>
    );
}

export default Conges;
