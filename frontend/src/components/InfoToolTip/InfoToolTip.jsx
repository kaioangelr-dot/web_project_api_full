export default function InfoToolTip(props) {
  const { handleClosePopup, children } = props;
  return (
    <div className="popup">
      <div className={`popup__content`}>
        <button aria-label="Close Modal" className="popup__close" type="button" onClick={handleClosePopup}></button>
        {children}
      </div>
    </div>
  );
}
