import React, { useEffect, useState } from 'react';
import { IsAuthRedirect } from "../../Services/isAuthRedirect";
import Header from '../../Components/Header/Header';
import Table from '../../Components/Table/Table';


const Ndf = () => {
    IsAuthRedirect();
    const login = sessionStorage.getItem('user_login');

    return (
        <div className="page-ndf">
           <Header />
            <div className='page-ndf__container'>
                <h1>NOTE DE FRAIS / {login}</h1>
                <Table />
            </div>
        </div>
    );
}

export default Ndf;
