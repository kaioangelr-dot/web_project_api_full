import alright from "../../../images/alright.png";
import { Link } from "react-router-dom";

export default function IsAuthorized(props) {
  const { handleClosePopup } = props;
  return (
    <>
      <img src={alright} alt="alright" className="popup__auth-image" />
      <p className="popup__auth-text">Vitória! Você foi registrado.</p>
      <Link to="/login" className="popup__login-link" onClick={handleClosePopup}>
        Fazer o login &#8594;
      </Link>
    </>
  );
}
