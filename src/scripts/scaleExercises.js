var images, gbChiffres;
var scales = [];
var exercises = [];
var rightAnswers = 0;
var isFirstTry;

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Exercise(id, pianoRoot, scaleRoot, scale) {
	this.id = id;
  this.pianoRoot = pianoRoot;
  this.scaleRoot = pianoRoot + scaleRoot;
	this.scale = scale;
  this.genus = capitalize(scale.name);
  this.values = this._setMidiValues(this.scaleRoot, this.scale.structure);
  this.wrongValues = [];
  this.rightValues = [];
  this.rootLetter = this._createRootLetter(this.scaleRoot - this.pianoRoot, this.scale.name);
}

Exercise.prototype._setMidiValues = function(scaleRoot, values) {
	var newValues = [];
  newValues.push(scaleRoot);
  var temp = scaleRoot;
	for (var i = 0; i < values.length; i++) {
		newValues.push(temp + values[i]);
    temp += values[i];
	}
	return newValues;
};

Exercise.prototype._createRootLetter = function(scaleRoot, name) {
  var shifter = Math.floor((Math.random() * 2) + 1) === 1;
  var letter;
	switch(scaleRoot) {
    case 0:
      letter = 'c';
      break;
    case 1:
      letter = shifter ? 'cis' : 'des';
      break;
    case 2:
      letter = 'd';
      break;
    case 3:
      letter = shifter ? 'dis' : 'es';
      break;
    case 4:
      letter = 'e';
      break;
    case 5:
      letter = 'f';
      break;
    case 6:
      letter = shifter ? 'fis' : 'ges';
      break;
    case 7:
      letter = 'g';
      break;
    case 8:
      letter = shifter ? 'gis' : 'as';
      break;
    case 9:
      letter = 'a';
      break;
    case 10:
      letter = shifter ? 'ais' : 'b';
      break;
    case 11:
      letter = 'h';
      break;
  }
  switch(name) {
      case 'dur':
        letter = capitalize(letter);
        break;
      default:
        break;
  }
  return letter;
}

function createExercise(id, options) {
	scale = options.scales[generateRandomNumber(options.scales.length)];
	var exercise = new Exercise(id, 60, generateRandomNumber(11), scale);
	createPiano(id, exercise.scaleRoot);
	exercises.push(exercise);
	resetColors();
	isFirstTry = true;
  $('#attentionText').text('');
	return exercise;
}

function generateRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

function createPiano(id, scaleRoot) {
	$(id).klavier({ startKey: 60, endKey: 95 });
  $(id).klavier('setSelectedValues', [scaleRoot]);
}

// evaluate the right keys
function showValue() {
	var exercise = exercises[exercises.length -1];
	var selectedKeys = $(exercise.id).klavier('getSelectedValues');

	// delete the bass tone from the structure
  var values = exercise.values.slice(1);

  // delete the selected (root)key
  var index = selectedKeys.indexOf(exercise.scaleRoot);
  if (index >= 0) selectedKeys.splice(index, 1);

	// detect right and wrong keys
	var rightValues = [exercise.scaleRoot];
	var wrongValues = [];
  var key, index;
	for (var i = 0; i < selectedKeys.length; i++) {
		key = selectedKeys[i];
    var index = values.indexOf(key);
    if(index >= 0) rightValues.push(key);
    else wrongValues.push(key);
	}
	exercise.rightValues = rightValues;
	exercise.wrongValues = wrongValues;

  var attentionText = getInputNumberFeedBack(exercise.rightValues.length);
  $('#attentionText').text(attentionText);
	if (exercise.wrongValues.length === 0 && isFirstTry && attentionText.length === 0) {
		rightAnswers++;
	}
  $('#statistic').text(getFeedBack(rightAnswers, exercises));

	// set colors for right and wrong keys
	setColors(exercise);
	setButtonsVisibility(false, true, true);
}

function getInputNumberFeedBack(number) {
  debugger;
  var value = 7 - number;
  if (value === 1)  {
    return "Sie haben leider einen Ton zu wenig angegeben.";
  }
  if (value > 1)  {
    return `Ihre Eingabe ist unvollständig, Sie haben ${value} Töne zu wenig angegeben.`;
  }
  return '';
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

function createRandomNumber(range) {
  return Math.floor(Math.random() * range);
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
	isFirstTry = false;
  setButtonsVisibility(true, true, true);
  var exercise = exercises[exercises.length - 1];
  $(exercise.id).klavier('setSelectedValues', [exercise.scaleRoot]);
}

function setButtonsVisibility(buttonCheck, buttonReset, buttonNew) {
	if (buttonCheck) $('#check').show();
	else $('#check').hide();
	if (buttonReset) $('#reset').show();
	else $('#reset').hide();
	if (buttonNew) $('#new').show();
	else $('#new').hide();
}
