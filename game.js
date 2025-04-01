var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

// Function to start game when user clicks/touches
function startGame() {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        $("#restart-btn").addClass("hidden"); // Hide restart button
        newSequence();
    }
}

// Attach event listener for starting the game
$(document).on("click touchstart", startGame);

// Handle button clicks
$('.btn').click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Check if user's input matches the game sequence
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(newSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 500);

        // Show "Game Over" message and restart button
        $("#level-title").text("Game Over");
        $("#restart-btn").removeClass("hidden");

        startOver();
    }
}

// Generate a new step in the sequence
function newSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Play sound for a given button
function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}

// Add button press animation
function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");
    setTimeout(() => $('#' + currentColour).removeClass("pressed"), 100);
}

// Reset the game and wait for new start
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

    // Remove event listener and reattach it when restart button is clicked
    $(document).off("click touchstart", startGame);
    $("#restart-btn").click(function () {
        $(document).on("click touchstart", startGame);
        startGame();
    });
}
