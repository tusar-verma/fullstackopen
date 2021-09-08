import axios from "axios";
const url = "http://localhost:3001/persons/"

const getAllPersons = () => {
    return(
        axios
            .get(url)
            .then(response => {
                return(response.data)
            })
    )
}

const addPerson = (newPerson) => {
    return(
        axios
            .post(url, newPerson)
            .then(response => {
                return(response.data)
            })
    )
}

const deletePerson = (personId) => {

    axios.delete(`${url}/${personId}`)
    return(personId)
}

const updateNumber = (person) => {
    return(
        axios
            .put(`${url}/${person.id}`, person)
            .then(response => {
                return(response.data)
            })
    )
}

const personService = {getAllPersons, addPerson, deletePerson, updateNumber}
export default personService