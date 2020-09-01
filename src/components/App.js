import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import '../index.css'

const Filter = ({ newSearch, handleFilter }) => {
  return (
    <form>
    filter shown with
    <input
    value={newSearch}
    onChange={handleFilter}/>
  </form>
  )
};

const PersonForm = ({ updateInfo, handleNameChange, newName, handleNumberChange, newNumber }) => {
  return (
    <div>
      <form onSubmit={updateInfo}>
      name: <input
        onChange={handleNameChange}
        value={newName}/>
      </form>
      <form onSubmit={updateInfo}>
      number: <input
        onChange={handleNumberChange}
        value={newNumber}
        type="text"
        name="option"/>

      <button type="submit">add</button>
      </form>
    </div>
  )
};

const Persons = ({ infoToShow, persons, removePerson }) => {
  return (
    <div>
    {infoToShow.map((info) => {
      return <div key={info.id}>
              <span>{info.name} {info.number} </span>
              <button onClick={() => removePerson(info.id, info.name)} id={info.id}>delete</button>
             </div>
      })}
</div>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch] = useState('')
  const [ showAll, setShowAll ] = useState(undefined);
  const [responseMessage, setResponseMessage] = useState('');

  const hook = () => {
    personService
      .getAll()
      .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    
  };

  const updateInfo = (e) => {

    e.preventDefault();

    const foundName =
      persons
        .findIndex(person => person
          .name === newName
          .split(' ')
          .map(s => s.charAt(0)
          .toUpperCase() + s
          .substr(1))
          .join(' '));

    const foundNumber =
      persons
        .findIndex(person => person
          .number === newNumber);

    if( foundName === -1 && foundNumber === -1){

      const newInfo = {
        name: newName
        .split(' ')
        .map(s => s
          .charAt(0)
          .toUpperCase() + s
          .substr(1))
          .join(' '),
        number: newNumber
        };

      personService
        .create(newInfo)
        .then(response => {
          setPersons(persons.concat(response.data))
          setResponseMessage(`${response.data.name} added`)
          setTimeout(() => {
            setResponseMessage('')
          }, 5000)
          setNewName('')
          setNewNumber('')
          const some = response.data;
          return some
        })


    } else if (foundName > -1 && persons[foundName].number !== newNumber) {
      const person = persons[foundName];
      const id = persons[foundName].id;
      const updatedPerson = {
        ...person, number: newNumber
      }

      personService
        .update(id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map((person) => {
            return person.id ? person : returnedPerson;
          }))

        setResponseMessage(`${person.name}'s number changed!`)
        setTimeout(() => {
          setResponseMessage('')
        }, 5000)
          
          setNewName('')
          setNewNumber('')
        })
    } else
    
    {
      console.log(persons[foundName])
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }; 
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  };


  const handleFilter = (e) => {
    setNewSearch(e.target.value)

    const found = 
    persons
      .findIndex(person => person
        .name
        .includes(newSearch
          .split(' ')
          .map(s => s
            .charAt(0)
            .toUpperCase() + s
            .substr(1))
            .join(' ')));

    if(found === -1) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }

  };

  const infoToShow = showAll ? persons.filter(person => person.name.includes(newSearch.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ')) || person.name.includes(newSearch)) : persons;

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter((person) => {
          return person.id !== id
        }))
      })
    } else {
      return;
    }

  }


  return (
    <div>

      <div className="response" >{responseMessage}</div>

      <h1>Phonebook</h1>

      <Filter newSearch={newSearch} handleFilter={handleFilter}/>

      <h3>add a new</h3>

      <PersonForm updateInfo={updateInfo} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>

      <h3>Numbers</h3>

      <Persons removePerson={removePerson} infoToShow={infoToShow} persons={persons}/>

    </div>
  )
}

export default App