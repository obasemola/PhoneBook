import React, { useState, useEffect } from 'react'
import axios from 'axios'
<<<<<<< HEAD

const App = () => {
  const [ country, setCountry ] = useState('');
  const [ countriesInfo, setCountriesInfo ] = useState([]);
  const [ dataResponse, setDataResponse ] = useState([]);
  const [ dataDisplayed, setDataDisplayed ] = useState('')
  const [ weather, setWeather ] = useState({})
  const [ location, setLocation ] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountriesInfo(response.data)
      })
    handleCountryChange()
  }

  const getWeather = () => {
    axios
      .get('http://api.weatherstack.com/current', {
      params: {
        access_key: process.env.REACT_APP_API_KEY,
        query: location
      }})
      .then(response => {
      if (location) {
        const cityWeather = {
          temperature: response.data.current.temperature,
          icon: response.data.current.weather_icons[0],
          speed: response.data.current.wind_speed,
          direction: response.data.current.wind_dir
        }
        setWeather(cityWeather)
      } else {
        return;
      }

    })
  }


  const handleCountryChange = () => {

    const found = countriesInfo.findIndex(countryInfo => countryInfo.name.includes(country
=======
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
>>>>>>> 8525f2290cb3c2147e23a3f11eb011dbc9d17c27
      .split(' ')
      .map(s => s.charAt(0)
      .toUpperCase() + s
      .substr(1))
<<<<<<< HEAD
      .join(' ')))

    if( found === -1 ) {
      return;
    }
    else if ( found > -1 ) {
      const updatedCountry = countriesInfo.filter(countryInfo => countryInfo.name.includes(country
        .split(' ')
        .map(s => s.charAt(0)
        .toUpperCase() + s
        .substr(1))
        .join(' ')))
      setDataResponse(updatedCountry)

    }
 

    if ( dataResponse.length >  10 ) {

      setDataDisplayed('Too many matches, specify another filter')
    }
    else if ( dataResponse.length < 10 && dataResponse.length > 1 ) {

      const returnedData = dataResponse.map((data) => {
         
        return <div>
                <span key={data.numericCode}>{data.name}</span>
                <button name={data.name}onClick={(e) => {setCountry(e.target.name)}}>show</button>
               </div>
        
      })
      setDataDisplayed(returnedData)

    }
    else if ( dataResponse.length === 1 ) {
      setLocation(dataResponse[0].capital)

      const returnedData = dataResponse.map((data) => {
 
        return <div key={data.numericCode}>
                <h1>{data.name}</h1>
                <p>capital {data.capital}</p>
                <p>population {data.population}</p>
                <h3>Spoken languages</h3>
                <ul>
                  {data.languages.map((language) => {
                    return <li key={data.languages.nativeName}>{language.name}</li>
                  })}
                </ul>
                <img src={data.flag} width="100" height="100"/>
                <h3>Weather in {data.capital}</h3>
                <p><strong>temperature: {weather.temperature} celcius</strong></p>
                <img src={weather.icon}/>
                <p><strong>wind:</strong> {weather.speed} mph direction {weather.direction}</p>
               </div>
        
      })
      setDataDisplayed(returnedData)

    } else {
      setDataDisplayed('')
=======
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

    if( foundName === -1 && foundNumber === -1 && newNumber){

      const newInfo = {
        name: makeFirstCharactersUppercase(newName),
        number: newNumber
        };

      createNewEntry(newInfo);


    } else if (foundName > -1 && persons[foundName].number !== newNumber) {

      if (window.confirm(`${persons[foundName].name} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(persons[foundName].name)
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
      
    } else if (newName && !newNumber ) {
      alert('Add new number')
      setNewName('')

    } else if ( foundName && foundNumber ) {
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
>>>>>>> 8525f2290cb3c2147e23a3f11eb011dbc9d17c27
    }

  }


<<<<<<< HEAD
  useEffect(hook, [ country, dataResponse.length, Object.keys(weather).length ])
  useEffect(getWeather, [location])



  return (
    <div>
      <form>
        find countries
        <input
        onChange={(e) => {setCountry(e.target.value)}}
        value={country}>
        </input>
      </form>
      {dataDisplayed}
=======
  return (
    <div>

      <div className={nameOfClass}>{responseMessage}</div>

      <h1>Phonebook</h1>

      <Filter newSearch={newSearch} handleFilter={handleFilter}/>

      <h3>add a new</h3>

      <PersonForm updateInfo={updateInfo} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>

      <h3>Numbers</h3>

      <Persons removePerson={removePerson} infoToShow={infoToShow} persons={persons}/>

>>>>>>> 8525f2290cb3c2147e23a3f11eb011dbc9d17c27
    </div>
  )
}

export default App