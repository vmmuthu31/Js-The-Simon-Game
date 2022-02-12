
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).not($(".btn")).click(function(event) {
  if (!$(event.target).closest('.btn').length) {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
    }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animateButton(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var rnum = Math.floor(Math.random()*4);
  var rcc = buttonColours[rnum];
  gamePattern.push(rcc);
  $("#" + rcc).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(rcc);
}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    if(gamePattern.length === userClickedPattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("The Simon Game<br><br>Game Over, Press any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },300)
    startover();
  }
}

function animateButton(name){
  $("#" + name).addClass("pressed");
  setTimeout(function(){
    $("#" + name).removeClass("pressed");
  },100)
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startover()
{
  level = 0;
  gamePattern = [];
  started = false;
}