import { useEffect, useState } from 'react'
import '../css/Quiz.css'

function Quiz({ handleChoice, quiz }) {  

    const questionElements = quiz?.map((question, index) => {
        const answersElements = question.answers.map((answer, index) => {
            return(
                <button 
                    className={`answer-button ${answer.selected ? 'answer-selected' : ''}`}
                    onClick={() => handleChoice(answer.id)}
                    key={answer.id}
                >
                    {answer.text}
                </button>
            )
        })
        return(
            <div key={question.id} className='quiz-question'>
                <p>{question.question}</p>
                <div className='quiz-answers'>
                    {answersElements}
                </div>
            </div>
        )})
    
  return (
    <section className='quizzical-quiz'>
        {questionElements}
    </section>
  )
}

export default Quiz
