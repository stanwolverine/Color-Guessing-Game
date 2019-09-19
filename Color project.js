var numSquares = 6;
var squares = document.querySelectorAll(".square");
var colors = generateRandomColors(numSquares);
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var heading = document.querySelector("h1");
var reloadColors = document.querySelector("#resetColors");
var modeButtons = document.querySelectorAll(".mode");

// Functions For Main LOgic

function pickColor () {
    var indexNum = Math.floor(Math.random() * colors.length);
    return colors[indexNum];
}

function r3DN () { //r3DN = random 3 digit number.
    var r = Math.floor(Math.random() * 255+1); 
    var g = Math.floor(Math.random() * 255+1); 
    var b = Math.floor(Math.random() * 255+1);
    return "rgb(" +r+ ", " +g+ ", " +b+ ")";
}

function generateRandomColors (num) {
    var ranCol = [];
    for (let i = 1; i <= num; i++) {
        ranCol.push(r3DN());
    }
    return ranCol;
}

function changeColor (color) {
    heading.style.backgroundColor = color;
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

// Functions For Buttons

function reset () {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    heading.style.backgroundColor = "steelblue";
    reloadColors.textContent = "NEW COLORS";
    messageDisplay.textContent = '';
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
}

// Main Game Logic

colorDisplay.textContent = pickedColor;

for (let i = 0; i < squares.length; i++) {
    //add initial color to Squares.
    squares[i].style.backgroundColor = colors[i];

    //add click listeners to Squares.
    squares[i].addEventListener("click", function(){
        //grab color of clicked square.
        var colorOfClickedSquare = this.style.backgroundColor;
        //compare grabed color to picked color.
        if (colorOfClickedSquare === pickedColor) {
            messageDisplay.textContent = "Correct!!!";
            messageDisplay.classList.add("winner");
            messageDisplay.classList.remove("loser");
            reloadColors.textContent = "PLAY AGAIN";
            changeColor(colorOfClickedSquare);
        } else {
            this.style.backgroundColor = "rgb(35, 35, 35)";
            // this.classList.add("animationEffect");
            messageDisplay.textContent = "Try Again";
            messageDisplay.classList.add("loser");
        }
    });
}

//Buttons Logic

reloadColors.addEventListener("click", reset);

for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        modeButtons[i].textContent === "EASY" ? numSquares = 3:numSquares = 6;
        reset();
    });
}