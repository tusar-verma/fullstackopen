import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({evHandler}) => (
  <p>Search: <input onChange={evHandler}/></p>
)

const Form = (props) => (
  <form>
    <div>
      name: <input value={props.newName} onChange={props.newNameInput}/>
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.newNumberInput}/>
    </div>
    <div>
      <button type="submit" onClick={props.addPerson} >add</button>
    </div>
  </form>
)

const Persons = (props) => (
  props.personsToShow.map((person) => <p key={person.name}>{person.name} - {person.number}</p>)
)  


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect( () => {
    const promise = axios.get("http://localhost:3001/persons")
    promise.then(response => {
      setPersons(response.data)
    })
  }, [])

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const newNameInput = (event) => {
    setNewName(event.target.value)
  }

  const newNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const searchEventHandler = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some( person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Search evHandler={searchEventHandler}/>
      <h2>Add new person</h2>
        <Form newName={newName}  newNameInput={newNameInput}
              newNumber={newNumber} newNumberInput={newNumberInput}
              addPerson={addPerson}
        />
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App