import { useState } from 'react'
import './assets/css/App.css'

function App() {

  return (
    <div className='quizzical-app'>
      <section className='quizzical-initial'>
        <h2 className='initial-header'>Quizzical</h2>
        <p className='initial-description'>Some sort of description</p>
        <button className ='quizzical-button'>Start Quiz</button>
      </section>
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
