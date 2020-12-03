import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ anecdotes, selected, votes }) => 
  <div>
    {anecdotes[selected]}
    <div>Has {votes[selected]} votes</div>
  </div>

const Button = ({ onclick, text }) => <button onClick={onclick}>{text}</button>

const MostVoted = ({ anecdote, votes }) => {  
  const max = Math.max( ...votes )
  const maxVote = votes.map(value => (value === max && value > 0));      
  return(
    (max > 0)?
      <>
        <h2><p>Anecdote with most votes</p></h2>      
        {maxVote.map((value, index) => (value === true)? anecdote[index]+'  '   : false)}
        <div>Has {max} votes</div>
      </> :
      <>
      </>
  )
}

const App = (props) => {
  const anecdotes = props.anecdotes
  const [selected, setSelected] = useState(0)    
  let vote = []

  for (let i = 0; i < anecdotes.length; i++){
    vote.push(0)
  }

  const [votes, setVotes] = useState([ ...vote ])  
  
  const handleClick = () => {  
    ([selected + 1] < anecdotes.length) ? 
      setSelected(selected + 1) : setSelected(0)                   
  }
  
  const handleVote = (value) => {      
    votes[selected] = value      
    setVotes([ ...votes ])        
  }
  console.log(votes)
  return(
    <div>
      <h1><p>Anecdote of the day</p></h1>
      <Display anecdotes={anecdotes} selected={selected} votes={votes} />
      <div>
        <Button onclick={()=>handleVote(votes[selected] += 1)} text="vote" />
        <Button onclick={()=>handleClick()} text="next anecdote" />        
      </div>
      <MostVoted anecdote={anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
);
