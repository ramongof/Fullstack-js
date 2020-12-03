import React from 'react';

const Part = ({ name, exercises }) => <div><p>{name} {exercises}</p></div>
  
const Total = ({ total }) => <h3>Total of {total} exercises</h3>
  
const Header = ({ name }) => <h1><p>{name}</p></h1>
  
const Content = ({ course }) => {  
    const total = course.map(value => value.exercises).reduce((acc, value) => acc + value)  
    console.log(course[0].id, 'content');

    return(
        <div>      
            {course.map(value => 
                <Part key={value.id} name={value.name} exercises={value.exercises}/>          
                )
            }    
            <Total total={total} />  
        </div>
    )
}

const Course = ({ course }) => 
    <div>
        {course.map((value)  => [
            <Header key={value.id} name={value.name} />, 
            <Content key={value.name} course={value.parts} />
        ])}      
    </div> 

export default Course;