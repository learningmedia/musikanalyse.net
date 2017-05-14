var gbExercises = {
	"exercise-1a": {
		"image": "GbAufgabe_0001.png",
	  "startKey": 62,
	  "rightValues": [62, 65, 69],
	  "leadingTone": 0
	},
	"exercise-1b": {
		"image": "GbAufgabe_0002.png",
	  "startKey": 65,
	  "rightValues": [65, 69, 72],
	  "leadingTone": 0
	},
	"exercise-2a": {
		"image": "",
	  "startKey": 63,
	  "rightValues": [63, 67, 72],
	  "leadingTone": 0
	}, 
	"exercise-2b": {
		"image": "",
	  "startKey": 67,
	  "rightValues": [67, 71, 76],
	  "leadingTone": 0
	}, 
	"exercise-3a": {
		"image": "",
	  "startKey": 64,
	  "rightValues": [64, 67, 73],
	  "leadingTone": 73
	}, 
	"exercise-3b": {
		"image": "",
	  "startKey": 65,
	  "rightValues": [65, 69, 75],
	  "leadingTone": 0
	}
}

var lastIds = [];

function showValue(exerciseNumber) {
	//Hier wird die Übung aus dem JSON-Objekt geholt
	var id = 'exercise-' + exerciseNumber;
	var exercise = gbExercises[id];
	var selectedKeys = $('#' + id).klavier('getSelectedValues');

	//Hier wird der vorgegebene Ton aus den Selektion entfernt
	var index = selectedKeys.indexOf(exercise.startKey);
	selectedKeys.splice(index, 1);

	//Hier werden die richtigen und falschen Tasten ermittelt und die Farben gesetzt
	var rightValues = [];
	var wrongValues = [];
	for (var i = 0; i < selectedKeys.length; i++) {
		if(evaluateValue(selectedKeys[i], exercise.rightValues, exercise.startKey)){
			rightValues.push(selectedKeys[i]);			
		} else {
			wrongValues.push(selectedKeys[i]);
		}
	} 
	setColors(id, rightValues, wrongValues);
	checkPlayability(id, rightValues, selectedKeys);
}

function evaluateValue(value, rightValues, startkey) {
	//Hilfsfunktion zum Ermitteln der richtigen Tasten in den verschiedenen Oktavlagen
	while ((value - 12) >= startkey) {				
		value = value - 12;
	}
	return rightValues.indexOf(value) >= 0;
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

function setColors(id, rightValues, wrongValues) {
	wrongValues.forEach(function(element, index, array) {
		var searchId = id + " > .klavier-key[data-value=" + element + "]";
		$('#' + searchId).css("background-color", "#FF3C3C");
	});
	rightValues.forEach(function(element, index, array) {
		var searchId = id + " > .klavier-key[data-value=" + element + "]";
		$('#' + searchId).css("background-color", "lightgreen");
	});
}

