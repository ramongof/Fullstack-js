import React from 'react'

const AddFields = ({ description, onChange, value }) => 
    <div>{description}: <input onChange={onChange} value={value} /></div>

const FormPersons = (props) =>{
    console.log('Form persons comp:', props);
    return(
        <form onSubmit={props.onSubmit} className="form" >
            <AddFields description="name" onChange={props.onChangeName} value={props.name} />
            <AddFields description="phone number" onChange={props.onChangeNumber} value={props.number} />              
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )        
}

export default FormPersons