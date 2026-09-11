import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import useValidation from "../../../../../../hooks/useValidation";

export default function EditAvatar() {
  const inputRef = useRef();
  const { handleUpdateAvatar, isLoading } = useContext(CurrentUserContext);

  const { handleValidation, linkError, isValid } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          className={`popup__input ${linkError && "popup__input_type_error"}`}
          name="link"
          id="link-avatar"
          placeholder="Link de Imagem"
          ref={inputRef}
          required
          type="url"
          onChange={handleValidation}
        />
        <span
          id="link-avatar-input-error"
          className={`popup__input-error ${!isValid && "popup__input-error_active"}`}
        >
          {linkError}
        </span>
      </label>
      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
