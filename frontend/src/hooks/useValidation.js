import { useState } from "react";

export default function useValidation() {
  const [textError, setTextError] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleValidation = (evt) => {
    if (evt.target.name === "name") {
      setNameError(evt.target.validationMessage); //native message for validation
    } else if (evt.target.name === "link") {
      setLinkError(evt.target.validationMessage);
    } else {
      //setTextError is applied to any input type other than link and name.
      setTextError(evt.target.validationMessage);
    }
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const resetMessageError = () => {
    if (textError) setTextError("");
    if (linkError) setLinkError("");
    if (nameError) setNameError("");
  };

  return {
    textError,
    nameError,
    linkError,
    handleValidation,
    resetMessageError,
    isValid,
    setIsValid,
  };
}
