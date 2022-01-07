import React, { useEffect, useState } from 'react'

import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import game from './game/Game'

function MemoryGame(){

    const [gameOver, setGameOver] = useState(false)
    const [cards, setCards] = useState([])

    useEffect(()=>{
        setCards(game.CreateCardFromInstruments())
    },[])

    function restart(){
        setGameOver(false)
        setCards(game.CreateCardFromInstruments())
        game.clearCards();
    }

    function handleFlip(card){

         
        game.flipCard(card.id, ()=>{
            // GameOver
            setGameOver(true)
        }, ()=>{
            // No Match
            setCards([...game.cards])
            console.log([...game.cards])
        })
        setCards([...game.cards])
    }

    return(
        <div>
            <GameBoard handleFlip={handleFlip} card={cards}></GameBoard>
            <GameOver show={gameOver} restart={restart}></GameOver>
        </div>
    )

}

export default MemoryGame;