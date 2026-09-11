import alright from "../../../images/alright.png";

export default function IsAuthorized() {
  return (
    <>
      <img src={alright} alt="alright" className="popup__auth-image" />
      <p className="popup__auth-text">Vitória! Você precisa fazer o login.</p>
    </>
  );
}
