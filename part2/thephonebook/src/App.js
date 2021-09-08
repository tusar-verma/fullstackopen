import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

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

const Persons = ({personsToShow, buttonHandler}) => (
  personsToShow.map((person) => (
    <p key={person.name}>
      {person.name} - {person.number} <button onClick={buttonHandler(person)}>delete</button>
    </p>
  ))
)  

const Notification = ({message, succesful}) => {
  if (message === '') {
    return null
  }
  if (succesful) {    
    return (
      <div className="succesful">
        Added {message}
      </div>
    )
  }else{
    return (
      <div className="error">
        Information of {message} has already been removed from server
      </div>
    )
  }
}


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notificationMsg, setNotificationMsg] = useState('')

  useEffect(() => {
    personService
      .getAllPersons()
      .then(personsFromServer =>{
        setPersons(personsFromServer)
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


  const deleteHandlerGenerator = (person) => {
    return (() =>  {
      if (window.confirm(`delete ${person.name}`)){
        personService.deletePerson(person.id)
        const newPersons = persons.filter(personas => {
          return (personas.id !== person.id)
        })
        setPersons(newPersons)
      }
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.find( person => person.name === newName)
    if (personExists !== undefined){
      if (personExists.number === newNumber){
        window.alert(`${newName} is already added to phonebook`)
      } else if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .updateNumber({...personExists, number: newNumber })
          .then(personModified => {
            setPersons(persons.map(person =>{
              return(person.id === personModified.id ? personModified : person)
            }))
            setNotificationMsg(personModified.name, true)
            setTimeout(()=>setNotificationMsg(''),3000)
          })
          .catch(reason => {
            setNotificationMsg(personExists.name, false)
            setTimeout(()=>setNotificationMsg(''),3000)
          })
      }
    }else{
      const newPerson = {name: newName, number: newNumber}
      personService
        .addPerson(newPerson)
        .then(personAdded => {
          setPersons(persons.concat(personAdded))          
          setNotificationMsg(personAdded.name, true)
          setTimeout(()=>setNotificationMsg(''),3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Search evHandler={searchEventHandler}/>
      <h2>Add new person</h2>
        <Notification message={notificationMsg}/>
        <Form newName={newName}  newNameInput={newNameInput}
              newNumber={newNumber} newNumberInput={newNumberInput}
              addPerson={addPerson}
        />
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} buttonHandler={deleteHandlerGenerator} />
    </div>
  )
}

export default App