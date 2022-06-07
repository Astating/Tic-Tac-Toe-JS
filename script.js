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
  let _clickAuthorised = true;

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

    if (gameFlow.currentPlayerIsAI()) {
      const test = _board.reduce( function(indexArr, current, index) {
        if(current == '⋅') {
          indexArr.push(index);
        }
        return indexArr;
      }, []);
      const randomIndex = Math.floor(Math.random() * test.length);
      setCell(test[randomIndex], gameFlow.getCurrentPlayer());
      _clickAuthorised = false;
      setTimeout(() => {
        _clickAuthorised = true;
        document.querySelector(`#index-${test[randomIndex]}`).click();
      }, 500);
    }

  };

  const getBoard = () => [..._board];

  const _displayBoard = () => {
    const boardDiv = document.querySelector("main");
    const output = document.createElement('output');
    output.classList.add("display-none");
    boardDiv.appendChild(output);
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
    if (_clickAuthorised) {
      const index = parseInt(e.target.id.match(/[0-9]/)[0]);
      if (gameFlow.isFinishedGame()) {
        resetBoard();
      } else if (e.target.textContent == "⋅") {
        setCell(index, gameFlow.getCurrentPlayer());
        e.target.textContent = gameFlow.getCurrentPlayer();
        gameFlow.checkForWin(e.target.textContent);
        if (!gameFlow.isFinishedGame()) {
          gameFlow.togglePlayer();
          if (gameFlow.currentPlayerIsAI()) {
            const test = _board.reduce( function(indexArr, current, index) {
              if(current == '⋅') {
                indexArr.push(index);
              }
              return indexArr;
            }, []);
            const randomIndex = Math.floor(Math.random() * test.length);
            console.log(test, test[randomIndex]);
            setCell(test[randomIndex], gameFlow.getCurrentPlayer());
            _clickAuthorised=false;
            setTimeout(() => {
              _clickAuthorised = true;
              document.querySelector(`#index-${test[randomIndex]}`).click();
            }, 800);
          }
        }
      }
    }
  }

  return {
    setCell,
    getBoard,
    resetBoard,
  };
})();

const Player = (sign, name, ai = false) => {
  let _sign = sign;
  let _name = name;
  let _ai = ai;
  
  const getName = () => _name;
  const setName = (newName) => _name = newName;
  const getSign = () => _sign;
  const isAI = () => _ai;
  const setAI = (trueOrFalse) => _ai = trueOrFalse;

  return { getSign, getName, setName, isAI, setAI };
};

const gameFlow = (() => {
  const player1 = Player("X", "Player 1");
  const player2 = Player("O", "Player 2");

  let currentPlayer = player1;
  document.querySelector('#player-1-name').classList.add("active-player");
  let finishedGame = false;

  const getCurrentPlayer = () => {
    return currentPlayer.getSign();
  };

  const currentPlayerIsAI = () => currentPlayer.isAI();

  function togglePlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
    document.querySelector('#player-1-name').classList.toggle("active-player");
    document.querySelector('#player-2-name').classList.toggle("active-player");
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
          }
        });
      finishedGame = true;
      document.querySelector("output").classList.remove('display-none');
      document.querySelector("output").textContent = `${currentPlayer.getName()} wins the game!!!`;
      } 
    });

    if (!finishedGame && !Gameboard.getBoard().some(n => n == "⋅")) {
      document.querySelector("output").classList.remove('display-none');
      document.querySelector("output").textContent = `Hmmm... It's a... tie...`;
      finishedGame = true;
    }
  };

  return {
    togglePlayer,
    getCurrentPlayer,
    currentPlayerIsAI,
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
const winnerModal = document.querySelector("#winner-display");

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
  if (event.target == winnerModal) {
    winnerModal.style.display = "none";
  }
};

const modalForm = document.querySelector('.modal form');
modalForm.addEventListener('submit', submitForm);

function submitForm(e) {
    event.preventDefault();
    span.click();
    const player1Name = e.target["player-1"].value;
    const player2Name = e.target["player-2"].value;
    const player1AI = e.target["player-1-AI?"].checked;
    const player2AI = e.target["player-2-AI?"].checked;

    gameFlow.player1.setName(player1Name);
    gameFlow.player1.setAI(player1AI);

    gameFlow.player2.setName(player2Name);
    gameFlow.player2.setAI(player2AI);

    const robot1 =  player1AI ? " 🤖" : "" ;
    const robot2 = player2AI ? "🤖 " : "" ;


    const player1Paragraph = document.querySelector('#player-1-name');
    player1Paragraph.textContent = player1Name + " (X)" + robot1;
    const player2Paragraph = document.querySelector('#player-2-name');
    player2Paragraph.textContent = robot2 + player2Name + " (O)";

    if (gameFlow.currentPlayerIsAI()) {
      const test = Gameboard.getBoard().reduce( function(indexArr, current, index) {
        if(current == '⋅') {
          indexArr.push(index);
        }
        return indexArr;
      }, []);
      const randomIndex = Math.floor(Math.random() * test.length);
      Gameboard.setCell(test[randomIndex], gameFlow.getCurrentPlayer());
      setTimeout(() => {
        document.querySelector(`#index-${test[randomIndex]}`).click();
      }, 500);
    }
}


