import Tr from "./Tr/Tr";


const Table = () => {
    return (
        <div className='table-historique'>
                    <div className='table-historique__new'>
                        <a className='table-historique__new__link' href='#'>+ Nouvelle demande de frais</a>
                    </div>
                    <table className='table-historique__table'>
                        <thead>
                            <tr>
                                <th className='table-historique__table__ref'>Ref</th>
                                <th className='table-historique__table__description'>Description</th>
                                <th className='table-historique__table__date'>Date</th>
                                <th className='table-historique__table__montant'>Montant</th>
                                <th className='table-historique__table__etat'>État</th>
                                <th className='table-historique__table__more'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Tr />
                        </tbody>
                    </table>
                </div>
    );
}


export default Table;   