var gamePattern = [];
var userPattern = [];
var currentLevel = 0;

function buttonAnimation(boja) {
  var activeButton = $("." + boja);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}

function buttonAnimation1(number) {
  var boja;
  switch (number) {
    case 1:
      boja = "green";
      break;
    case 2:
      boja = "red";
      break;
    case 3:
      boja = "yellow";
      break;
    case 4:
      boja = "blue";
      break;
    default:
      console.log("Nepoznata boja");
  }
  var activeButton = $("." + boja);
  activeButton.addClass("visibility");
  setTimeout(function() {
    activeButton.removeClass("visibility");
  }, 200);
}

$("body").keydown(function(){
    if(currentLevel === 0){
      currentLevel++;
      $("h1").text("Level " + currentLevel);
      game();
    }
  });

function game() {
  var number = Math.floor((Math.random())*4+1);
  buttonAnimation1(number);
  gamePattern.push(number);

  $(".btn").off("click").on("click", function(event){
    var boja = event.target.id;
    buttonAnimation(boja);
    switch(boja) {
      case "green":
        userPattern.push(1);
        var green = new Audio("sounds/green.mp3");
        green.play();
        break;
      case "red":
        userPattern.push(2);
        var red = new Audio("sounds/red.mp3");
        red.play();
        break;
      case "yellow":
        userPattern.push(3);
        var yellow = new Audio("sounds/yellow.mp3");
        yellow.play();
        break;
      case "blue":
        userPattern.push(4);
        var blue = new Audio("sounds/blue.mp3");
        blue.play();blue
        break;
      default:
        console.log(boja);
    }
    var check = 0;
    if(userPattern.length === currentLevel) {
      var isTrue = true;
      for(var i = 0; i<currentLevel;i++){
        if(userPattern[i] !== gamePattern[i]){
          isTrue = false
          break;
        }
      }
    }
      if(isTrue){
        currentLevel++;
        $("h1").text("Level " + currentLevel);
        check = 1;
      }
      else {
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 500);
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        currentLevel = 0;
        userPattern = [];
        gamePattern = [];
      }

      ponoviIgru(check);
  });
}

function ponoviIgru(check) {
  if(check === 1) {
    game();
  }
}
