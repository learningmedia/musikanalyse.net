var images = ["60_c.png", "61_cis.png", "61_des.png", "62_d.png", "63_dis.png", "63_es.png", "64_64.png", "65_f.png", "66_fis.png", "66_ges.png", "67_g.png", "68_as.png", "68_gis.png", "69_a.png", "70_ais.png", "70_b.png", "71_h.png"]
var gbChiffres = ["4_0-5-7.png", "6_0-3-8.png"]
var exercises = [];

class Exercise {

  constructor(startKey, keyName, chiffre, chiffreValues, noteImagePath, chiffreImagePath) {
    this.startKey = startKey;
    this.keyName = keyName;
    this.chiffre = chiffre;
    this.chiffreValues = chiffreValues;
    this.originalValues = this._getOriginalValues();
    this.noteImagePath = noteImagePath;
    this.chiffreImagePath = chiffreImagePath
    this.rightValues = [];
    this.wrongValues = [];
  }

  _getOriginalValues() {
    var keys = [];
    keys.push(this.startKey);
    for (var i = 0; i < this.chiffreValues.length; i++) {
    if(this.chiffreValues[i] == 0) continue;
    keys.push(this.startKey + this.chiffreValues[i])
    }
    return keys;
  }
}

function createExercise(id) {
	const folderName = "/content/tutorials/generalbass/";
	var randomImageNumber = Math.floor((Math.random() * images.length));
	var noteImageName = images[randomImageNumber];

	var imageNameParts = noteImageName.split("_");
	var startKey = parseInt(imageNameParts[0], 10);
	var keyName = imageNameParts[1].replace('.png', '');

	var randomGbNumber = Math.floor((Math.random() * gbChiffres.length));
	var chiffreImageName = gbChiffres[randomGbNumber];
	var chiffreParts = chiffreImageName.split("_");
	var chiffre = chiffreParts[0];
	var chiffreValues = chiffreParts[1].replace('.png', '');

	var exercise = new Exercise(startKey, keyName, 
		createArray(chiffre), 
		createArray(chiffreValues), 
		folderName + noteImageName, 
		folderName + chiffreImageName);

	createPiano(id, exercise.startKey)
	exercises.push(exercise);
	return exercise;
}

function createPiano(id, startKey) {
	$('#exercise').klavier({ startKey: 60, endKey: 95, onSelectedValuesChanged: onValueChanged });
  $('#exercise').klavier('setSelectedValues', startKey + '');
}

function createArray(value){
	var parts = value.split('-');
	var arr = [];
	for (var i = 0; i < parts.length; i++) {
		var part = parts[i];
		arr.push(parseInt(part, 10));
	}
	return arr;
}

var onValueChanged = function() {

}

function showValue() {
	var exercise = exercises[exercises.length -1];
	var selectedKeys = $('#exercise').klavier('getSelectedValues');

	//Hier wird der vorgegebene Ton aus den Selektion entfernt
	var startKey = exercise.startKey;
	var originValues = exercise.originalValues;
	var index = selectedKeys.indexOf(startKey);
	selectedKeys.splice(index, 1);

	//Hier werden die falschen Tasten ermittelt und die Farben gesetzt
	var rightValues = [];
	var wrongValues = [];
	for (var i = 0; i < selectedKeys.length; i++) {
		if(evaluateValue(selectedKeys[i], originValues, startKey)){
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

function evaluateValue(value, originValues, startkey) {
	//Hilfsfunktion zum Ermitteln der richtigen Tasten in den verschiedenen Oktavlagen
	while ((value - 12) >= startkey) {				
		value = value - 12;
	}
	return originValues.indexOf(value) >= 0;
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
