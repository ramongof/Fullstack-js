import React, { useState, useEffect } from 'react';
import FilterPersons from './components/FilterPersons';
import FormPersons from './components/FormPersons';
import Persons from './components/Persons';
import personService from './services/phonebook';
import './index.css'

const Notifications = ({ classCss, notification }) => {
  return(
    <div className={classCss} >{notification}</div>
  )  
}

const App = () => {  
  
  const [ persons, setPersons ] = useState([])
  const [ findPersons, setFindPersons ] = useState()
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')  
  const [ notification, setNotification]  = useState('')
  const [ classCss, setClassCss ] = useState('')

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {        
    const filtered = (value) => (value.toLowerCase().indexOf(event.target.value.toLowerCase())) !== -1;            
    (!event.target.value) ?
      setFindPersons() :
      setFindPersons(persons.filter(value => filtered(value.name)));
  }

  const handleTimeout = () => {
    setTimeout(() => {
      setNotification(null)
      setClassCss(null)
    }, 5000)
  }

  const handleAddPersons = (event) => {
    event.preventDefault()
    const personObject = {      
      name: newName,
      number: newNumber,
      date: new Date().toISOString()      
    }    

    if(!(newNumber && newName)) {
      window.alert('Either name or number cannot be blank')
    } else {
      console.log(newName)
      if (persons.find(value =>  value.name === newName)) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {          
          personService 
            .update(persons.filter(value => value.name === newName).map(value => value.id), personObject)
            .then(returnedPerson => {                  
              console.log({...personObject, id:returnedPerson.id},'Looking for id');                      
              setPersons(persons.map(person => person.name !== newName ? person: {...personObject, id:returnedPerson.id}));
              setNotification(
                `${newName} phone was updated to ${newNumber}.`
              )
              setClassCss('notification success')
              handleTimeout()
            })
            .catch(error => {
              // setPersons(persons.filter(value => value.name !== newName))
              setNotification(
                error.response.data.error
              )
              setClassCss('notification error')
              handleTimeout()
            }) 
        }
      }else if (persons.find(value => value.number === newNumber)) {
        window.alert(`the number ${newNumber} is already added to phonebook`)
      }else{          
          personService
            .create(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson));
              setNotification(
                `${returnedPerson.name} was added to the contact list` 
              )
              setClassCss('notification success')   
              handleTimeout()           
            })
            .catch(error => {              
              setNotification(
                error.response.data.error
              )
              setClassCss('notification error')  
              handleTimeout()
            }) 
                       
      };
    }             
    setNewName('');
    setNewNumber('');
  }

  const handleDeletePerson = (id) => {
    if(window.confirm(`Do you want to delete ${persons.filter(value => value.id === id).map(value => value.name)}`)) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(value => value.id !== id))
          setNotification(
            `${persons.filter(value => value.id === id).map(value => value.name)} was removed from the server.`
          )
          setClassCss('notification success')
          handleTimeout()
        })
        .catch(error => {
          setPersons(persons.filter(value => value.id !== id))
          setNotification(
            `${persons.filter(value => value.id === id).map(value => value.name)} was already removed from the server.`
          )
          setClassCss('notification error')
          handleTimeout()
        })
        document.getElementById('filter').value = '';
        setFindPersons();
    }          
  }

  useEffect(() => {   
    personService
      .getAll()
      .then(returnedPerson => {
        setPersons(returnedPerson)
      })        
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications classCss={classCss} notification={notification} />
      <FilterPersons onChange={handleNameFilter}/>
      <h2>Add a new</h2>
      <FormPersons 
        onSubmit={handleAddPersons} onChangeName={handleChangeName} name={newName} 
        onChangeNumber={handleChangeNumber} number={newNumber} 
      />      
      <h2>Numbers</h2>      
      <Persons findPersons={findPersons} persons={persons} handleDeletePerson={handleDeletePerson} />          
    </div>
  )
}

export default App;
