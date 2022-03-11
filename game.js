var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//store user color selection  on every click
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


//create random number
//create random color button
//animation to let user know which button is correct
//play the sound of the button
//create a new array of user click sequences
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);

    playSound(randomChosenColour);


}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    //add the pressed css class to button and remove it after 150 milisec
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 150);
}

//to start game with a button
$(document).on("keydown", function () {
    if (!started) {
        nextSequence();
        $("h1").text("Level " + level);
        started = true;
    }
});


//pass in the currentLevel
//check if the last input is correct
//check is the amount of input is correct
//call the next sequence
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        //add game-over css class to body
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver()
    }
}

//reset the level to 0 and gamePatter to empty array
function startOver(){
     level=0;
    gamePattern=[];
    started=false;

}