import {TicTacToe} from "./components/TicTacToe.js";

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {    
    const moveEl = document.getElementById('move-value')
    const gameFinal = document.getElementById('game-result')
    
    const onMove = (isXTurn) => {
        let currentMove
        
        if (isXTurn) {
            currentMove = 'X'
        } else {
            currentMove = 'O'
        }

        moveEl.innerText = currentMove
    }

    const onGameEnd = (result) => {
        gameFinal.innerText = result;
    }

    const game = TicTacToe.init(
        {
            el: document.getElementById('tic-tac-toe'),
            onMove,
            onGameEnd
        }
    )

    game.startGame()
    
    const restartBtn = document.getElementById('restart-btn')

    restartBtn.addEventListener('click', () => {
        game.restartGame()
    })
}