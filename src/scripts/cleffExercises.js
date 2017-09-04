var v_images, b_images, cleff, currentNotePath;
var exercises = [];
var rightAnswers = 0;
var isFirstTry;

function Exercise(id, startMidiValue, pc, name, folderName, noteImageName) {
  this.id = id;
  this.startMidiValue = startMidiValue;
  this.pc = pc;
  this.name = name;
  this.folderName = folderName;
  this.currentNotePath = this.folderName + noteImageName;
  this.startKey = this.startMidiValue;
  this.rightValues = [];
  this.wrongValues = [];
}

function createExercise(id, options) {
  hideAttentions();  
  cleff = options.cleff;

  if (cleff === 'violin') {
    images = options.images.filter(function(name) {
      return name.split('_')[2] === 'v.png';
    });
  } else if (cleff === 'bass'){
    images = options.images.filter(function(name) {
      return name.split('_')[2] === 'b.pmg';
    });
  } else {
    images = options.images;
  }
  
  var randomImageNumber = createRandomNumber(images.length);
  var noteImageName = images[randomImageNumber];

  var noteImageNameParts = noteImageName.split("_");
  var pc = parseInt(noteImageNameParts[0], 10);
  var name = noteImageNameParts[1];

  var exercise = new Exercise(id, options.startMidiValue, pc, name, options.folderName, noteImageName);

  createPiano(id, exercise.startKey)
  exercises.push(exercise);
  resetColors();
  isFirstTry = true;
  return exercise;
}

function createRandomNumber(number) {
  return Math.floor((Math.random() * number));
}

function createPiano(id, startKey) {
  $(id).klavier({ startKey: startKey, endKey: startKey + 23 });
}

// evaluate the right keys
function showValue() {
  var exercise = exercises[exercises.length -1];
  var selectedKeys = $(exercise.id).klavier('getSelectedValues');

  // detect the right and wrong keys
  var rightValues = [];
  var wrongValues = [];
  for (var i = 0; i < selectedKeys.length; i++) {
    if(selectedKeys[i] === exercise.startMidiValue + exercise.pc){
      rightValues.push(selectedKeys[i]);
    } else {
      wrongValues.push(selectedKeys[i]);
    }
  }
  exercise.rightValues = rightValues;
  exercise.wrongValues = wrongValues;

  if (exercise.wrongValues.length === 0 && exercise.rightValues.length === 1 && isFirstTry) {
    rightAnswers++;
  }

  $('#statistic').text(getFeedBack(rightAnswers, exercises));

  // set colors for right and wrong keys
  setColors(exercise);
  setButtonsVisibility(false, true, true);

}

function getFeedBack(rightAnswers, exercises) {
  var number = exercises.length;
  var percent = Math.round((rightAnswers / number) * 100);
  var question = number === 1 ? "Aufgabe" : "Aufgaben";
  var evaluation;
  if(percent >= 80) evaluation = "Gratulation!";
  else if (percent < 80 && percent >= 60 && exercises.length > 5) evaluation = "Üben Sie lieber noch ein bisschen!";
  else if (percent < 60 && percent >= 40 && exercises.length > 5) evaluation = "Sie haben noch einiges zu tun!";
  else if (percent < 40 && exercises.length === 1) evaluation = "Kann mal passieren. Probieren Sie es einfach noch einmal!";
  else if(percent < 40 && exercises.length > 5) evaluation = "Ich glaube, Sie sollten lieber die Anleitung oben noch einmal lesen :)";
  else evaluation = "Versuchen Sie es noch einmal...";
  return percent + "% richtig von " + number + " " + question + ": " + evaluation;
}

// set right an wrong colors on the JQuery-Piano
function setColors(exercise) {
  exercise.wrongValues.forEach(function(element, index, array) {
    var searchId = " > .klavier-key[data-value=" + element + "]";
    var wrongKey = $(exercise.id + searchId);
    wrongKey.removeClass('klavier-selected-key');
    wrongKey.addClass('wrongColor');
  });
  exercise.rightValues.forEach(function(element, index, array) {
    var searchId = " > .klavier-key[data-value=" + element + "]";
    var rightKey = $(exercise.id + searchId);
    rightKey.removeClass('klavier-selected-key');
    rightKey.addClass('rightColor');
  });
}

// reset right and false colors
function resetColors() {
  $('.wrongColor').removeClass('wrongColor');
  $('.rightColor').removeClass('rightColor');
  hideAttentions();
  isFirstTry = false;
}

function hideAttentions() {
  $('#exercise-doubleLeadingTone').hide();
  $('#exercise-unplayable').hide();
  $('#exercise-incomplete').hide();
  setButtonsVisibility(true, true, true);
}

function setButtonsVisibility(buttonCheck, buttonReset, buttonNew) {
  if (buttonCheck) $('#check').show();
  else $('#check').hide();
  if (buttonReset) $('#reset').show();
  else $('#reset').hide();
  if (buttonNew) $('#new').show();
  else $('#new').hide();
}