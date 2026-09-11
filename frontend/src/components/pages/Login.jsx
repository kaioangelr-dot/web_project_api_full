import { Link } from "react-router-dom";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import { useState } from "react";

export const Login = (props) => {
  const { popup, handleClosePopup, handleSignin } = props;

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
    handleSignin(data.email, data.password);
    e.preventDefault();
  };
  return (
    <div className="login">
      <h2 className="login__title">Entrar</h2>
      <form className="login__form" id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          className="login__input"
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
          className="login__input"
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
      <button className="login__button" type="submit" form="login-form">
        Entrar
      </button>
      <div className="login__signup">
        <p className="login__signup-text">
          Ainda não é membro?{" "}
          <Link to="/signup" className="signup__link">
            Inscreva-se aqui!
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
