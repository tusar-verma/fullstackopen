import React, {useState, useEffect} from "react";
import axios from 'axios'

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
      <h3>Languages</h3>
        <ul>
          {country.languages.map( language => (
            <li key={language.iso639_2}>{language.name}</li>
          ))}          
        </ul>
      <img src={country.flag} width={250} height={150}/>
    </div>

  )
}

const Display = ({data, buttonHandler}) => {
  if (data.length > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if (data.length === 1){
    return (
        <Country country={data[0]}/>
    )
  }else {
    return (
      data.map(country => (
        <div key={country.alpha3Code}>
          {country.name}  <button id={country.name} type="submit"  onClick={buttonHandler}>show</button>
        </div>
      ))
    )
  }

}

const App = () => {
  const [ filter, setFilter] = useState('')
  const [ data, setData] = useState([])

  useEffect( () => (
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setData(response.data)
      })
  ),[])
  const inputHandler = (event) => {
    setFilter(event.target.value)
  }

  const showButtonHandler = (event) => {
    event.preventDefault()
    setFilter(event.target.id)
  }

  const dataToShow = filter === '' ? data : data.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return(
    <div>
      find countries <input value={filter} onChange={inputHandler} />
      <Display data={dataToShow} buttonHandler={showButtonHandler} />
    </div>
  )
}

export default App;
