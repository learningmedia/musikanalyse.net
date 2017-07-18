var images, gbChiffres;
var exercises = [];
var rightAnswers = 0;
var isFirstTry;

function Exercise(id, startMidiValue, startKey, keyName, chiffre, folderName, noteImagePath, chiffreImagePath) {
	this.id = id;
	this.options = options;
	// helper collections to evaluate the right ps set values
	this.specialSharpCases = ['cis', 'dis', 'fis', 'gis'];
	this.specialFlatCases = ['des', 'es', 'as'];
	this.majorThird = ['c', 'f', 'g'];
	this.minorThird = ['d', 'e', 'a', 'h'];
	// class attributes
	this.startMidiValue = startMidiValue;
	this.folderName = folderName;
	this.noteImagePath = this.folderName + noteImagePath;
  this.chiffreImagePath = this.folderName + chiffreImagePath;
  this.startKey = this.startMidiValue + startKey; // the name of the note (first part of note image name)
  this.keyName = keyName; // the second part of note image name
  this.chiffre = this._createArray(chiffre); // an array from the gbChiffre image name
  this.pcSetValues = this._createSpecialArray(chiffre);
  this.rightValues = [];
  this.wrongValues = [];
}

Exercise.prototype._createArray = function(value) {
	var parts = value.split('-');
	var arr = [];
	for (var i = 0; i < parts.length; i++) {
		arr.push(parts[i]);
	}
	return arr;
};

Exercise.prototype._createSpecialArray = function(value) {

  // set some flags
  var keyNameIsSharp = this.specialSharpCases.indexOf(this.keyName) >= 0; // 'cis', 'dis', 'fis', 'gis'
  var keyNameIsFlat = this.specialFlatCases.indexOf(this.keyName) >= 0; // 'des', 'es', 'as'
  var firstThirdIsMajor = this.majorThird.indexOf(this.keyName) >= 0; // 'c', 'f', 'g'
  var firstThirdIsMinor = this.minorThird.indexOf(this.keyName) >= 0; // 'd', 'e', 'a', 'h'

  // cases for chromatic mi- od fa-character
  if (keyNameIsSharp) {
    if (createRandomNumber(2) === 0) {
     this._setChiffreAndChiffreImagePath('0');
     this.chiffre = ['3', '6'];
     return this._setMidiValues([0, 3, 8]);
    } else {
     this._setChiffreAndChiffreImagePath('5flat');
     return this._setMidiValues([0, 3, 6, 8]);
    }
  }
	if (keyNameIsFlat) {
    if (createRandomNumber(2) === 0) {
      this._setChiffreAndChiffreImagePath('0');
    } else {
      this._setChiffreAndChiffreImagePath('3-6');
    }
    return this._setMidiValues([0, 4, 9]);
  }

  // only for # and b
  if ('sharp' === value && !keyNameIsSharp && !keyNameIsFlat) {
    return this._setMidiValues([0, 4, 7]);
  }
  if ('flat' === value && !keyNameIsSharp && !keyNameIsFlat) {
  	if(this._isKeyNameInCollection(['h'])) { this._setChiffreAndChiffreImagePath('6'); return this._setMidiValues([0, 3, 8]) }; 
    return this._setMidiValues([0, 3, 7]);
  }

  // case for neapolitaner
  if ('3flat-6flat' === value || '3-5flat' === value) return this._setNeapolitanerCases(value);

  // set b-flat values
	if('b' === this.keyName) return this._setBflatValues(value);

  // set other chiffre values
	switch(value) {
		case '0':
		case '5':
		case '3-5':
			if(this._isKeyNameInCollection(['h', 'e'])) { this._setChiffreAndChiffreImagePath('0'); return this._setMidiValues([0, 3, 8]); };
			return firstThirdIsMajor ? this._setMidiValues([0, 4, 7]) : this._setMidiValues([0, 3, 7]);
		case '6':
		case '3-6':
			if(this._isKeyNameInCollection(['d'])) return this._setMidiValues([0, 3, 9]);
			return firstThirdIsMajor ? this._setMidiValues([0, 4, 9]) : this._setMidiValues([0, 3, 8]);
		case '4':
		case '4-5':
			if(this._isKeyNameInCollection(['h'])) { this._setChiffreAndChiffreImagePath('6'); return this._setMidiValues([0, 3, 8]); }
			if(this._isKeyNameInCollection(['f'])) { this._setChiffreAndChiffreImagePath('4sharp'); return this._setMidiValues([0, 2, 6, 9]) }
			return this._setMidiValues([0, 5, 7]);
    case '5flat':
      if(this._isKeyNameInCollection(['c', 'f', 'g', 'b'])) { this._setChiffreAndChiffreImagePath('5'); return this._setMidiValues([0, 4, 7]); }
      if(this._isKeyNameInCollection(['d'])) { this._setChiffreAndChiffreImagePath('5'); return this._setMidiValues([0, 3, 7]); }
      return this._setMidiValues([0, 3, 6, 8]);
		case '4-6':
			if(this._isKeyNameInCollection(['f'])) return this._setMidiValues([0, 6, 9]);
			if(this._isKeyNameInCollection(['d'])) return this._setMidiValues([0, 5, 9]);
			return firstThirdIsMajor ?  this._setMidiValues([0, 5, 9]) : this._setMidiValues([0, 5, 8]);
		case '2':
		case '2-4':
		case '2-4-6':
			if(this._isKeyNameInCollection(['c', 'd', 'g'])) return this._setMidiValues([0, 2, 5, 9]);
			if(this._isKeyNameInCollection(['e', 'h'])) return this._setMidiValues([0, 1, 5, 8]);
			if(this._isKeyNameInCollection(['f'])) return this._setMidiValues([0, 2, 6, 9]);
			if(this._isKeyNameInCollection(['a'])) return this._setMidiValues([0, 2, 5, 8]);
		case '4sharp':
		case '2-4sharp':
		case '2-4sharp-6':
			if(this._isKeyNameInCollection(['e', 'h'])) { this._setChiffreAndChiffreImagePath('2'); return this._setMidiValues([0, 1, 5, 8]); }
			return this._setMidiValues([0, 2, 6, 9]);
		case '3-4-6':
			if(this._isKeyNameInCollection(['f'])) return this._setMidiValues([0, 4, 6, 9]);
			if(this._isKeyNameInCollection(['d'])) return this._setMidiValues([0, 3, 5, 9]);
			return firstThirdIsMajor ? this._setMidiValues([0, 4, 5, 9]) : this._setMidiValues([0, 3, 5, 8]);
		case '6sharp':
		case '3-6sharp':
			if(this._isKeyNameInCollection(['c', 'g', 'f'])) return this._setMidiValues([0, 4, 10]);
			if(this._isKeyNameInCollection(['d'])) this._setChiffreAndChiffreImagePath('3-6');
			return this._setMidiValues([0, 3, 9])
		case '3-4-6sharp':
      if(this._isKeyNameInCollection(['f'])) { this._setChiffreAndChiffreImagePath('3-4-6'); return this._setMidiValues([0, 4, 6, 9]); }
      if(this._isKeyNameInCollection(['g'])) { this._setChiffreAndChiffreImagePath('3-4-6'); return this._setMidiValues([0, 4, 5, 9]); }
			if(this._isKeyNameInCollection(['d'])) this._setChiffreAndChiffreImagePath('3-4-6');
			return this._setMidiValues([0, 3, 5, 9])
		case '2-4-7':
			if (this._isKeyNameInCollection(['e', 'h'])) return this._setMidiValues([0, 1, 5, 10]);
			if (this._isKeyNameInCollection(['c'])) return this._setMidiValues([0, 2, 5, 11]);
			if (this._isKeyNameInCollection(['f'])) { this._setChiffreAndChiffreImagePath('2-4flat-7'); return this._setMidiValues([0, 2, 5, 11]); }
			return this._setMidiValues([0, 2, 5, 10]);
		case '2-4-7sharp':
			if (this._isKeyNameInCollection(['e', 'h'])) { this._setChiffreAndChiffreImagePath('2-4-7'); return this._setMidiValues([0, 1, 5, 10]); }
			if (this._isKeyNameInCollection(['f'])) { this._setChiffreAndChiffreImagePath('2-4flat-7'); return this._setMidiValues([0, 2, 5, 11]); }
			return this._setMidiValues([0, 2, 5, 11]);
		case '2-5-7':
			if (this._isKeyNameInCollection(['e'])) return this._setMidiValues([0, 1, 7, 10]);
			if (this._isKeyNameInCollection(['h'])) return this._setMidiValues([0, 1, 6, 10]);
			if (this._isKeyNameInCollection(['c', 'f'])) return this._setMidiValues([0, 2, 7, 11]);
			return this._setMidiValues([0, 2, 7, 10]);
		case '7':
		case '5-7':
		case '3-5-7':
			if (this._isKeyNameInCollection(['c', 'f'])) return this._setMidiValues([0, 4, 7, 11]);
			if (this._isKeyNameInCollection(['h'])) return this._setMidiValues([0, 3, 6, 10]);
			if (this._isKeyNameInCollection(['g'])) return this._setMidiValues([0, 4, 7, 10]);
			if (this._isKeyNameInCollection(['c', 'f'])) return this._setMidiValues([0, 2, 7, 11]);
			return this._setMidiValues([0, 3, 7, 10]);
		case 'sharp-7':
			if (this._isKeyNameInCollection(['c', 'f'])) { this._setChiffreAndChiffreImagePath('7'); return this._setMidiValues([0, 4, 7, 11]); }
			if (this._isKeyNameInCollection(['h'])) { this._setChiffreAndChiffreImagePath('7'); return this._setMidiValues([0, 3, 6, 10]); }
			return this._setMidiValues([0, 4, 7, 10]);
		case 'flat-7':
			if (this._isKeyNameInCollection(['c', 'f'])) { this._setChiffreAndChiffreImagePath('7'); return this._setMidiValues([0, 3, 7, 11]); }
			if (this._isKeyNameInCollection(['h'])) { this._setChiffreAndChiffreImagePath('7'); return this._setMidiValues([0, 3, 6, 10]); }
			return this._setMidiValues([0, 3, 7, 10]);
		default:
			break;
	}
};

Exercise.prototype._setBflatValues = function(value) {
	if('b' === this.keyName) {
    switch(value) {
    case '4-6':
      this._setChiffreAndChiffreImagePath('2-4sharp');
      return this._setMidiValues([0, 2, 6, 9]);
    case '2':
    case '2-4':
    case '2-4-6':
    case '4sharp':
    case '2-4sharp':
    case '2-4sharp-6':
      return this._setMidiValues([0, 2, 6, 9])
    case '3-4-6':
      return this._setMidiValues([0, 4, 6, 9]);
    case '2-5-7':
      return this._setMidiValues([0, 2, 7, 11]);
    case '2-4-7':
    case '2-4-7sharp':
      this._setChiffreAndChiffreImagePath('2-4flat-7');
      return this._setMidiValues([0, 2, 5, 11]);
    case '6sharp':
    case '3-6sharp':
      return this._setMidiValues([0, 4, 10]);
    case '7':
    case '5-7':
    case '3-5-7':
    	return this._setMidiValues([0, 4, 7, 11]);
    case '5flat':
      this._setChiffreAndChiffreImagePath('2-4sharp-6');
      return this._setMidiValues([0, 2, 6, 9]);
    case 'sharp-7flat':
    	return this._setMidiValues([0, 4, 7, 10]);
    case 'flat-7':
    	this._setChiffreAndChiffreImagePath('sharp-7flat');
    	return this._setMidiValues([0, 4, 7, 10]);
    default:
      this._setChiffreAndChiffreImagePath('0');
      return this._setMidiValues([0, 4, 9]);
    }
  }
};

Exercise.prototype._setNeapolitanerCases = function(value) {
	if ('3flat-6flat' === value) {
		this.noteImagePath = this.folderName + '5_f.png';
		this.startKey = 65;
		this.keyName = 'f';
		return this._setMidiValues([0, 3, 8]);
	}
	if ('3-5flat' === value) {
		this.noteImagePath = this.folderName + '1_des.png';
		this.startKey = 61;
		this.keyName = '';
		return this._setMidiValues([0, 4, 7]);
	}
};

Exercise.prototype._setNeapolitanerCases = function(value) {
	if ('3flat-6flat' === value) { 
		this.noteImagePath = this.folderName + '5_f.png'; 
		this.startKey = 65;
		this.keyName = 'f';
		return this._setMidiValues([0, 3, 8]); 
	}
	if ('3-5flat' === value) { 
		this.noteImagePath = this.folderName + '1_des.png'; 
		this.startKey = 61;
		this.keyName = '';
		return this._setMidiValues([0, 4, 7]);  
	}
};

Exercise.prototype._setMidiValues = function(values) {
	var newValues = [];
	for (var i = 0; i < values.length; i++) {
		newValues.push(this.startKey + values[i]);
	}
	return newValues;
};

Exercise.prototype._isKeyNameInCollection = function(keyNameCollection) {
	for (var i = 0; i < keyNameCollection.length; i++) {
		if(keyNameCollection[i] === this.keyName) return true;
	}
	return false;
};

Exercise.prototype._setChiffreAndChiffreImagePath = function(imageName) {
	this.chiffre = imageName.split('-');
	this.chiffreImagePath = this.folderName + imageName + '.png';
};

function createExercise(id, options) {
	hideAttentions();
	images = options.images;
	gbChiffres = options.gbChiffres;

	var randomImageNumber = createRandomNumber(images.length);
	var noteImageName = images[randomImageNumber];

	var noteImageNameParts = noteImageName.split("_");
	var startKey = parseInt(noteImageNameParts[0], 10);
	var keyName = noteImageNameParts[1].replace('.png', '');

	var randomGbNumber = createRandomNumber(gbChiffres.length);
	var chiffreImageName = gbChiffres[randomGbNumber];
	var chiffre = chiffreImageName.replace('.png', '');

	var exercise = new Exercise(id, options.startMidiValue, startKey, keyName, chiffre, options.folderName, noteImageName, chiffreImageName);

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
	$(id).klavier({ startKey: 60, endKey: 95 });
  $(id).klavier('setSelectedValues', startKey + '');
}

// evaluate the right keys
function showValue() {
	var exercise = exercises[exercises.length -1];
	var selectedKeys = $(exercise.id).klavier('getSelectedValues');

	// delete the bass tone from the selection
	var startKey = exercise.startKey;
	var pcSetValues = exercise.pcSetValues;
	var index = selectedKeys.indexOf(startKey);
	selectedKeys.splice(index, 1);

	// detect right and wrong keys
	var rightValues = [];
	var wrongValues = [];
	for (var i = 0; i < selectedKeys.length; i++) {
		if(evaluateValue(selectedKeys[i], pcSetValues, startKey)){
			rightValues.push(selectedKeys[i]);
		} else {
			wrongValues.push(selectedKeys[i]);
		}
	}
	exercise.rightValues = rightValues;
	exercise.wrongValues = wrongValues;

	if (exercise.wrongValues.length === 0 && isFirstTry) {
		rightAnswers++;
	}

	$('#statistic').text(getFeedBack(rightAnswers, exercises));

	if (rightValues.length < exercise.pcSetValues.length - 1)
			$('#exercise-incomplete').show();

	// set colors fpr right and wrong keys
	setColors(exercise);

	// check the playability
	checkPlayability(selectedKeys);

	// check for doubled leading tones
	checkFordoubledLeadingTones(selectedKeys)

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

// detect right keys in diffrent octave spaces
function evaluateValue(value, pcSetValues, startkey) {
	while ((value - 12) >= startkey) {
		value = value - 12;
	}
	return pcSetValues.indexOf(value) >= 0;
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

// check the playability of sets
function checkPlayability(selectedKeys) {
	if (selectedKeys.length < 2) return;
	var first = selectedKeys[0];
	var last = selectedKeys[selectedKeys.length - 1];
	var result = last - first;
	if (result > 12) {
		$('#exercise-unplayable').show();
	} else {
		$('#exercise-unplayable').hide();
	}
}

// Check the playability of sets
function checkFordoubledLeadingTones(selectedKeys) {
	var exercise = exercises[exercises.length - 1];
	var sharpNote = exercise.specialSharpCases.indexOf(exercise.keyName) >= 0;
	var isDominant = checkDominant(exercise);
	if(!sharpNote && !isDominant) return;
	var hasdoubledSharpNote = false;
	var hValue = exercise.startMidiValue + 11;
	var counter = 0;
	for (var i = 0; i < selectedKeys.length; i++) {
		var tempValue = selectedKeys[i];
		while (tempValue >= exercise.startKey) {
			if(tempValue === hValue) counter++;
			if(tempValue === exercise.startKey) hasdoubledSharpNote = true;
			tempValue = tempValue - 12;
		}
	}
	hasdoubledSharpNote = (hasdoubledSharpNote || (isDominant && counter > 1))
	var leadingToneId = '#exercise-doubleLeadingTone';
	if (hasdoubledSharpNote) {
		$(leadingToneId).show();
	} else {
		$(leadingToneId).hide();
	}
}

function checkDominant(exercise) {
	return false;
}
