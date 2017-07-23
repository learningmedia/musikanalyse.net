function loadJSON(path, success, error)
{
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

function Work(id, movementNumber, transitions, genre) {
  this.id = id;
  this.movementNumber = movementNumber;
  this.transitions = transitions;
  this.genre = genre;
  //Hier test bauen, ob Property Transition ein Objekt oder ein Array ist und dann _stringifyTransition aufrufen
}

Work.prototype._stringifyTransition = function(transition) {
  var ueberleitung = transition.Name;
  var behavior = transition.Behavior;
  var structure = transition.Structure;
  var harmonies = transition.Harmonies;
  var cadence = transition.Cadence;
  var cadenceBass = transition.CadenceBass;
  var measures = transition.Measures;
  var other = transition.Other;
  return ueberleitung + ": " + structure + " - " - harmonies; 
}

loadJSON('/content/tutorials/ueberleitung/json-data/transitions.json',
  function(data) { 
    var works = data.Works;
    var worksArr = [];
    for (var i = 0; i < works.length; i++) {
      var kv = works[i]['KV'];
      var mn = works[i]['MovementNumber'];
      var tr = works[i]['Transitions'];
      var ge = works[i]['Genre'];
      worksArr.push(new Work(kv, mn, tr, ge));
    }
    console.log(worksArr[0].test);
  },
  function(xhr) { 
    console.error(xhr); 
  }
);

