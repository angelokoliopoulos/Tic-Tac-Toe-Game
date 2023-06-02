const MessageDisplay = (() => {
  const heading = document.querySelector("h2");

  const winMsg = (player) => {
    heading.innerText = `Player ${player} won the game!`;
  };

  const displayTurn = (player) => {
    heading.innerText = `Player's ${player} turn`;
  };

  const tieMsg = () => {
    heading.innerText = `It's a tie!`;
  };

  const clearDisplay = () => {
    heading.innerText = "";
  };
  return {
    winMsg,
    displayTurn,
    tieMsg,
    clearDisplay,
  };
})();

const GameBoard = (() => {
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

  const resetBoardValues = () => {
    for (i = 0; i < boardValues.length; i++) {
      boardValues[i] = "";
    }
  };

  const removeListeners = () => {
    boxes.forEach((box) =>
      box.removeEventListener("click", Gamecontroller.handleClick)
    );
  };

  return {
    drawBoard,
    updateBoard,
    getBoardState,
    resetBoardValues,
    removeListeners,
  };
})();

const Gamecontroller = (() => {
  let gameOver;
  let players;
  let currentPlayer;

  const createPlayer = (name, mark) => {
    return {
      name,
      mark,
    };
  };

  const loadGame = () => {
    GameBoard.resetBoardValues();
    MessageDisplay.clearDisplay();
    gameOver = false;
    players = [createPlayer("Player1", "O"), createPlayer("Player2", "X")];
    currentPlayer = 0;
    GameBoard.drawBoard();
  };

  const handleClick = (e) => {
    let clickedArea = e.target.id;
    if (GameBoard.getBoardState()[clickedArea] != "") return;

    MessageDisplay.displayTurn(players[currentPlayer === 0 ? 1 : 0].mark);
    GameBoard.updateBoard(players[currentPlayer].mark, clickedArea);

    if (checkForWin(GameBoard.getBoardState())) {
      MessageDisplay.winMsg(players[currentPlayer].mark);
      GameBoard.removeListeners();
      return;
    }

    if (checkTie(GameBoard.getBoardState())) {
      MessageDisplay.tieMsg();
      GameBoard.removeListeners();
      return;
    }

    swapPlayer();
  };

  const swapPlayer = () => {
    currentPlayer = currentPlayer === 1 ? 0 : 1;
  };

  const checkTie = (gameboard) => {
    return gameboard.every((cell) => cell !== "");
  };

  const checkForWin = (gameboard) => {
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
      if (
        gameboard[a] &&
        gameboard[a] === gameboard[b] &&
        gameboard[b] === gameboard[c]
      ) {
        return true;
      }
    }
    return false;
  };

  return {
    loadGame,
    handleClick,
  };
})();

document.addEventListener("DOMContentLoaded", Gamecontroller.loadGame);

document
  .getElementById("restartBtn")
  .addEventListener("click", Gamecontroller.loadGame);
