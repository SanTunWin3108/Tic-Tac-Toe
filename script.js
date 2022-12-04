const buttons = document.querySelectorAll(".button-option");
const restartBtn = document.querySelector("#restart");
const popup = document.querySelector(".popup");
const message = document.querySelector("#message");
const newGameBtn = document.querySelector("#new-game");


let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
];

let xTurn = true;
let count = 0;

//Display popup
const showPopup = () => {
    popup.classList.remove("hide");
}

//Hide popup
const hidePopup = () => {
    popup.classList.add("hide");
}

//Enable buttons
const enableButtons = () => {
    buttons.forEach(btn => {
    btn.disabled = false;
    btn.innerText = "";
    xTurn = true;
    count = 0;
});

}

//Disable buttons
const disableButtons = () => {
    buttons.forEach(btn => {btn.disabled = true});
}

//Draw Function
const drawFunction = () => {
    showPopup();
    message.innerHTML = "&#x1f389; <br> It's a Draw";
    count = 0;
}

//Win function
const winFunction = (letter) => {
    
   setTimeout(() => {
    showPopup();
    if(letter === "X") {
        message.innerHTML = "&#x1f389; <br> 'X' Wins";
    } else {
        message.innerHTML = "&#x1f389; <br> 'O' Wins";
    }
   }, 400);
}

//Win Checker
const winChecker = () => {
    for(let item of winningPattern) {
        let [element1, element2, element3] = [buttons[item[0]].innerText, buttons[item[1]].innerText, buttons[item[2]].innerText];
        if(element1 !== "" && element2 !== "" && element3 !== "") {
            if((element1 === element2) && (element1 === element3)) {
                disableButtons();
                winFunction(element1);
            }
        }
    }
}

//New Game Button
newGameBtn.addEventListener("click", () => {
    enableButtons();
    hidePopup();
});

//Restart Button
restartBtn.addEventListener("click", () => {
    enableButtons();
})

//loop through buttons and add event listener
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(xTurn) {
            xTurn = false;
            btn.innerText = "X";
            btn.disabled = true;
        } else {
            xTurn = true;
            btn.innerText = "O";
            btn.disabled = true;
        }

        count++;
        if(count === 9) {
            disableButtons();
            setTimeout(drawFunction, 400);
        }

        //Win Checker
        winChecker();
    });
});