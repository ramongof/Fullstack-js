import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({text, feedback}) => 
    <tbody>
        <tr>
            <td>{text}</td> 
            <td>{feedback}</td>
        </tr>
    </tbody>  

const Total = ({feedback, avarage}) => {  
    console.log(feedback, avarage)  
    const reducer = (acc, cValue) => acc + cValue    
    const total = feedback.reduce(reducer)
    const avarageScore = (avarage.reduce(reducer) > 0) ? [avarage.reduce(reducer)]/total : 0
    const positive = (feedback[0] > 0) ? (feedback[0]*100)/total : 0
    console.log(avarage, 'avarage')
    return(                
        <tbody>
            <tr>
                <td>All</td>
                <td>{total}</td>
            </tr>            
            <tr>
                <td>Avarage</td>
                <td>{avarageScore}</td>
            </tr>
            <tr>
                <td>Positive</td>
                <td>{positive}%</td>
            </tr>            
        </tbody>        
    )
}

const Button = (props) => <><button onClick={props.onclick} >{props.text}</button></>

const Statistics = ({feedback}) =>{   
    console.log(feedback.reduce((value, cValue) => value + cValue))       
    const total = feedback.reduce((value, cValue) => value + cValue)    

    if (total === 0) {
        return(
            <div>
                <h2><p>Statistics</p></h2>   
                <div>No feedback given!</div>
            </div>
        )
    }else{
        return(            
            <div>  
                <h2><p>Statistics</p></h2>
                <table>                                        
                    <Display text="Good" feedback={feedback[0]}/>
                    <Display text="Neutral" feedback={feedback[1]}/>
                    <Display text="Bad" feedback={feedback[2]}/>  
                    <Total 
                        feedback={feedback} 
                        avarage ={[feedback[0]*1, feedback[1]*0, feedback[2]*-1]}
                    />                    
                </table>                                                                        
            </div>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0)
    const [bad, setBad] = useState(0)
    const [neutral, setNeutral] = useState(0)
       
    const handleClick = (feedback, setFeedback) => {
        const click = feedback + 1
        setFeedback(click)        
    }
    return(
        <div>
            <h1>
                <p>Give Feedback</p>
            </h1>
            <Button onclick={()=>handleClick(good, setGood)} text='good' />
            <Button onclick={()=>handleClick(neutral, setNeutral)} text='neutral' />
            <Button onclick={()=>handleClick(bad, setBad)} text='bad' />
            <Statistics feedback={[good, neutral, bad]} />            
        </div>
    )
}


ReactDOM.render(<App />, 
    document.getElementById('root')
);

