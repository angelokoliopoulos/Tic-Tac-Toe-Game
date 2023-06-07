const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const MessageDisplay = (() => {
  const feedBack = document.querySelector(".feedBack");

  const displayTurn = (player) => {
    feedBack.querySelector("h2").innerText = `Player's ${player} turn`;
  };
  const winMsg = (player) => {
    feedBack.querySelector("h2").innerText = `Player:  ${player} wins the game`;
  };

  const tieMsg = () => {
    feedBack.querySelector("h2").innerText = `Its a tie!`;
  };

  const clearFeed = () => {
    feedBack.querySelector("h2").innerText = ``;
  };

  return {
    displayTurn,
    winMsg,
    clearFeed,
    tieMsg,
  };
})();

const Gameboard = (() => {
  const boxes = Array.from(document.querySelectorAll(".box"));
  const boardValues = ["", "", "", "", "", "", "", "", ""];

  const drawBoard = () => {
    boxes.forEach((box, index) => {
      let CSSrule = "";
      if (index < 3) {
        CSSrule += "border-bottom:3px solid black;";
      }
      if (index % 3 === 0) {
        CSSrule += "border-right:3px solid black;";
      }
      if (index % 3 === 2) {
        CSSrule += "border-left:3px solid black;";
      }
      if (index > 5) {
        CSSrule += "border-top:3px solid black;";
      }
      box.innerText = "";
      box.style = CSSrule;
      box.addEventListener("click", Gamecontroller.handleClick);
    });
  };
  const updateBoard = (playerMark, clickedArea) => {
    boxes[clickedArea].innerText = playerMark;
    boardValues[clickedArea] = playerMark;
  };

  const getBoardState = () => {
    return boardValues;
  };

  const resetBoard = () => {
    for (let i = 0; i < boardValues.length; i++) {
      boardValues[i] = "";
    }
  };

  const removeListeners = () => {
    boxes.forEach((box) => {
      box.removeEventListener("click", Gamecontroller.handleClick);
    });
  };

  return {
    drawBoard,
    updateBoard,
    getBoardState,
    resetBoard,
    removeListeners,
  };
})();

const Gamecontroller = (() => {
  let gameOver;
  let players;
  let currentPlayer;

  const loadGame = () => {
    MessageDisplay.clearFeed();
    players = [createPlayer("Player 1", "O"), createPlayer("Player 1", "X")];

    gameOver = false;
    currentPlayer = 0;
    Gameboard.drawBoard();
  };

  const handleClick = (e) => {
    let clickedArea = e.target.id;
    if (Gameboard.getBoardState()[clickedArea] != "") return;
    Gameboard.updateBoard(players[currentPlayer].mark, clickedArea);
    MessageDisplay.displayTurn(players[currentPlayer === 1 ? 0 : 1].mark);

    if (checkForWin(Gameboard.getBoardState())) {
      MessageDisplay.winMsg(players[currentPlayer].mark);
      Gameboard.removeListeners();
      return;
    }
    if (
      !checkForWin(Gameboard.getBoardState()) &&
      checkForTie(Gameboard.getBoardState())
    ) {
      MessageDisplay.tieMsg();
      Gameboard.removeListeners();
      return;
    }
    swapPlayer();
  };

  const getComputerMove = () => {
    let availableMoves = [];
    Gameboard.getBoardState().forEach((item, index) => {
      if (item === "") {
        availableMoves.push(index);
      }
    });

    const random = Math.floor(Math.random() * availableMoves.length);
    let move = availableMoves[random];
    return move;
  };

  const swapPlayer = () => {
    currentPlayer = currentPlayer === 1 ? 0 : 1;
  };

  const checkForWin = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      let [a, b, c] = winConditions[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return true;
      }
    }
    return false;
  };
  const checkForTie = (board) => {
    return board.every((cell) => cell !== "");
  };
  return {
    loadGame,
    handleClick,
    swapPlayer,
  };
})();

document.addEventListener("DOMContentLoaded", Gamecontroller.loadGame);
const reset = document
  .getElementById("restartBtn")
  .addEventListener("click", () => {
    Gameboard.resetBoard();
    Gamecontroller.loadGame();
  });
