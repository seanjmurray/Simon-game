var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var level = 0

$("body").keyup(function() {
  if (gamePattern.length === 0) {
    nextSequence();
  } else {
    return
  }
});

function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);
  level = level + 1;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
};

$(".btn").click(function(event) {
  var userChosenColor = ($(this).attr("id"));
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswers(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  name = new Audio("sounds/" + name + ".mp3");
  name.play();
}

function checkAnswers(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
};
