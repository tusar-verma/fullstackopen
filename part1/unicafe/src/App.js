import React, { useState } from 'react'

const Button = ({handleClick, text}) => (  
  <button onClick={handleClick}>
    {text}
  </button>
)

const Tittle = ({text}) => (
  <h1>{text}</h1>
)

const Statistic = ({name, value}) => { 
  return (
    <p>{name}: {value}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (stateFunc, value) => {
    stateFunc(value)
  }
  console.log(good)
  return (
    <div>
      <Tittle text="give feedback"/>
      <Button handleClick={() => handleClick(setGood, good+1)} text="good"/>
      <Button handleClick={() => handleClick(setNeutral, neutral+1)} text="neutral"/>
      <Button handleClick={() => handleClick(setBad, bad+1)} text="bad"/>
      <Tittle text="statistics"/>
      <Statistic name="good" value={good}/>
      <Statistic name="neutral" value={neutral}/>
      <Statistic name="bad" value={bad}/>
    </div>
  )
}


export default App
