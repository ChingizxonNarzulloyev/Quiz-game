// import axios from 'axios'
import React, { useState, useContext, useEffect } from "react";


const term_url = "https://opentdb.com/api.php?amount=4";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const fetchData = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        setQuestions(data.results);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    fetchData(term_url);
  }, []);
  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const inn = oldIndex + 1;
      if (questions.length - 1 < inn) {
        setIsOpenModal(true);
        return 0
      } else {
        return inn;
      }
    });
  };
  const javob = (value) => {
    setCorrect((oldCorrect) => {
      const cor = oldCorrect + 1;
      if (value) {
        return cor;
      } else {
        return oldCorrect;
      }
    });
    nextQuestion()
  };
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        correct,
        index,
        error,
        nextQuestion,
        javob,
        isOpenModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
