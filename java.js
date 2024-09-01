let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let playAIBtn = document.querySelector("#play-ai-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnMsg = document.querySelector("#turn-msg");

let turnO = true; // true for O's turn, false for X's turn
let count = 0; // To track draws
let isPlayingAgainstAI = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    isPlayingAgainstAI = false;
    turnMsg.innerText = "Player O's Turn";
    enableBoxes();
    msgContainer.classList.add("hide");
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

const aiMove = () => {
    let availableMoves = Array.from(boxes).filter(box => box.innerText === "");
    if (availableMoves.length > 0) {
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        randomMove.innerText = "X";
        randomMove.disabled = true;
        count++;

        if (!checkWinner()) {
            turnO = true;
            turnMsg.innerText = "Player O's Turn";
        }
    }
};

const handleBoxClick = (box) => {
    if (box.innerText === "") {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            turnMsg.innerText = "Player X's Turn";
        } else {
            box.innerText = "X";
            turnO = true;
            turnMsg.innerText = "Player O's Turn";
        }
        box.disabled = true;
        count++;

        if (checkWinner()) return;
        if (count === 9) {
            gameDraw();
        } else if (isPlayingAgainstAI && !turnO) {
            setTimeout(aiMove, 500); // AI makes a move after a short delay
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => handleBoxClick(box));
});

resetBtn.addEventListener("click", resetGame);
playAIBtn.addEventListener("click", () => {
    resetGame();
    isPlayingAgainstAI = true;
});
