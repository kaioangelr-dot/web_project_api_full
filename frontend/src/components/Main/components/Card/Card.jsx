import ImagePopup from "../Popup/components/ImagePopup";
import ConfirmationPopup from "../Popup/components/PopupWithConfirmation";

export default function Card(props) {
  const { name, link, likes, owner, _id: cardId } = props.card;
  const { onOpenPopup, onClosePopup, onCardLike, onCardDelete, currentUser } = props; /* prettier-ignore */
  const currentUserId = currentUser._id;
  const isLiked = likes.some((user) => user === currentUserId);
  const imageComponent = {
    children: <ImagePopup card={props.card} />,
  };

  const deleteConfirmation = {
    title: "Tem certeza?",
    children: <ConfirmationPopup onDelete={handleDeleteClick} />,
  };

  const cardLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_is-active" : ""}`;

  function handleLikeClick() {
    onCardLike(isLiked, cardId);
  }

  function handleDeleteClick() {
    onCardDelete(props.card);
    onClosePopup();
  }

  return (
    <li className="card">
      <img className="card__image" src={link} alt="" onClick={() => onOpenPopup(imageComponent)} />
      {/* add the delete btn if the current user is the card owner */}
      {currentUserId === owner && (
        <button
          aria-label="Delete Card"
          className="card__delete-button"
          type="button"
          onClick={() => onOpenPopup(deleteConfirmation)}
        ></button>
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <span className="card__like-counter">{likes.length > 0 ? likes.length : ""}</span>
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
