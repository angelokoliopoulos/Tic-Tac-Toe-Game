const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Gameboard = (() => {
  const boardValues = ["", "", "", "", "", "", "", "", ""];
  const boxes = Array.from(document.querySelectorAll(".box"));

  const drawBoard = () => {
    boxes.forEach((box, index) => {
      let ruleString = "";

      if (index < 3) {
        ruleString += `border-bottom:3px solid black;`;
      }
      if (index % 3 === 0) {
        ruleString += `border-right:3px solid black;`;
      }
      if (index % 3 === 2) {
        ruleString += `border-left:3px solid black;`;
      }
      if (index > 5) {
        ruleString += `border-top:3px solid black;`;
      }
      box.innerText = "";
      box.style = ruleString;
      box.addEventListener("click", Gamecontroller.handleMove);
    });
  };

  const updateBoard = (move, playerMark) => {
    boardValues[move] = playerMark;
    boxes[move].innerText = playerMark;
  };

  const getBoardValues = () => {
    return boardValues;
  };
  const resetBoardValues = () => {
    for (let i = 0; i < boardValues.length; i++) {
      boardValues[i] = "";
    }
  };

  return {
    drawBoard,
    updateBoard,
    getBoardValues,
    resetBoardValues,
  };
})();
//#######################\\
//#######################\\
//#######################\\
//#######################\\
const Gamecontroller = (() => {
  let players;
  let gameOver;
  let currentPlayer;

  const handleMove = (e) => {
    const position = e.target.id;
    console.log(position);
    if (Gameboard.getBoardValues()[position] !== "") return;
    Gameboard.updateBoard(position, players[currentPlayer].mark);
    if (checkForWin(Gameboard.getBoardValues())) {
      alert(`Player: ${players[currentPlayer].mark} wins`);
    }
    if (
      checkForTie(Gameboard.getBoardValues()) &&
      !checkForWin(Gameboard.getBoardValues())
    ) {
      alert("its a tie");
    }
    Gamecontroller.swapPlayer();
  };

  const startGame = () => {
    players = [createPlayer("Player 1", "O"), createPlayer("Player 2", "X")];
    gameOver = false;
    currentPlayer = 0;
    Gameboard.drawBoard();
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
    handleMove,
    startGame,
    swapPlayer,
  };
})();

document.getElementById("restartBtn").addEventListener("click", () => {
  Gameboard.resetBoardValues();
  Gamecontroller.startGame();
});
document.addEventListener("DOMContentLoaded", Gamecontroller.startGame);
