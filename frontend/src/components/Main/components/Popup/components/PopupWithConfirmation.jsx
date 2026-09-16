export default function ConfirmationPopup(props) {
  const { onDelete } = props;
  return (
    <>
      <button className="button popup__button" type="submit" onClick={onDelete}>
        Sim
      </button>
    </>
  );
}
