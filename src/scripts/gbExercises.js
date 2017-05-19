var images = ["0_c.png", "1_cis.png", "1_des.png", "2_d.png", "3_dis.png", "3_es.png", "4_e.png", "5_f.png", "6_fis.png", "7_g.png", "8_as.png", "8_gis.png", "9_a.png", "10_b.png", "11_h.png"]
// var images = ["62_d.png"]
var gbChiffres = ["0.png", "3-5.png", "3-6.png", "4.png", "4-6.png", "3-4-6.png"]
var exercises = [];

class Exercise {

  constructor(startMidiValue, startKey, keyName, chiffre, folderName, noteImagePath, chiffreImagePath) {
  	// collections to avaluate the right ps set values 
  	this.specialSharpCases = ['cis', 'dis', 'fis', 'gis', 'ais'];
  	this.specialFlatCases = ['des', 'es', 'ges', 'as', 'b'];
		this.majorThird = ['c', 'f', 'g'];
		this.minorThird = ['d', 'e', 'a', 'h'];

		this.startMidiValue = startMidiValue;
		this.folderName = folderName; 
		this.noteImagePath = this.folderName + noteImagePath;
    this.chiffreImagePath = this.folderName + chiffreImagePath;
    this.startKey = this.startMidiValue + startKey; // the first part of note image name
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
			var part = parts[i];
			arr.push(parseInt(part, 10));
		}
		return arr;
	}

_createSpecialArray(value) {
	  if (this.specialSharpCases.indexOf(this.keyName) >= 0) {
	  	this.chiffreImagePath = this.folderName + "0.png";
	  	this.chiffre = [3, 6];
	  	return [0 + this.startKey, 3 + this.startKey, 8 + this.startKey];
	  }
		if (this.specialFlatCases.indexOf(this.keyName) >= 0) {
			this.chiffreImagePath = this.folderName + "0.png";
			this.chiffre = [3, 6];
			return [0 + this.startKey, 4 + this.startKey, 9 + this.startKey];
		} 
		switch(value) {
			case '3-5':
			case '0':
				if(this.keyName === 'h' || this.keyName === 'e') return [0 + this.startKey, 3 + this.startKey, 8 + this.startKey];
				return this.majorThird.indexOf(this.keyName) >= 0 ? 
				[0 + this.startKey, 4 + this.startKey, 7 + this.startKey] : 
				[0 + this.startKey, 3 + this.startKey, 7 + this.startKey];
			case '3-6':
				if(this.keyName === 'd') return [0 + this.startKey, 3 + this.startKey, 9 + this.startKey];
				return this.majorThird.indexOf(this.keyName) >= 0  ? 
				[0 + this.startKey, 4 + this.startKey, 9 + this.startKey] : 
				[0 + this.startKey, 3 + this.startKey, 8 + this.startKey];
			case '4': 
			case '4-5': 
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
				if(this.keyName === 'd') return [0 + this.startKey, 3 + this.startKey, 5 + this.startKey, 9 + this.startKey];
				return this.minorThird.indexOf(this.keyName) >= 0 ? 
				[0 + this.startKey, 3 + this.startKey, 5 + this.startKey, 8 + this.startKey] : 
				[0 + this.startKey, 4 + this.startKey, 5 + this.startKey, 9 + this.startKey];
			default:
				this._createArray(value);
				break;
		}
	}
}

function createExercise(id) {
	var randomImageNumber = Math.floor((Math.random() * images.length));
	var noteImageName = images[randomImageNumber];

	var imageNameParts = noteImageName.split("_");
	var startKey = parseInt(imageNameParts[0], 10);
	var keyName = imageNameParts[1].replace('.png', '');

	var randomGbNumber = Math.floor((Math.random() * gbChiffres.length));
	var chiffreImageName = gbChiffres[randomGbNumber];
	var chiffre = chiffreImageName.replace('.png', '');

	var exercise = new Exercise(60, startKey, keyName, chiffre, "/content/tutorials/generalbass/", noteImageName, chiffreImageName);

	createPiano(id, exercise.startKey)
	exercises.push(exercise);
	return exercise;
}

function createPiano(id, startKey) {
	$('#exercise').klavier({ startKey: 60, endKey: 95, onSelectedValuesChanged: onValueChanged });
  $('#exercise').klavier('setSelectedValues', startKey + '');
}
var onValueChanged = function() { }

function showValue() {
	var exercise = exercises[exercises.length -1];
	var selectedKeys = $('#exercise').klavier('getSelectedValues');

	//Hier wird der vorgegebene Ton aus den Selektion entfernt
	var startKey = exercise.startKey;
	var pcSetValues = exercise.pcSetValues;
	var index = selectedKeys.indexOf(startKey);
	selectedKeys.splice(index, 1);

	//Hier werden die falschen Tasten ermittelt und die Farben gesetzt
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

	//Hier werden die Farben gesetzt
	setColors(exercise);
}

function evaluateValue(value, pcSetValues, startkey) {
	//Hilfsfunktion zum Ermitteln der richtigen Tasten in den verschiedenen Oktavlagen
	while ((value - 12) >= startkey) {				
		value = value - 12;
	}
	return pcSetValues.indexOf(value) >= 0;
}

function setColors(exercise) {
	exercise.wrongValues.forEach(function(element, index, array) {
		var searchId = "exercise > .klavier-key[data-value=" + element + "]";
		var wrongKey = $('#' + searchId);
		wrongKey.removeClass('klavier-selected-key');
		wrongKey.addClass('wrongColor');
	});
	exercise.rightValues.forEach(function(element, index, array) {
		var searchId = "exercise > .klavier-key[data-value=" + element + "]";
		var rightKey = $('#' + searchId);
		rightKey.removeClass('klavier-selected-key');
		rightKey.addClass('rightColor');
	});
}

function resetColors() {
	$('.wrongColor').removeClass('wrongColor');
	$('.rightColor').removeClass('rightColor');
}

function checkPlayability(id, rightValues, selectedValues) {
	if (rightValues.length < 2) return;
	var first = rightValues[0];
	var last = rightValues[rightValues.length - 1];
	var result = last - first;
	var unplayableId = id + "-unplayable";
	if (result > 12) { 
		$('#' + unplayableId).show();
	} else {
		$('#' + unplayableId).hide();
	}

	var exercise = gbExercises[id];
	var counter = 0;
	for (var i = 0; i < selectedValues.length; i++) {
		var tempValue = selectedValues[i];
		while (tempValue >= exercise.startKey) {			
			if(tempValue === exercise.leadingTone) counter++;	
			tempValue = tempValue - 12;
		}
	}
	var leadingToneId = id + "-doubleLeadingTone";
	if (counter > 1) { 
		$('#' + leadingToneId).show();
	} else {
		$('#' + leadingToneId + "-doubleLeadingTone").hide();
	}
}
