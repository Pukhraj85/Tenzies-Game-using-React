import React from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
export default function App(){
    const [dice, setDice]= React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    React.useEffect(() => {
        const firstValue = dice[0].value
        const allHeld = dice.every(die => die.isHeld)
        const allSameNumber = dice.every(die => die.value === firstValue)
        if(allHeld && allSameNumber) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie(){
        return {
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()
        }
    }
    function allNewDice(){
        const newDice = []
        for(let i=0;i<10;i++){
            newDice.push({
                value:Math.ceil(Math.random()*6),
                isHeld:false,
                id:nanoid()
            })
        }
        return newDice
    }
    function rollDice(){

        if(!tenzies){
            setDice(oldDice=>oldDice.map(die=>{
                return die.isHeld ? 
                die:
                generateNewDie()
            }))
        }
        else{
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    function holdDice(id){
        setDice(oldDice=> oldDice.map(die=>{
            return die.id === id ? 
            {...die,isHeld: !die.isHeld} :
            die
        }))
    }
    const diceElements = dice.map(die=>
        <Die key={die.id} 
             value={die.value} 
             isHeld={die.isHeld}
             holdDice={()=>holdDice(die.id)} />) 
    return(
       <main>
        {tenzies && <Confetti width={window.innerWidth || 300}
        height={window.innerHeight || 200}/>}
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll untill all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className='dice-container'>
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}>
                {tenzies ? "new Game" : "Roll"}
            </button>
        {tenzies && <h1>Congratulations, You won</h1>}
       </main>
    )

}