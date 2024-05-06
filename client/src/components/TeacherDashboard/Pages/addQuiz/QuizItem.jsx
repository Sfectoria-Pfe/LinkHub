import React, { useContext } from "react";
import quizContext from "../../context/quizContext";


const Quizitem = (props) => {
const context = useContext(quizContext);
const { deleteQuiz } = context;
  const { quiz, updateQuiz } = props;
  return (
    <div className="col-md-6 gx-1">
      <div className="my-3 card">
        <div className="card-body">
          <h5 className="card-title">{quiz.question}</h5>
          <div className="row gx-2">
            <div className="col">
              <ul><li>{quiz.option1}</li></ul>
            </div>
            <div className="col">
            <ul><li>{quiz.option2}</li></ul>
            </div>
            <div className="col">
            <ul><li>{quiz.option3}</li></ul>
            </div>
            <div className="col">
            <ul><li>{quiz.option4}</li></ul>
            </div>
          </div>
          <div className="my-1 row">
            <div className="col">Answer is : {quiz.answer}</div>
          </div>
          <div className="my-1 row">
            <div className="col">Is the question type MCQ : {quiz.mcq}</div>
          </div>
          <div className="my-1 row">
            <div className="col">Title : {quiz.title}</div>
          </div>
          <i className="mx-2 fa-solid fa-trash" onClick={()=>{deleteQuiz(quiz._id); props.showAlert("deleted successfully","success")}}></i>
          <i className="mx-2 fa-solid fa-file-pen" onClick={()=>{updateQuiz(quiz)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Quizitem;