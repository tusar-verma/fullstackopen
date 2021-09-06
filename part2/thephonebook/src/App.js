import React, { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

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

    if (persons.some((person)=> person.name === newName)){
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