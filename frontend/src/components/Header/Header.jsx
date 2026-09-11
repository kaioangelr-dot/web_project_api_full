import { useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useState } from "react";
import { removeToken } from "../../utils/token";

export default function Header({ isLoggedIn, setIsLoggedIn, email }) {
  const location = useLocation();
  const [showoptions, setShowoptions] = useState(false);
  const signout = () => {
    removeToken();
    setIsLoggedIn(false);
    setShowoptions(false);
  };

  function handleShowoptions() {
    setShowoptions(!showoptions);
  }

  return (
    <header
      className={`header page__section ${showoptions && "header__options"}`}
    >
      <img
        alt="Logotipo Around The U.S."
        className={`logo header__logo `}
        src={logo}
      />
      {isLoggedIn && (
        <button
          className={`header__menu-btn ${showoptions && "header__container_options-close-btn"}`}
          onClick={handleShowoptions}
        >
          <span
            className={`header__hamburger-bar ${!showoptions && "header__hamburger-bar_active"}`}
            aria-hidden="true"
          ></span>
          <span
            className={`header__hamburger-bar ${!showoptions && "header__hamburger-bar_active"}`}
            aria-hidden="true"
          ></span>
          <span
            className={`header__hamburger-bar ${!showoptions && "header__hamburger-bar_active"}`}
            aria-hidden="true"
          ></span>
        </button>
      )}
      {isLoggedIn ? (
        <div
          className={`header__container ${showoptions && "header__container-options_active"}`}
        >
          <p className="header__title header__title-email">{`${email}`}</p>
          <button className="header__logout-btn" onClick={signout}>
            Sair
          </button>
        </div>
      ) : (
        <p className="header__title">
          {location.pathname === "/signin" ? "Entrar" : "Cadastrar"}
        </p>
      )}
    </header>
  );
}
