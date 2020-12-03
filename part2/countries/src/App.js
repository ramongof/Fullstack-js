import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SingleCountry = ({ filterCountries, weather }) => {
  return filterCountries.map(value => 
          <div key={value.numericCode}>
            <h2>{value.name}</h2>
            <p>
              Capital {value.capital} <br/>
              Population {value.population}
            </p>
            <h3>Languages</h3>
            <ul>
              {value.languages.map(value => <li key={value.iso639_2}>{value.name}</li>)}
            </ul>
            <img src={value.flag} alt="FLAG" width="200" height="150" />     
            {weather}
          </div>)
}

const HandleCountries = ({ handleButtonShow, filterCountries }) => {  
  return  (
    filterCountries.map(value => 
      <div key={value.numericCode}>
        {value.name} <button type="button" onClick={()=> handleButtonShow(value.numericCode, value.name)} className="button" >show</button>
      </div>) 
  )
}

const Country = ({ filterCountries, handleButtonShow, filtered, inputFilter, country }) => {       
  const [ weather, setWeather ] = useState();
  const hookWeather = () => {       
    const api_key = process.env.REACT_APP_API_KEY; 
    if(country) {    
      console.log('effect weather', country);            
      axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`)   
      .then(response => response.data)   
      .then(weatherData => new Promise(( resolve, reject ) => {
          resolve(    
              <div>
                <h2>Weather in {weatherData.location.name}</h2>
                <p><b>temperature:</b> {weatherData.current.temperature} Celcius</p>
                <img src={weatherData.current.weather_icons} alt="FLAG" width="50" height="50" />
                <p><b>wind:</b> {weatherData.current.wind_speed} km/h direction {weatherData.current.wind_dir}</p>
              </div>     
          )         
        })                         
      )
      .then(weatherData => setWeather(weatherData))
    } else {
      setWeather()
    }
  } 
  useEffect(hookWeather,[country]);       
  return (
    <div>{
    (filtered(inputFilter).length > 9) ?
    <div>Too many maches, specify another filter</div>
    :
      (filterCountries.length < 10 && filterCountries.length > 1) ?
        <HandleCountries handleButtonShow={handleButtonShow} filterCountries={filterCountries} />
        
      :                                           
        <SingleCountry filterCountries={filterCountries} weather={weather} />}        
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState();
  const [ inputFilter, setInputFilter ] = useState();
  const [ filterCountries, setFilterCountries ] = useState();  
  const [ country, setCountry ] = useState();  

  // fetch('https://restcountries.eu/rest/v2/name/brazil')
  //   .then(response => response.json())
  //   .then(country => country.map(value => value.flag))
  //   .then(flag => setTimeout(() => {
  //         console.log(<img src={flag}/>);      
  //     }, 3000)
  //   )
      
    
  
  const hook = () => {
    console.log('effect');
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {      
      console.log('promise Fulfilled');
      setCountries(response.data);
    })
  }

  const handleButtonShow = (id, name) => {
    console.log(id);
    setFilterCountries(countries.filter(value => value.numericCode === id))
    setCountry(name);
  }
  
  const filtered = (targetValue) => {
    return countries.filter( value => (value.name.toLowerCase().indexOf(targetValue.toLowerCase()) !== -1))            
  }

  const handleSearch = (event) => {                        
    setInputFilter(event.target.value);    
    
    (filtered(event.target.value).length < 10) ?
      setFilterCountries(filtered(event.target.value))          
    :
      setFilterCountries([]);                 
    
    (filtered(event.target.value).length === 1) ?
      setCountry(filtered(event.target.value)[0].name)      
    :
      setCountry();    
  }    
  
  useEffect(hook,[]);     
  
  return(
    <div>
      <h1>Countries</h1>
      <div>
        Find Countries &nbsp;
        <input type="text" onChange={handleSearch} placeholder="countrie name" />        
      </div>
      <div>        
          {inputFilter && 
          <Country 
            filterCountries={filterCountries} 
            handleButtonShow={handleButtonShow} 
            filtered={filtered} 
            inputFilter={inputFilter} 
            country={country}
          />}                  
      </div>
    </div> 
  )

}


export default App;
