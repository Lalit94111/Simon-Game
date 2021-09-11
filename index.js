var buttoncolors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedpattern=[];
var level=0;
var started=false;

function nextsequence() {
  level++;
  $("h1").text("Level "+level);
  var randomnumber = Math.floor(Math.random() * 4);
  randomchoosencolor = buttoncolors[randomnumber];
  gamepattern.push(randomchoosencolor);
  $("#" + randomchoosencolor).fadeOut(20).fadeIn(20);
  playsound(randomchoosencolor);
  userclickedpattern=[];
}

function checkanswer(currentLevel){
  if(gamepattern[currentLevel]==userclickedpattern[currentLevel]){
    if(gamepattern.length==userclickedpattern.length){
      setTimeout(function(){
        nextsequence();
      },1000);
    }
  }
  else{
    var audio =new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },2000);
    $("h1").text("Game Over, Press Any Key to Restart");
    startover();
  }
}
$(document).keypress(function(){
    if(!started){
      $("#level-title").text("Level "+level);
      nextsequence();
      started=true;
    }
});

$(".btn").click(function(){
  var selectedcolor=$(this).attr("id");
  animatepress(selectedcolor);
  playsound(selectedcolor);
  userclickedpattern.push(selectedcolor);
  checkanswer(userclickedpattern.length-1);
})
function startover(){
  gamepattern=[];
  userclickedpattern=[];
  level=0;
  started=false;
}
function animatepress(name){
  $("#"+name).addClass("pressed");
  setTimeout(function(){
    $("#"+name).removeClass("pressed")
  },100);
}
function playsound(name){
  var soundaddress="sounds/"+name+".mp3";
  var audio =new Audio(soundaddress);
  audio.play();
}
