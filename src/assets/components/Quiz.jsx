import { useEffect, useState } from 'react'
import '../css/Quiz.css'

function Quiz({ handleChoice, quiz, stage }) {

  const questionElements = quiz?.map((question, index) => {
    const answersElements = question.answers.map((answer, index) => {
      let addedClass = ""
      if (stage === "final" && answer.selected && answer.correct) {
        addedClass = "answer-correct"
      } else if (stage === "final" && !answer.selected && answer.correct) {
        addedClass = "actual-answer"
      } else if (answer.selected) {
        addedClass = "answer-selected"
      }
      return (
        <button
          className={`answer-button ${addedClass}`}
          onClick={() => handleChoice(answer.id)}
          key={answer.id}
        >
          {answer.text}
        </button>
      )
    })
    return (
      <div key={question.id} className='quiz-question'>
        <h3 className='question-text'>{question.question}</h3>
        <div className='quiz-answers'>
          {answersElements}
        </div>
      </div>
    )
  })

  return (
    <section className='quizitive-quiz'>
      {questionElements}
    </section>
  )
}

export default Quiz
