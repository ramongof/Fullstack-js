import React from 'react'

const Display = ({ id, name, number, handleDeletePerson }) => 
    <div className='person' >
        {name} {number} &nbsp;
        <button onClick={() => handleDeletePerson(id)}> delete </button>
    </div>
    
const Persons = ({ findPersons, persons, handleDeletePerson }) => {
    console.log('persons comp', findPersons, persons);
    let arrayPersons = [];
    let noPerson = ''

    !findPersons ?
        arrayPersons = persons
    :
    findPersons.length > 0 ?
        arrayPersons = findPersons
    :
        noPerson = `No this person is not on the list`;

    return(
        <>
            {arrayPersons.map(value => <Display 
                                        key={value.id} 
                                        id={value.id} 
                                        name={value.name} 
                                        number={value.number} 
                                        handleDeletePerson={handleDeletePerson}    
                                    />)} 
            {noPerson}
        </>
    )    
}

export default Persons