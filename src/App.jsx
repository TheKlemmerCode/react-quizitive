import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import './assets/css/App.css'
import Quiz from './assets/components/Quiz';
import QuizitiveButton from './assets/components/QuizitiveButton';
import QuizLoader from './assets/components/QuizLoader';

function App() {
  const localStage = localStorage.getItem("stage")
  const localQuiz = localStorage.getItem("quiz")
  const [loading, setLoading] = useState(false);
  // stages = "initial" / "quiz" / "final"
  const [stage, setStage] = useState(localStorage.getItem("stage") || "initial")
  const [score, setScore] = useState(0)
  const [quiz, setQuiz] = useState(stage !== "initial" ? JSON.parse(localStorage.getItem("quiz")) || [] : [])

  useEffect(() => {
    localStorage.setItem("quiz", JSON.stringify(quiz))
  }, [quiz])

  useEffect(() => {
    localStorage.setItem("stage", stage)
  }, [stage])

  async function fetchQuiz() {
    setLoading(true);

    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
    );

    const data = await response.json();

    const questions = await data?.results.map((result) => ({
      question: decodeEntities(result.question),
      id: nanoid(),
      answers: transformAnswers(result)
    }))

    setQuiz(questions);
    setLoading(false);
  }

  function handleChoice(answerId) {
    if (stage === "quiz") {
      let questionId = quiz.find(question => question.answers.find(answer => answer.id === answerId)).id
      setQuiz(oldQuiz => oldQuiz.map((question) => {
        if (question.id === questionId) {
          return ({
            ...question,
            answers: question.answers.map((answer) => ({
              ...answer,
              selected: answer.id === answerId ? !answer.selected : false
            }))
          })
        }
        return (question);
      }))
    }
  }

  function buttonBegin() {
    setStage("quiz");
    fetchQuiz();
  }

  function buttonGrade() {
    const score = totalScore();
    setScore(score);
    setStage("final")
  }


  function transformAnswers(quiz) {
    let answers = [
      ...quiz.incorrect_answers.map((answer => ({
        text: decodeEntities(answer),
        id: nanoid(),
        selected: false,
        correct: false
      }))),
      {
        text: decodeEntities(quiz.correct_answer),
        id: nanoid(),
        selected: false,
        correct: true
      }
    ]
    return shuffleArray(answers);
  }

  function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt|eacute);/g;
    var translate = {
      "nbsp": " ",
      "amp": "&",
      "quot": "\"",
      "lt": "<",
      "gt": ">",
      "eacute": "é"
    };
    return encodedString.replace(translate_re, function (match, entity) {
      return translate[entity];
    }).replace(/&#(\d+);/gi, function (match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
  }

  function totalScore() {
    let total = 0
    quiz.map((question) => {
      question.answers.map((answer) => {
        if (answer.selected && answer.correct) {
          total++
        }
      })
    })
    return total;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  return (
    <div className='quizitive-app'>
      {loading &&
        <QuizLoader />
      }
      {!loading && stage === "initial" &&
        <section className='quizitive-initial'>
          <h2 className='initial-header'>Quizitive</h2>
          <div class="quote">
            <blockquote>
              <p>There is much pleasure to be gained from useless knowledge.</p>
              <cite>Bertrand Russell</cite>
            </blockquote>
          </div>
          {/* <p className='initial-description'>Some sort of description</p> */}
        </section>
      }
      {!loading && quiz && stage !== "initial" &&
        <Quiz
          quiz={quiz}
          stage={stage}
          handleChoice={handleChoice}
        />
      }
      {!loading &&
        <div className='quiz-footer'>
          {stage === "final" &&
            <span className='score-text'>{`You Scored ${score} / 5 Correct Answers`}</span>
          }
          <QuizitiveButton
            buttonBegin={buttonBegin}
            buttonGrade={buttonGrade}
            buttonNew={buttonBegin}
            stage={stage}
          />
        </div>
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
