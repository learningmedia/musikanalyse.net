function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
          if (success) {
            success(JSON.parse(xhr.responseText));
          }
      } else { 
        if (error) {
          error(xhr);
        }
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

var index = 0;

function Tester(elem, options) {
  this.container = elem;
  this.containerId = elem.id;
  this.options = options;
  this.answerContainerId = this.containerId + 'answer';
  this.exercises = options.exercises;
  this.currentExercise;
  this.recentExercises = [];
  this.audioFilePath = options.audioFilePath;
  this.questionContainer = document.createElement('div');
  this.getNewExercise();
}

Tester.prototype.getNewExercise = function() {
  var randomNumber = Math.floor((Math.random() * this.exercises.length));
    this.currentExercise = this.exercises[randomNumber];
    this.container.appendChild(this._createNewExerciseContainer(this.questionContainer, this.currentExercise, this.audioFilePath, this.answerContainerId));
};

Tester.prototype._createNewExerciseContainer = function(questionContainer, currentExercise, audioFilePath, answerContainerId) {
  index++;
  while (questionContainer.firstChild) {
    questionContainer.removeChild(questionContainer.firstChild);
  }
  var header = document.createElement('h3');
  header.innerHTML = this.options.Name;
  header.setAttribute('style', 'float: left; margin-right: 16px;');
  questionContainer.appendChild(header);
  var counter = document.createElement('p');
  counter.setAttribute('style', 'padding-top: 3px;');
  counter.innerHTML = "Aufgabe " + index + '';
  questionContainer.appendChild(counter);

  if (audioFilePath && currentExercise.firstFileName) {
    var child1 = document.createElement('span');
    child1.setAttribute('style', 'display: block; float: left; margin-right: 10px;');
    child1.innerHTML = "Erstes Hörbeispiel:";
    questionContainer.appendChild(child1);
    questionContainer.appendChild(this._getAudioElement(audioFilePath + currentExercise.firstFileName));
  }

  if (audioFilePath && currentExercise.secondFileName) {
    var br = document.createElement('br'); 
    br.setAttribute('style', 'clear: left;');
    questionContainer.appendChild(br);

    child2 = document.createElement('span');
    child2.setAttribute('style', 'display: block; float: left; margin-right: 10px;');
    child2.innerHTML = "Zweites Hörbeispiel:";
    questionContainer.appendChild(child2);
    questionContainer.appendChild(this._getAudioElement(audioFilePath + currentExercise.secondFileName));
  }

  var question = document.createElement('p'); 
  question.innerHTML = currentExercise.question;
  questionContainer.appendChild(question);  

  var answer = document.createElement('p'); 
  answer.innerHTML = currentExercise.answer;
  answer.id = answerContainerId;
  answer.setAttribute('style', 'display: none;');
  questionContainer.appendChild(answer);

  var button = document.createElement('button'); 
  button.setAttribute('onclick', "javascript:toggleAnswer('" + answerContainerId + "');");
  button.innerHTML = "Lösung";
  button.setAttribute('style', 'margin-right: 10px; float: left;');
  questionContainer.appendChild(button);

  return questionContainer;
}

Tester.prototype._getAudioElement = function(filename) {
  var sound = document.createElement('audio');
  sound.className = 'trainingSamples';
  sound.setAttribute('style', 'width: 150px; margin: 0 !important; display: inline !important;')
  sound.controls = 'controls';
  sound.src = filename;
  sound.type = 'audio/mpeg';
  return sound;
}

var toggleAnswer = function(id) {
  var answer = document.getElementById(id + "");
  answer.setAttribute('style', 'display: block;');
}