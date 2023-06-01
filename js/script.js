const MessageDisplay = (() => {})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};
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

  return {
    drawBoard,
    updateBoard,
    getBoardState,
    resetBoardValues,
  };
})();

const Gamecontroller = (() => {
  let gameOver;
  let players;
  let currentPlayer;

  const loadGame = () => {
    GameBoard.resetBoardValues();
    gameOver = false;
    players = [createPlayer("Player1", "O"), createPlayer("Player2", "X")];
    currentPlayer = 0;
    GameBoard.drawBoard();
  };

  const handleClick = (e) => {
    let clickedArea = e.target.id;
    if (GameBoard.getBoardState()[clickedArea] != "") return;
    console.log(e.target.id);
    GameBoard.updateBoard(players[currentPlayer].mark, clickedArea);
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
