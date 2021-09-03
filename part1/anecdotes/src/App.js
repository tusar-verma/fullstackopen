import React, { useState } from 'react'

const Button = ({handler, text}) => (
  <button onClick={handler}>
    {text}
  </button>  
)

const Tittle = ({text}) => (
  <h1>{text}</h1>
)

const Anecdote = ({text, votes}) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Uint8Array(anecdotes.length))
  
  const buttonNextHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const buttonVoteHandler = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVote(copyVotes)
  }

  let indexMostVotes = votes.indexOf(Math.max(...votes))
  
  return (
    <div>
      <Tittle text="Anecdote of the day"/>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handler={buttonVoteHandler} text={"vote"}/>
      <Button handler={buttonNextHandler} text={"next anecdote"}/>
      <Tittle text="Anecdote with most votes"/>
      <Anecdote text = {anecdotes[indexMostVotes]} votes={votes[indexMostVotes]} />
    </div>
  )
}

export default App