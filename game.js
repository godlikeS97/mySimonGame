var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var isGameStart = 0;
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);

    // select a random color
    var randomChosenColour = buttonColours[randomNumber];

    // append randomChosenColour to gamePattern
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level ++;
    $("h1").text("Level " + level);
    


}


$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    console.log(userClickedPattern);
    
    checkAnswer(userClickedPattern.length - 1);
});


$(document).keydown(function(event) {
    if (isGameStart === 0) {
        nextSequence();
    }
    isGameStart = 1;
});



function playSound(name) {
    var aud = new Audio("./sounds/" + name + ".mp3");
    aud.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");    
    }, 100);
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success!");

        // step into next level
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(function(){
                nextSequence();    
            }, 1000);
            userClickedPattern = [];
        }

    } else {
        console.log("fail!");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");    
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
        
    }
}

function startOver() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    isGameStart = 0;
}