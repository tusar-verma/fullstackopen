import React, { useState } from 'react'

const Button = ({handleClick, text}) => (  
  <button onClick={handleClick}>
    {text}
  </button>
)

const Tittle = ({text}) => (
  <h1>{text}</h1>
)

const Statistic = ({good, neutral, bad, totalVotes}) => { 
  if (totalVotes === 0) {
    return (
      <p><strong>No feedback given</strong></p>
    )
  }
  return (
    <div>        
      <StatisticLine name="good" value={good}/>
      <StatisticLine name="neutral" value={neutral}/>
      <StatisticLine name="bad" value={bad}/>
      <StatisticLine name="all" value={totalVotes}/>  
      <StatisticLine name="average" value={(good-bad)/totalVotes}/>  
      <StatisticLine name="positive" value={(good/totalVotes)*100 + " %" }/>
    </div>
  )
}
const StatisticLine = ({name, value}) => {
  return (    
    <table>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
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

  let totalVotes = good + neutral + bad

  return (
    <div>
      <Tittle text="give feedback"/>
      <Button handleClick={() => handleClick(setGood, good+1)} text="good"/>
      <Button handleClick={() => handleClick(setNeutral, neutral+1)} text="neutral"/>
      <Button handleClick={() => handleClick(setBad, bad+1)} text="bad"/>
      <Tittle text="statistics"/>
      <Statistic good={good} neutral={neutral} bad={bad} totalVotes={totalVotes} />
    </div>
  )
}


export default App
