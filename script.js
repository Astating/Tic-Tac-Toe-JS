"use strict";

/* 
TODOS:
-distinguish more x and o (colors)
-display who's currentPlayer
-choose your name
-start interface
-bot
*/

const Gameboard = (() => {
  let _board = new Array(9).fill("⋅");

  const setCell = (index, marker) => {
    _board[index] = marker;
  };

  const resetBoard = () => {
    gameFlow.restartGame();

    _board = new Array(9).fill("⋅");

    const parent = document.querySelector("main");
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
    _displayBoard();
  };

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
  };
  _displayBoard();

  function updateCell(e) {
    const index = parseInt(e.target.id.match(/[0-9]/)[0]);
    if (gameFlow.isFinishedGame()) {
      alert("blabliblu");
    } else if (e.target.textContent == "⋅") {
      setCell(index, gameFlow.getCurrentPlayer());
      e.target.textContent = gameFlow.getCurrentPlayer();
      gameFlow.checkForWin(e.target.textContent);
      gameFlow.togglePlayer();
    }
  }

  return {
    setCell,
    getBoard,
    resetBoard,
  };
})();

const Player = (sign, name) => {
  let _sign = sign;
  let _name = name;

  const getName = () => _name;
  const setName = (newName) => _name = newName;
  const getSign = () => _sign;

  return { getSign, getName, setName };
};

const gameFlow = (() => {
  const player1 = Player("X", "Player1");
  const player2 = Player("O", "Player2");

  let currentPlayer = player1;
  let finishedGame = false;

  const getCurrentPlayer = () => {
    return currentPlayer.getSign();
  };

  function togglePlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  }

  function isFinishedGame() {
    return finishedGame;
  }

  function restartGame() {
    finishedGame = false;
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
      [2, 4, 6],
    ];
    winCombinations.forEach((winningComb) => {
      if (winningComb.every((index) => Gameboard.getBoard()[index] == marker)) {
        document.querySelectorAll("main div").forEach((cell, idx) => {
          if (winningComb.includes(idx)) {
            cell.classList.add("win");
            finishedGame = true;
          } 
        });
      } 
    });

    if (!finishedGame && !Gameboard.getBoard().some(n => n == "⋅")) {
        alert(currentPlayer.getName());
        finishedGame = true;
    }
  };

  return {
    togglePlayer,
    getCurrentPlayer,
    checkForWin,
    isFinishedGame,
    restartGame,
    player1,
    player2
  };
})();

document
  .querySelector("button")
  .addEventListener("click", Gameboard.resetBoard);

/* MODAL */
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const modalForm = document.querySelector('.modal form');
modalForm.addEventListener('submit', submitForm);

function submitForm(e) {
    event.preventDefault();
    span.click();
    const player1Name = e.target["player-1"].value;
    const player2Name = e.target["player-2"].value;

    gameFlow.player1.setName(player1Name);
    gameFlow.player2.setName(player2Name);

    const player1Paragraph = document.querySelector('#player-1-name');
    player1Paragraph.textContent = player1Name + " (X)";
    const player2Paragraph = document.querySelector('#player-2-name');
    player2Paragraph.textContent = player2Name + " (O)";
}


