
const TitlePage = ({title}) => {
  const login = sessionStorage.getItem('user_login');


    return (
      <h1 className="page-titre">{title} / {login}</h1>
    );
}

export default TitlePage;