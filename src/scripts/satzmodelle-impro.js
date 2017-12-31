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

var count = 0;

function SatzmodellImpro(elemId, selectorId, data) {
  this.container = document.getElementById(elemId);
  this.selectors = document.getElementsByClassName(selectorId);
  this.data = data;
  this.imageFilePath = data.imageFilePath;
  this.audioFilePath = data.audioFilePath;
  this._fillSelectorsWithData();
}

SatzmodellImpro.prototype.getNewModule = function(id, key) {
  id = id[1];
  var section = this.data[id];
  for (var i = 0; i < section.length; i++) {
    var obj = section[i];
    for (var k in obj) {
      if (k === key) {
        var module = this._getNextModule(k, obj[k]);
        this.container.appendChild(module);
      }
    }
  }  
}

SatzmodellImpro.prototype.playAll = function() {
  var players = document.getElementsByClassName('improPlayer');
}

SatzmodellImpro.prototype._playNext = function(players, nextPlayerIndex) {
  players[nextPlayerIndex].play();
  window.setTimeout(this._playNext(players, nextPlayerIndex + 1), players[nextPlayerIndex].duration);
} 

SatzmodellImpro.prototype._fillSelectorsWithData = function() {
  for (var i = 0; i < this.selectors.length; i++) {
    var selector = this.selectors[i];
    var key = (i + 1).toString();
    var childs = this._getOptions(this.data[key]);
    for (var y = 0; y < childs.length; y++) {
      selector.appendChild(childs[y]);
    }
  }
}

SatzmodellImpro.prototype._getOptions = function(optionsData) {
  var options = [];
  for (var i = 0; i < optionsData.length; i++) {
    var optiondata = optionsData[i]
    for (var key in optiondata) {
      var k = key;
      var value = optionsData[key];
      var option = document.createElement('option');
      option.value = key;
      option.innerHTML = key;
      options.push(option);
    }
  }
  return options;
}

SatzmodellImpro.prototype._getNextModule = function(key, value) {
  var sound = this.audioFilePath + value;    
  var score = this.imageFilePath + value;
  var div = document.createElement('div');
  div.setAttribute('style', 'width: 100%;');
  div.appendChild(this._getHeaderElement(key));
  div.appendChild(this._getImageElement(score));
  div.appendChild(this._getAudioElement(sound));
  return div;
}

SatzmodellImpro.prototype._getHeaderElement = function(text) {
  var div = document.createElement('div');
  div.innerText = text;
  div.setAttribute('style', 'width: 100%; text-align: center; font-weight: bold;');
  return div;
}

SatzmodellImpro.prototype._getImageElement = function(filename) {
  var img = document.createElement('img');
  img.className = 'originalWidth';
  img.src = filename + ".png";
  return img;
}

SatzmodellImpro.prototype._getAudioElement = function(filename) {
  var sound = document.createElement('audio');
  sound.controls = 'controls';
  sound.classList.add('improPlayer');
  sound.src = filename + ".mp3";
  sound.type = 'audio/mpeg';
  return sound;
}