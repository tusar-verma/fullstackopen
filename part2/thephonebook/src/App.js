import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas', 
      number: '000'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const newNameInput = (event) => {
    setNewName(event.target.value)
  }

  const newNumberInput = (event) => {
    setNewNumber(event.target.value)
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
      <form>
        <div>
          name: <input value={newName} onChange={newNameInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={newNumberInput}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson} >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map( (person) => <p key={person.name}>{person.name} - {person.number}</p>)}
    </div>
  )
}

export default App