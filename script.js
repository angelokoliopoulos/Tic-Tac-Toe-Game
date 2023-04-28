const playerFactory = (name, mark) => {
  return { name, mark };
};

const player1 = playerFactory("Player1", "O");
const player2 = playerFactory("Player2", "X");

const gameBoard = (() => {
  const boxClick = (e, player) => {
    console.log(e.target.id);
    e.target.innerText = player.mark;
  };

  return { boxClick };
})();

const displayController = (() => {
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

      box.style = styleString;
      box.addEventListener("click", gameBoard.boxClick);
    });
  };

  return { drawGameBoard };
})();

document.addEventListener("DOMContentLoaded", displayController.drawGameBoard);
