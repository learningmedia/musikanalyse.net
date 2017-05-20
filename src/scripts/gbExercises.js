var images, gbChiffres;
var exercises = [];

class Exercise {

  constructor(id, startMidiValue, startKey, keyName, chiffre, folderName, noteImagePath, chiffreImagePath) {

  	this.id = id;
  	this.options = options;
  	// collections to evaluate the right ps set values 
  	this.specialSharpCases = ['cis', 'dis', 'fis', 'gis', 'ais'];
  	this.specialFlatCases = ['des', 'es', 'ges', 'as'];
		this.majorThird = ['c', 'f', 'g', 'b'];
		this.minorThird = ['d', 'e', 'a', 'h'];
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
  _createArray(value) {
		var parts = value.split('-');
		var arr = []; 
		for (var i = 0; i < parts.length; i++) {
			arr.push(parts[i]);
		}
		return arr;
	}
	_createSpecialArray(value) {
		if ('sharp' === value) {
			if (this.majorThird.indexOf(this.keyName) >= 0 || this.minorThird.indexOf(this.keyName) >= 0) return [0 + this.startKey, 4 + this.startKey, 7 + this.startKey]			
			else { value = this._setDefaultValues(); }
		}
		if ('flat' === value) {
			if ((this.majorThird.indexOf(this.keyName) >= 0 || this.minorThird.indexOf(this.keyName) >= 0) && this.keyName !== 'b' && this.keyName !== 'h')
				return [0 + this.startKey, 3 + this.startKey, 7 + this.startKey]			
			else { value = this._setDefaultValues(); }
		}
	  if (this.specialSharpCases.indexOf(this.keyName) >= 0) {
	  	this.chiffreImagePath = this.folderName + "0.png";
	  	this.chiffre = ['3', '6'];
	  	return [0 + this.startKey, 3 + this.startKey, 8 + this.startKey];
	  }
		if (this.specialFlatCases.indexOf(this.keyName) >= 0) {
			this.chiffreImagePath = this.folderName + "0.png";
			this.chiffre = ['3', '6'];
			return [0 + this.startKey, 4 + this.startKey, 9 + this.startKey];
		} 
		switch(value) {
			case '0':
			case '5':
			case '3-5':
				if(this.keyName === 'h' || this.keyName === 'e') { this._setDefaultValues(); return [0 + this.startKey, 3 + this.startKey, 8 + this.startKey] };
				if(this.keyName === 'b') { this._setDefaultValues(); return [0 + this.startKey, 4 + this.startKey, 9 + this.startKey]; }
				return this.majorThird.indexOf(this.keyName) >= 0 ?
				[0 + this.startKey, 4 + this.startKey, 7 + this.startKey] : 
				[0 + this.startKey, 3 + this.startKey, 7 + this.startKey];
			case '6':
			case '3-6':
				if(this.keyName === 'd') return [0 + this.startKey, 3 + this.startKey, 9 + this.startKey];
				return this.majorThird.indexOf(this.keyName) >= 0  ? 
				[0 + this.startKey, 4 + this.startKey, 9 + this.startKey] : 
				[0 + this.startKey, 3 + this.startKey, 8 + this.startKey];
			case '4': 
			case '4-5': 
				if(this.keyName === 'b') { this._setDefaultValues(); return [0 + this.startKey, 4 + this.startKey, 9 + this.startKey]; }
				if(this.keyName === 'h') { this._setDefaultValues(); return [0 + this.startKey, 3 + this.startKey, 8 + this.startKey]; }
				return [0 + this.startKey, 5 + this.startKey, 7 + this.startKey];
			case '4-6':
				if(this.keyName === 'f' || this.keyName === 'b')
					return [0 + this.startKey, 6 + this.startKey, 9 + this.startKey];
				if(this.keyName === 'd') return [0 + this.startKey, 5 + this.startKey, 9 + this.startKey];
				return this.majorThird.indexOf(this.keyName) >= 0 ? 
				[0 + this.startKey, 5 + this.startKey, 9 + this.startKey] : 
				[0 + this.startKey, 5 + this.startKey, 8 + this.startKey];
			case '3-4-6':
				if(this.keyName === 'f' || this.keyName === 'b') 
					return [0 + this.startKey, 4 + this.startKey, 6 + this.startKey, 9 + this.startKey];
				if(this.keyName === 'd') 
					return [0 + this.startKey, 3 + this.startKey, 5 + this.startKey, 9 + this.startKey];
				return this.minorThird.indexOf(this.keyName) >= 0 ? 
				[0 + this.startKey, 3 + this.startKey, 5 + this.startKey, 8 + this.startKey] : 
				[0 + this.startKey, 4 + this.startKey, 5 + this.startKey, 9 + this.startKey];
			case '2':
			case '2-4':
			case '2-4-6':
				if(this.keyName === 'f' || this.keyName === 'b') 
					return [0 + this.startKey, 2 + this.startKey, 6 + this.startKey, 9 + this.startKey];
				if(this.keyName === 'c' || this.keyName === 'd' || this.keyName === 'g') 
					return [0 + this.startKey, 2 + this.startKey, 5 + this.startKey, 9 + this.startKey];
				if(this.keyName === 'e' || this.keyName === 'h') 
					return [0 + this.startKey, 1 + this.startKey, 5 + this.startKey, 8 + this.startKey];
				if(this.keyName === 'a') 
					return [0 + this.startKey, 2 + this.startKey, 5 + this.startKey, 8 + this.startKey];
			default:
				break;
		}
	}
	_setDefaultValues() {
		this.chiffreImagePath = this.folderName + "0.png";
		return '0';
	}
}

function createExercise(id, options) {
	hideAttentions();
	images = options.images;
	gbChiffres = options.gbChiffres;

	var randomImageNumber = Math.floor((Math.random() * images.length));
	var noteImageName = images[randomImageNumber];

	var noteImageNameParts = noteImageName.split("_");
	var startKey = parseInt(noteImageNameParts[0], 10);
	var keyName = noteImageNameParts[1].replace('.png', '');

	var randomGbNumber = Math.floor((Math.random() * gbChiffres.length));
	var chiffreImageName = gbChiffres[randomGbNumber];
	var chiffre = chiffreImageName.replace('.png', '');

	var exercise = new Exercise(id, options.startMidiValue, startKey, keyName, chiffre, options.folderName, noteImageName, chiffreImageName);

	createPiano(id, exercise.startKey)
	exercises.push(exercise);
	resetColors();
	return exercise;
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