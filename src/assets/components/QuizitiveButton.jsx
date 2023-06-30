import { useEffect, useState } from 'react'
import '../css/QuizitiveButton.css'

function QuizitiveButton({ buttonNew, buttonBegin, buttonGrade, stage }) {
  let handleClick
  let buttonText
  switch (stage) {
    case "initial":
      handleClick = buttonBegin;
      buttonText = "Start Quiz"
      break;
    case "quiz":
      handleClick = buttonGrade;
      buttonText = "Check Answers"
      break;
    case "final":
      handleClick = buttonNew;
      buttonText = "New Quiz"
      break;
    default:
      handleClick = () => { };
      buttonText = ""
      break;
  }
  return (
    <button
      className='quizitive-button'
      onClick={handleClick}
    >
      {buttonText}
    </button>
  )
}

export default QuizitiveButton
