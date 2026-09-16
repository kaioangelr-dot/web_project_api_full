export default function ImagePopup(props) {
  const { link, name } = props.card;
  return (
    <>
      <img alt="" className="popup__image" src={link} />
      <p className="popup__caption">{name}</p>
    </>
  );
}
