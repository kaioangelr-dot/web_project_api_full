import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Api } from "./../utils/api";
import { useState, useEffect } from "react";

import useValidation from "../hooks/useValidation";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import * as auth from "../utils/auth";
import IsAuthorized from "./InfoToolTip/components/IsAuthorized";
import IsNotAuthorized from "./InfoToolTip/components/IsNotAuthorized";
import { setToken, getToken } from "../utils/token";
import Spinner from "./spinner/spinner";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { setIsValid, resetMessageError } = useValidation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const jwt = getToken();

  const api = new Api({
    baseUrl: "https://api.around-us.chickenkiller.com",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });

  //----------------------------------------------- close and open popup --------------------------------------------------------
  useEffect(() => {
    if (!popup) return;

    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        handleClosePopup();
      }
    };

    const handleOverlayClose = (evt) => {
      if (evt.target.classList.contains("popup")) {
        handleClosePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleOverlayClose);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleOverlayClose);
    };
  }, [popup]);

  function handleOpenPopup(popup) {
    setPopup(popup);

    setIsValid(false);
  }

  function handleClosePopup() {
    setPopup(null);

    resetMessageError();
  }

  //------------------------------------------------------- api calls -------------------------------------------------------------
  const handleGetUserData = () => {
    setIsLoading(true);

    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.error(error));

    api
      .getUserLogin()
      .then((data) => {
        setEmail(data.email);
        navigate("/");
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
      });

    api
      .getInitialCards()
      .then((data) => {
        setCards([...data].reverse());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!jwt) {
      return console.log("no token found");
    }

    (async () => {
      await handleGetUserData();
    })();
  }, []);

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    (async () => {
      await api
        .editUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    })();
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    (async () => {
      await api
        .editAvatar(data.avatar)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    })();
  };

  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true);
    (async () => {
      await api
        .addNewCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          handleClosePopup();
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    })();
  };

  async function handleCardLike(isLiked, cardId) {
    await api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === cardId ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  //------------------------------------------------------- authorization -------------------------------------------------------------

  const popupIsAuthorized = {
    children: <IsAuthorized />,
  };

  const popupIsNotAuthorized = {
    children: <IsNotAuthorized />,
  };

  const handleSignup = (email, password) => {
    auth
      .signup(email, password)
      .then(() => {
        handleOpenPopup(popupIsAuthorized);
      })
      .catch(() => {
        handleOpenPopup(popupIsNotAuthorized);
        console.error;
      });
  };

  const handleSignin = (email, password) => {
    auth
      .signin(email, password)
      .then((data) => {
        setToken(data.token);
        handleGetUserData();
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch(() => {
        handleOpenPopup(popupIsNotAuthorized);
        console.error;
      });
  };

  //------------------------------------------------------- markup -------------------------------------------------------------
  return (
    <div className="page__content">
      {isLoading && !isLoggedIn ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <CurrentUserContext.Provider
          value={{
            isLoading,
            currentUser,
            handleUpdateUser,
            handleUpdateAvatar,
            handleAddPlaceSubmit,
          }}
        >
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            email={email}
          />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} email={email}>
                  <Main
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    popup={popup}
                    cards={cards}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signin"
              element={
                <ProtectedRoute anonymous isLoggedIn={isLoggedIn}>
                  <Login
                    popup={popup}
                    handleClosePopup={handleClosePopup}
                    handleSignin={handleSignin}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <ProtectedRoute anonymous isLoggedIn={isLoggedIn}>
                  <Register
                    popup={popup}
                    handleClosePopup={handleClosePopup}
                    handleSignup={handleSignup}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
              }
            />
          </Routes>

          {isLoggedIn && <Footer />}
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}
