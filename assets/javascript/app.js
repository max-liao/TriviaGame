// This code will run as soon as the page loads
window.onload = function() {
    $("#start").on("click", trivia.start);
    $("#reset").on("click", trivia.reset);
    $("#stop").on("click", trivia.stop);
    $("#test").on("click", trivia.test);
    $("#true").on("click", trivia.true);
    $("#false").on("click", trivia.false);
  };

var clock;

const response = new URL('http://www.omdbapi.com/?t=frozen&apikey=trilogy');

var questions = {
  one: ['This is a true/false question', true],
  two: ['The President won the popular vote', false],
  three: ['I am a dog', false],
  four: ['The President lost the popular vote', true],
  five: ['There is one sun', true],
};

// Get the size of an object
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

var trivia = {
    name: "trivia game",
    clockRunning: false,
    time: 30,
    answer: false,
    correct: 0,
    incorrect: 0,
    i: 0,
    size: Object.size(questions),
    
    test: function(){

      // var size = Object.size(questions);
      // console.log(trivia.size);      
      // [key, value] = Object.entries(questions)[0];
      // console.log(key);
      // console.log(value[1]);
      
      // for (i = 0; i < size; i++){
      // }

    },

    question: function(index){
      [key, value] = Object.entries(questions)[index];
      $("#questions").html("Question: <br />" + value[0]);
      trivia.answer = value[1];

      // [key, value] = Object.entries(questions)[1];
      // console.log(key);
    },
    
    true: function(size){
      if (trivia.clockRunning){
        if (trivia.answer == true){
          console.log("Correct!");
          trivia.correct++;
        } else {
          console.log("Incorrect!");
          trivia.incorrect++;
        }
        trivia.question(trivia.i);
        if (trivia.i < (trivia.size-1)){
          trivia.i++;
        } else{
          console.log("Out of questions - resetting!");
          trivia.displayscore();
        }
      }
    },
    
    false: function(size){
      if (trivia.clockRunning){
        if (trivia.answer == false){
          console.log("Correct!");
          trivia.correct++;
        } else {
          console.log("Incorrect!");
          trivia.incorrect++;
        }
        if (trivia.i < (trivia.size-1)){
          trivia.i++;
        } else {
          trivia.displayscore();
          console.log("Out of questions - resetting!");
        }
        trivia.question(trivia.i);
      }
    },

    reset: function(){
        // $("div#questions").replaceWith("<div id='tester'> Click start to play again! </div>");
        // $("#questions").replaceWith("<div id='tester'> Click start to play again! </div>");
        
        $("#questions").text("Click start to play again!");
        if (trivia.correct > 0 || trivia.incorrect >0){$("#results").html("Correct answers: " + trivia.correct + "<br /> Incorrect answers: " + trivia.incorrect);}
   
        trivia.stop();
        trivia.clockRunning = false;
        trivia.time = 30;
        trivia.i = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        $("#display").text("Game Over");


    },

    start: function(){
      $("#results").text("");
      if (!trivia.clockRunning) {
        clock = setInterval(trivia.count, 1000);
        trivia.clockRunning = true;
      }
      $("#display").text("Playing Trivia game");
      trivia.question(trivia.i);
    },

    stop: function() {
        // Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(clock);
        trivia.clockRunning = false;
    },

    displayscore: function(){
      trivia.clockRunning = false;
      $("#results").html("Correct answers: " + trivia.correct + "<br /> Incorrect answers: " + trivia.incorrect);
      // debugger;
      setTimeout(trivia.reset(),10000);
    },

    count: function() {
        // decrement time by 1, remember we cant use "this" here.
        trivia.time--;

        // Get the current time, pass that into the timeConverter function and save the result in a variable.
        var converted = trivia.timeConverter(trivia.time);

        // console.log(converted);
        if (converted == "00:00"){
          console.log("TIMEOUT");
          trivia.displayscore();
          // Use the variable we just created to show the converted time in the "display" div.
        } else {$("#display").text(converted);}
    },

    timeConverter: function(t) {
  
      var minutes = Math.floor(t / 60);
      // console.log(minutes);
      var seconds = t - (minutes * 60);
      // console.log(seconds);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
  
      return minutes + ":" + seconds;
    }
}