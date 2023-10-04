import { Link } from "react-router-dom";

const LinkToBack = ({path, text}) => {

    return (
      <Link to={path} className='page-add-conges__link-to-back'>{text}</Link>
    );
}

export default LinkToBack;