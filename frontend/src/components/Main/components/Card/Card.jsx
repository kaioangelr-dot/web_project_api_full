import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import ConfirmationPopup from "../Popup/components/PopupWithConfirmation/PopupWithConfirmation";

export default function Card(props) {
  const { name, link, isLiked, owner } = props.card;
  const { onOpenPopup, onClosePopup, onCardLike, onCardDelete, currentUser } = props; /* prettier-ignore */
  const imageComponent = {
    children: <ImagePopup card={props.card} />,
  };

  const deleteConfirmation = {
    title: "Tem certeza?",
    children: <ConfirmationPopup onDelete={handleDeleteClick} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(props.card);
  }

  function handleDeleteClick() {
    onCardDelete(props.card);
    onClosePopup();
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt=""
        onClick={() => onOpenPopup(imageComponent)}
      />
      {/* add the delete btn if the current user is the card owner */}
      {currentUser._id === owner && (
        <button
          aria-label="Delete Card"
          className="card__delete-button"
          type="button"
          onClick={() => onOpenPopup(deleteConfirmation)}
        ></button>
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like Card"
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
