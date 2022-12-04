import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { isOpenModal, correct, index, questions, closeModal } = useGlobalContext();

  return (
    <div className={isOpenModal ? "modal-container isOpen" : ""}>
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>You answered {`${((correct / questions.length)*100).toFixed(2)}`}% of questions correctly</p>
        <button onClick={()=> closeModal()} className="close-btn">play again</button>
      </div>
    </div>
  );
};

export default Modal;
