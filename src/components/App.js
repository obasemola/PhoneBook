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
  const [ foundPerson, setFoundPerson ] = useState(undefined);
  const [responseMessage, setResponseMessage] = useState('');
  const [ nameOfClass, setnameOfClass] = useState('');

  const hook = () => {
    personService
      .getAll()
      .then(response => {
      setPersons(response.data)
    })
  };

  useEffect(hook, []);


  const handleNameChange = (e) => {
    setNewName(e.target.value);
    
  };


  const makeFirstCharactersUppercase = (entry) => {
    return entry
      .split(' ')
      .map(s => s.charAt(0)
      .toUpperCase() + s
      .substr(1))
      .join(' ')
  };


  const hideNotification = () => {
    return setTimeout(() => {
            setResponseMessage('')
            setnameOfClass('')
          }, 5000)
  };


  const updatePhoneNumber = (id, updatedPerson, person) => {

    return personService
    .update(id, updatedPerson)
    .then(response => {
      setPersons(persons.map(person => person.id === id ? response.data : person));

    setnameOfClass('response')
    setResponseMessage(`${person.name}'s number changed!`)
    hideNotification();
    setNewName('')
    setNewNumber('')
    })
    .catch(error => {

      setnameOfClass('error')
      setResponseMessage(`${person.name} has been deleted!`)
      hideNotification();
      
    })
  };


  const createNewEntry = (newInfo) => {
    return personService
            .create(newInfo)
            .then(response => {
              setPersons(persons.concat(response.data))
              setnameOfClass('response')
              setResponseMessage(`${response.data.name} added`)
              hideNotification();
              setNewName('')
              setNewNumber('')
            })
  };


  const updateInfo = (e) => {
    e.preventDefault();

    const foundName = persons.findIndex(person => person.name === makeFirstCharactersUppercase(newName));

    const foundNumber = persons.findIndex(person => person.number === newNumber);

    if( foundName === -1 && foundNumber === -1){

      const newInfo = {
        name: makeFirstCharactersUppercase(newName),
        number: newNumber
        };

      createNewEntry(newInfo);


    } else if (foundName > -1 && persons[foundName].number !== newNumber) {

      if (window.confirm(`${persons[foundName].name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons[foundName];
        const id = persons[foundName].id;
        const updatedPerson = {
          ...person, number: newNumber
        }

        updatePhoneNumber(id, updatedPerson, person);

      } else {
        setNewName('')
        setNewNumber('')
      }
      
    } else
    
    {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }; 
  };


  const handleNumberChange = (e) => {
    const typed = e.target.value;
    setNewNumber(typed)
  };


  const handleFilter = (e) => {
    const typed = e.target.value;
    setNewSearch(typed)

    const found = 
    persons.findIndex(person => person.name.includes(makeFirstCharactersUppercase(newSearch)));


    const result = found !== -1;
    setFoundPerson(result)

  };


  const infoToShow = foundPerson ? persons.filter(person => person.name.includes(makeFirstCharactersUppercase(newSearch)) || person.name.includes(newSearch)) : persons;


  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    } else {
      return;
    }

  }


  return (
    <div>

      <div className={nameOfClass}>{responseMessage}</div>

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