x = 0;
y = 0;
screen_width = 0; //Added code
screen_height = 0; //Added code
apple = ""; //Added code
speak_data = ""; //Added code
to_number = "";
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  apple = loadImage("apple.png"); //Added code
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

  console.log(event); 

  content = event.results[0][0].transcript;
  to_number = Number(content); //Added code

  if(Number.isInteger(to_number)){ //Added code
    document.getElementById("status").innerHTML = "Started drawing apple.";
    draw_apple = "set";
  }
  else{ //Added code
    document.getElementById("status").innerHTML = "The speech has not recognised a number.";
  }

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
}

function setup() {
  screen_width = window.innerWidth; //Added code
  screen_height = window.innerHeight; //Added code

  createCanvas(screen_width, screen_height-150); //Added code. We are deducting 150 from height to give the spacing between the Draw button and the canvas.
}

function draw() {
  if(draw_apple == "set") //Added code + everything inside
  {
    for(let i = 1; i <= to_number; i++){
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    speak_data = to_number + "Apples drawn";
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
