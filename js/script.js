const createPlayer = (name, mark) => {
  return { name, mark };
};

function checkForWin(board) {
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
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

const GameBoard = (() => {
  const boardValues = ["", "", "", "", "", "", "", "", ""];
  const boxes = Array.from(document.querySelectorAll(".box"));
  const drawGameBoard = () => {
    boxes.forEach((box, index) => {
      let styleString = "";
      if (index < 3) {
        styleString += "border-bottom: 3px solid black;";
      }
      if (index % 3 === 0) {
        styleString += `border-right: 3px solid;`;
      }
      if (index % 3 === 2) {
        styleString += `border-left: 3px solid black;`;
      }

      if (index > 5) {
        styleString += "border-top: 3px solid black;";
      }
      box.textContent = "";
      box.style = styleString;
      box.addEventListener("click", gameController.boxClick);
    });
  };

  const updateBoard = (clickedArea, playermark) => {
    console.log(clickedArea);

    boardValues[clickedArea] = playermark;
    boxes[clickedArea].textContent = playermark;
  };

  const getBoardState = () => {
    return boardValues;
  };

  const resetBoardValues = () => {
    for (let i = 0; i < boardValues.length; i++) {
      boardValues[i] = "";
    }
  };

  return { drawGameBoard, updateBoard, getBoardState, resetBoardValues };
})();

///////////////////////////////////////////////////////////////////////////////
//#####################################################################\\
//////////////////////////////////////////////////////////////////////////////

const gameController = (() => {
  let players = [];

  let gameOver;
  let currentPlayer;
  const startGame = () => {
    players = [createPlayer("Player1", "O"), createPlayer("Player2", "X")];
    gameOver = false;
    currentPlayer = 0;
    GameBoard.drawGameBoard();
  };

  const boxClick = (e) => {
    if (gameOver) {
      return;
    }
    let boxClicked = e.target.id;

    if (GameBoard.getBoardState()[boxClicked] !== "") return;
    GameBoard.updateBoard(boxClicked, players[currentPlayer].mark);
    if (checkForWin(GameBoard.getBoardState(), players[currentPlayer.mark])) {
      gameOver = true;
      alert(`${players[currentPlayer].name} won the game`);
    } else if (checkForTie(GameBoard.getBoardState())) {
      gameOver = true;
      alert(`its a tie`);
    }

    console.log(currentPlayer);
    swapPlayer();
  };

  const getPlayer = () => {
    console.log(currentPlayer);

    return currentPlayer;
  };

  const swapPlayer = () => {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  };

  return {
    startGame,
    boxClick,
    getPlayer,
    swapPlayer,
  };
})();

document.getElementById("restartBtn").addEventListener("click", () => {
  gameController.startGame();
  GameBoard.resetBoardValues();
});
document.addEventListener("DOMContentLoaded", gameController.startGame);
