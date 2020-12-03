import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} Years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/ramongof">ramon garrido</a>  
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))