/* Store game status, player name, scores and results */
let gameStarted = false;
let playerName = "";

let wins = 0;
let losses = 0;
let draws = 0;

let results = [];

// Start the game
function startGame() {
    playerName = document.getElementById("playerName").value.trim();

    // Check if the name is empty
    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;

    // Display welcome message
    document.getElementById("welcome").innerHTML =
        "Welcome, " + playerName + "!";

    // Display game start date and time
    document.getElementById("startTime").innerHTML =
        "Game started on: " + new Date();

    document.getElementById("result").innerHTML =
        "Choose Rock, Paper or Scissors.";

    document.getElementById("summary").innerHTML = "";
}

// Generate a random computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];

    const randomIndex = Math.floor(Math.random() * 3);

    return choices[randomIndex];
}

// Play one round
function playRound(playerChoice) {

    // Check whether the game has started
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    // Get computer choice
    const computerChoice = getComputerChoice();

    let roundResult;

    // Check for draw
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
    }

    // Check for player win
    else if (
        (playerChoice === "rock" &&
         computerChoice === "scissors") ||

        (playerChoice === "scissors" &&
         computerChoice === "paper") ||

        (playerChoice === "paper" &&
         computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
    }

    // Otherwise, the computer wins
    else {
        roundResult = "Lose";
        losses++;
    }

    // Change player image
    document.getElementById("playerImg").src =
        playerChoice + ".png";

    // Change computer image
    document.getElementById("computerImg").src =
        computerChoice + ".png";

    // Display result message
    const resultElement = document.getElementById("result");

    resultElement.innerHTML =
        playerName + " chose " + playerChoice +
        ". Computer chose " + computerChoice +
        ". Result: " + roundResult;

    // Change result colour
    if (roundResult === "Win") {
        resultElement.style.color = "green";
    }

    else if (roundResult === "Lose") {
        resultElement.style.color = "red";
    }

    else {
        resultElement.style.color = "grey";
    }

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in array
    results.push(roundResult);

    // Add a new row to the history table
    const roundNumber = results.length;

    document.getElementById("historyBody").innerHTML +=
        "<tr>" +
        "<td>" + roundNumber + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + roundResult + "</td>" +
        "</tr>";

    document.getElementById("summary").innerHTML = "";
}

// Show game summary
function showSummary() {

    // Check whether the game has started
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let totalWins = 0;

    // Count the number of wins using a for loop
    for (let i = 0; i < results.length; i++) {

        if (results[i] === "Win") {
            totalWins++;
        }
    }

    // Calculate total rounds
    const roundsPlayed = results.length;

    let winPercentage = 0;

    // Calculate win percentage
    if (roundsPlayed > 0) {
        winPercentage = Math.round(
            (totalWins / roundsPlayed) * 100
        );
    }

    // Display summary
    document.getElementById("summary").innerHTML =
        "You played " + roundsPlayed +
        " rounds and won " + winPercentage + "%.";
}

// Reset the game
function resetGame() {

    gameStarted = false;
    playerName = "";

    wins = 0;
    losses = 0;
    draws = 0;

    results = [];

    // Clear name input
    document.getElementById("playerName").value = "";

    // Clear welcome and result messages
    document.getElementById("welcome").innerHTML = "";

    document.getElementById("result").innerHTML =
        "Start the game to play.";

    document.getElementById("result").style.color = "black";

    // Reset scoreboard
    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";

    // Clear history and summary
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("summary").innerHTML = "";

    // Clear start time
    document.getElementById("startTime").innerHTML = "";

    // Reset images
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}
