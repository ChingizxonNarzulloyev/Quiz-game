import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const { loading, questions, waiting, correct, index, nextQuestion, javob, isOpenModal } =
    useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (waiting) {
    return <SetupForm />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers];
  const randomQuestions = Math.round(Math.random()*4)
  if(randomQuestions === 3) {
    answers.push(correct_answer)
  } else {
    let zz = answers[randomQuestions] 
    answers[randomQuestions] = correct_answer
    answers.push(zz)
  }
  return (
    <main>
      {isOpenModal && <Modal/>}
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  onClick={() => javob(answer === correct_answer)}
                  key={index}
                  className="answer-btn"
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </article>
        <button onClick={() => nextQuestion()} className="next-question">
          next question
        </button>
      </section>
    </main>
  );
  return <h2>quiz starter</h2>;
}

export default App;
