const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const MessageDisplay = (() => {
  const feedBack = document.querySelector(".feedBack");

  const displayTurn = (player) => {
    feedBack.firstChild.textContent = `Player's ${player} turn`;
  };
  const clearDisplay = () => {
    feedBack.firstChild.textContent = ``;
  };

  return { displayTurn, clearDisplay };
})();

const Gameboard = (() => {
  const boxes = Array.from(document.querySelectorAll(".box"));
  const boardValues = ["", "", "", "", "", "", "", "", ""];
  const drawboard = () => {
    boxes.forEach((box, index) => {
      let cssRule = "";
      if (index < 3) {
        cssRule += `border-bottom:3px solid black;`;
      }
      if (index % 3 === 0) {
        cssRule += `border-right:3px solid black;`;
      }
      if (index % 3 === 2) {
        cssRule += `border-left:3px solid black;`;
      }
      if (index > 5) {
        cssRule += `border-top:3px solid black;`;
      }
      box.style = cssRule;
      box.innerText = "";
      box.addEventListener("click", Gamecontroller.handleMove);
    });
  };

  const updateBoard = (clickedArea, playerMark) => {
    boardValues[clickedArea] = playerMark;
    boxes[clickedArea].textContent = playerMark;
  };

  const getBoardState = () => {
    return boardValues;
  };

  const resetBoardValues = () => {
    for (let i = 0; i < boardValues.length; i++) {
      boardValues[i] = "";
    }
  };
  return {
    drawboard,
    updateBoard,
    getBoardState,
    resetBoardValues,
  };
})();

const Gamecontroller = (() => {
  let gameOver;
  let currentPlayer;
  let players;

  const loadGame = () => {
    gameOver = false;
    currentPlayer = 0;
    players = [createPlayer("Player 1", "O"), createPlayer("Player 2", "X")];
    Gameboard.drawboard();
  };
  const handleMove = (e) => {
    const clickedArea = e.target.id;
    console.log(clickedArea);
    if (Gameboard.getBoardState()[clickedArea] !== "") return;

    Gameboard.updateBoard(clickedArea, players[currentPlayer].mark);
    MessageDisplay.displayTurn(players[currentPlayer === 0 ? 1 : 0].mark);

    if (checkForWin(Gameboard.getBoardState())) {
      alert(`Player ${players[currentPlayer].mark} wins`);
      MessageDisplay.clearDisplay();
      return;
    }
    if (
      (checkForWin(Gameboard.getBoardState()),
      checkForTie(Gameboard.getBoardState()))
    ) {
      alert("Its a tie ");
      return;
    }
    swapPlayer();
  };
  const swapPlayer = () => {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
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
    handleMove,
    swapPlayer,
  };
})();

document.addEventListener("DOMContentLoaded", Gamecontroller.loadGame);
document.getElementById("restartBtn").addEventListener("click", () => {
  Gamecontroller.loadGame();
  Gameboard.resetBoardValues();
});
