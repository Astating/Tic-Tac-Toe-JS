"use strict";

const Gameboard = (()=>{
    const _board = new Array(9).fill('⋅');

    const setCell = (index, marker) => {
        _board[index] = marker;
    }

    const resetBoard = () => {
        _board = new Array(9).fill('⋅');
    }

    const getBoard = () => [..._board];

    const _displayBoard = () => {
        const boardDiv = document.querySelector("main");
        getBoard().forEach((cell, idx) => {
            const div = document.createElement("div");
            div.textContent = cell;
            div.id = `index-${idx}`;
            div.addEventListener("click", updateCell);
            boardDiv.appendChild(div);
        });
    }
    _displayBoard();

    function updateCell(e) {
        const index = parseInt(e.target.id.match(/[0-9]/)[0]);
        if (gameFlow.isFinishedGame()) {
            alert("blabliblu");
        } else if(e.target.textContent == '⋅') { 
            setCell(index, gameFlow.getCurrentPlayer());
            e.target.textContent = gameFlow.getCurrentPlayer();
            gameFlow.checkForWin(e.target.textContent);
            gameFlow.togglePlayer();
            console.log(e.target);
        }
    }

    return {
        setCell,
        getBoard,
        resetBoard,
    }
})();

const Player = (sign) => {
    let _sign = sign;

    const getSign = () => _sign;

    return {getSign}
}


const gameFlow = (() => {
    const player1 = Player("X");
    const player2 = Player('O');

    let currentPlayer = player1;
    let finishedGame = false;

    const getCurrentPlayer = () => {
        return currentPlayer.getSign();
    }


    function togglePlayer() {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }

    function isFinishedGame() {
        return finishedGame;
    }

    const checkForWin = (marker) => {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        winCombinations.forEach(a => {
            if (a.every(el => Gameboard.getBoard()[el] == marker)) {
                document.querySelectorAll('div').forEach((n, idx) => {
                    if (a.includes(idx)) {
                        n.classList.toggle('win');
                        finishedGame = true;
                    } 
                })
            }});
    };

    return {togglePlayer, getCurrentPlayer, checkForWin, isFinishedGame}
})();






