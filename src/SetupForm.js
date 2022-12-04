import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form onSubmit={handleSubmit} className="setup-form">
          <h2>Setup quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
            name="amount"
              type="number"
              className="form-input"
              id="amount"
              value={quiz.amount}
              min="1"
              max="50"
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              value={quiz.category}
              className="form-input"
              onChange={handleChange}
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              value={quiz.difficulty}
              className="form-input"
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <button  type="submit" className="submit-btn">
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
