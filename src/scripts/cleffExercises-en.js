var v_images, b_images, cleff, currentNotePath;
var exercises = [];
var rightAnswers = 0;
var isFirstTry;
var counter = 0;

function Exercise(id, startKey, midiNote, range, name, folderName, noteImageName) {
  this.id = id;
  this.midiNote = midiNote;
  this.octave = setOctave(midiNote);
  this.range = range;
  this.name = name;
  this.folderName = folderName;
  this.currentNotePath = this.folderName + noteImageName;
  this.startKey = startKey;
  this.rightValues = [];
  this.wrongValues = [];
  this.isEvaluated = false;
}

function createExercise(id, options) {
  hideAttentions();
  cleff = options.cleff;
  var number;
  if (cleff === 'violin') {
    images = options.images.filter(function(name) {
      number = parseInt(name.split('_')[1].replace('.png'));
      return number >= 60;
    });
  } else if (cleff === 'bass'){
    images = options.images.filter(function(name) {
      number = parseInt(name.split('_')[1].replace('.png'));
      return number < 60;
    });
  } else {
    images = options.images;
  }

  var randomImageNumber = createRandomNumber(images.length);
  var noteImageName = images[randomImageNumber];

  var noteImageNameParts = noteImageName.split("_");
  var midiNote = parseInt(noteImageNameParts[1].replace('.png'));
  var name = noteImageNameParts[0];

  var exercise = new Exercise(id, options.startKey, midiNote, options.range, name, options.folderName, noteImageName);

  createPiano(id, exercise.startKey, exercise.range)
  exercises.push(exercise);
  resetColors();
  isFirstTry = true;
  return exercise;
}

function createRandomNumber(number) {
  return Math.floor((Math.random() * number));
}

function createPiano(id, startKey, range) {
  var elem = $(id);
  if (range <= 23) {
    elem.width(600);
    elem.height(250);
  }
  else {
    elem.width(800);
    elem.height(200);
/*    elem.attr('margin-left', 0);*/
  }
  elem.klavier({ startKey: startKey, endKey: startKey + range });
}

// evaluate the right keys
function showValue() {
  exercises[exercises.length - 1].isEvaluated = true;
  exercises = exercises.filter(function(exercise) {
    return exercise.isEvaluated;
  })
  // detect the right and wrong keys
  var exercise = exercises[exercises.length - 1];
  var selectedKeys = $(exercise.id).klavier('getSelectedValues');
  var rightValues = [];
  var wrongValues = [];
  for (var i = 0; i < selectedKeys.length; i++) {
    if(selectedKeys[i] === exercise.midiNote){
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
  var question = number === 1 ? "task" : "tasks";
  var evaluation;
  if(percent >= 80) evaluation = "Congratulations!";
  else if (percent < 80 && percent >= 60 && exercises.length > 5) evaluation = "Better practice a little more!";
  else if (percent < 60 && percent >= 40 && exercises.length > 5) evaluation = "You still have some work to do!";
  else if (percent < 40 && exercises.length === 1) evaluation = "Can happen sometimes. Just try it again!";
  else if(percent < 40 && exercises.length > 5) evaluation = "I think you still need help. Find a tutorial on how to read notes...";
  else evaluation = "Try it again...";
  return percent + "% correct from " + number + " " + question + ": " + evaluation;
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

  if (exercise.rightValues.length + exercise.wrongValues.length > 1) {
    $('#attentionText').show();
  }  
}

// reset right and false colors
function resetColors() {
  $('.wrongColor').removeClass('wrongColor');
  $('.rightColor').removeClass('rightColor');
  hideAttentions();
  isFirstTry = false;
}

function hideAttentions() {
  setButtonsVisibility(true, true, true);
  $('#attentionText').hide();
}

function setButtonsVisibility(buttonCheck, buttonReset, buttonNew) {
  if (buttonCheck) $('#check').show();
  else $('#check').hide();
  if (buttonReset) $('#reset').show();
  else $('#reset').hide();
  if (buttonNew) $('#new').show();
  else $('#new').hide();
}

function setOctave(midiNote) {
  if (midiNote >= 36 && midiNote < 48) { return "second octave "; }
  if (midiNote >= 48 && midiNote < 60) { return "third octave "; }
  if (midiNote >= 60 && midiNote < 72) { return "fourth octave "; }
  if (midiNote >= 72 && midiNote < 94) { return "fifth octave "; }
  return "";
}
