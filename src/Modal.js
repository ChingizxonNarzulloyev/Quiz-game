import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { isOpenModal, correct, index } = useGlobalContext();

  return (
    <div className={isOpenModal ? "modal-container isOpen" : ""}>
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>You answered {correct / index *100}% of questions correctly</p>
        <button className="close-btn">play again</button>
      </div>
    </div>
  );
};

export default Modal;
