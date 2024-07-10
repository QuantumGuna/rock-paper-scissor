var you;
var yourScore = 0;
var bot;
var botScore = 0;
var rounds = 0;
var maxRounds = 10;
var playerName = "You";

var choices = ["fist", "palm", "two fing"];

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementById("choices").append(choice);
    }

    // Get the modal
    var modal = document.getElementById("winnerModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        resetGame();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resetGame();
        }
    }

    // Add keypress event listener
    document.addEventListener("keydown", function(event) {
        if (event.key === "1") {
            selectChoiceByKey("fist");
        } else if (event.key === "2") {
            selectChoiceByKey("palm");
        } else if (event.key === "3") {
            selectChoiceByKey("two fing");
        }
    });
}

function selectChoice() {
    you = this.id;
    document.getElementById("your-choice").src = you + ".png";

    playRound();
}

function selectChoiceByKey(choice) {
    you = choice;
    document.getElementById("your-choice").src = you + ".png";

    playRound();
}

function playRound() {
    // Random for opponent
    bot = choices[Math.floor(Math.random() * 3)];
    document.getElementById("bot-choice").src = bot + ".png";

    // Check for winner
    if (you == bot) {
        yourScore += 1;
        botScore += 1;
    } else {
        if (you == "fist") {
            if (bot == "two fing") {
                yourScore += 1;
            } else if (bot == "palm") {
                botScore += 1;
            }
        } else if (you == "two fing") {
            if (bot == "palm") {
                yourScore += 1;
            } else if (bot == "fist") {
                botScore += 1;
            }
        } else if (you == "palm") {
            if (bot == "fist") {
                yourScore += 1;
            } else if (bot == "two fing") {
                botScore += 1;
            }
        }
    }

    rounds++;
    document.getElementById("your-score").innerText = yourScore;
    document.getElementById("bot-score").innerText = botScore;

    if (rounds >= maxRounds) {
        declareWinner();
    }
}

function declareWinner() {
    let winner;
    if (yourScore > botScore) {
        winner = "Congratulations! You win!";
    } else if (botScore > yourScore) {
        winner = "Looser! Bot wins!";
    } else {
        winner = "Ooh! It's a tie!";
    }
    document.getElementById("winnerMessage").innerText = winner;

    // Display the modal
    var modal = document.getElementById("winnerModal");
    modal.style.display = "block";
}

function resetGame() {
    yourScore = 0;
    botScore = 0;
    rounds = 0;
    document.getElementById("your-score").innerText = yourScore;
    document.getElementById("bot-score").innerText = botScore;
}
