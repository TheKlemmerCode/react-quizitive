import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import './assets/css/App.css'
import Quiz from './assets/components/Quiz';

function App() {
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("initial")
  const [quiz, setQuiz] = useState()


  function handleChoice(id) {
    let questionId = quiz.find(question => question.answers.find(answer => answer.id === id)).id
    setQuiz(oldQuiz => oldQuiz.map((question) => {
      if (question.id === questionId) {
        console.log(question)
        return({
          ...question,
          answers: question.answers.map((answer) => {
            if (answer.id === id) {
              return (
                {
                  ...answer,
                  selected: true
                }
              )
            } else {
              return (
                {
                  ...answer,
                  selected: false
                }
              )
            }
          })
        })
      } else {
        return (question);
      }
    }))
  }

  useEffect(() => {
   console.log(quiz);
  }, [quiz])

  async function fetchQuiz() {
    setLoading(true);

    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
    );

    const data = await response.json();

    const questions = data?.results.map((result) => ({
      question: result.question,
      id: nanoid(),
      answers: [
        ...result.incorrect_answers.map((answer => ({
          text: answer,
          id: nanoid(),
          selected: false,
          correct: false
        }))), 
        {
            text: result.correct_answer,
            id: nanoid(),
            selected: false,
            correct: true
        }
      ]
    }))

    setQuiz(questions);

    setStage("quiz");

    setLoading(false);
  } 

  return (
    <div className='quizzical-app'>
      {!loading && !quiz && stage === "initial" &&
        <section className='quizzical-initial'>
          <h2 className='initial-header'>Quizzical</h2>
          <p className='initial-description'>Some sort of description</p>
          <button 
            className='quizzical-button'
            onClick={fetchQuiz}
            >
            Start Quiz
          </button>
        </section>
      }
      {!loading && quiz && stage === "quiz" &&
        <Quiz quiz={quiz} handleChoice={handleChoice} />
      }

      <div className="top-circle-container">
        <div className='top-circle' />
      </div>

      <div className="bottom-circle-container">
        <div className='bottom-circle' />
      </div>

    </div>
  )
}

export default App
