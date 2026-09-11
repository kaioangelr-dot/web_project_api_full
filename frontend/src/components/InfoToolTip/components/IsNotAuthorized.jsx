import error from "../../../images/error.png";

export default function IsNotAuthorized() {
  return (
    <>
      <img src={error} alt="error" className="popup__auth-image" />
      <p className="popup__auth-text">
        Ops, algo deu errado! Por favor, tente novamente.
      </p>
    </>
  );
}
