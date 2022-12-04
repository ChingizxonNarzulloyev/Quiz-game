// import axios from 'axios'
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy'
  })
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
  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const inn = oldIndex + 1;
      if (questions.length -1 < inn) {
        setIsOpenModal(true);
        return 0
      } else {
        return inn;
      }
    });
  };
  const closeModal = ()=> {
    setIsOpenModal(false)
    setWaiting(true)
    setCorrect(0)
  }
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
  const handleChange = (e)=> {
    const name = e.target.name
    const value = e.target.value
    setQuiz({
      ...quiz,
      [name]: value
    })
  }
  const handleSubmit = (e)=> {
    e.preventDefault()
    const url = `${API_ENDPOINT}amount=${quiz.amount}&category=${table[quiz.category]}&type=multiple`
    fetchData(url)
  }
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
        isOpenModal,
        closeModal,
        quiz,
        handleChange,
        handleSubmit
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
