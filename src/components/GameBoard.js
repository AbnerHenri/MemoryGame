import React from "react";
import CardElement from './CardElement'

function GameBoard(props){

    return(
        <div  id='GameBoard'>
           {props.card.map( (card, index)=>
                <CardElement handleFlip={props.handleFlip} key={index} card={card}></CardElement>
            )}
        </div>
    )

}

export default GameBoard;