import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
      .split(' ')
      .map(s => s.charAt(0)
      .toUpperCase() + s
      .substr(1))
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
    }

  }


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
    </div>
  )
}

export default App