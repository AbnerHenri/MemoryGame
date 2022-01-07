import React, { Fragment } from "react";

function GameOver(props){

    return( props.show ?
        <div>
            <div id='GameOver'>
                <div>Parabéns, Você completou o jogo</div>
                <button id='restart' onClick={() => props.restart()}>Reiniciar</button>
            </div>
        </div> : <Fragment />
    )

}

export default GameOver;