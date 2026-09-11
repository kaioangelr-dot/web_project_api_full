import { Link } from "react-router-dom";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import { useState } from "react";

export const Register = (props) => {
  const { popup, handleClosePopup, handleSignup } = props;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    handleSignup(data.email, data.password);
    e.preventDefault();
  };

  return (
    <div className="register">
      <h2 className="register__title">Inscrever-se</h2>
      <form
        className="register__form"
        id="register-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">E-mail</label>
        <input
          className="register__input"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          minLength="3"
          maxLength="100"
          value={data.email}
          onChange={handleChange}
          required
        ></input>
        <label htmlFor="password">Senha</label>
        <input
          className="register__input"
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          minLength="8"
          maxLength="100"
          value={data.password}
          onChange={handleChange}
          required
        ></input>
      </form>
      <button className="register__button" type="submit" form="register-form">
        Inscrever-se
      </button>
      <div className="register__signin">
        <p className="register__signin-text">
          Já é membro?{" "}
          <Link to="/login" className="signin__link">
            Faça o login aqui!
          </Link>
        </p>
      </div>
      {popup && (
        <InfoToolTip handleClosePopup={handleClosePopup}>
          {popup.children}
        </InfoToolTip>
      )}
    </div>
  );
};
