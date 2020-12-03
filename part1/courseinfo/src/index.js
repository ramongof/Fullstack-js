import React from 'react';
import ReactDOM from 'react-dom';

const Part = ({ part, exercises }) =><div><p>{part} {exercises}</p></div>

const Header = ({ course }) => <div><h1>{course}</h1></div>

const Content = ({ part }) => {  
  console.log(part)
  const names = part.map(value => value.name)
  const exercises = part.map(value => value.exercises)
  console.log(exercises)
  return(
    <div>
      <Part part={names[0]} exercises={exercises[0]} /> 
      <Part part={names[1]} exercises={exercises[1]} /> 
      <Part part={names[2]} exercises={exercises[2]} /> 
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const exercises = props.total.reduce((value, a) => value + a.exercises, 0)  
  return( 
    <div>
      <p> Number of exercises {exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name:  'Fundamentals of react',
        exercises: 10
      },  
      {
        name:  'Using props to pass data',
        exercises: 7
      },  
      {
        name:   'State of a component',
        exercises: 14
      }  
    ]  
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts} />
      <Total total={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))