function loadJSON(path, success, error) {
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

function Work(id, movementNumber, transitions, genre, composer) {
  this.id = id;
  this.movementNumber = movementNumber;
  this.transitions = transitions;
  this.genre = genre;
  this.composer = composer;
}

var works = loadJSON('/content/tutorials/ueberleitung/json-data/transitions.json', function(data) {
    //Hier werden die Daten geholt
    var works = data.Works;
    var worksArr = [];
    for (var i = 0; i < works.length; i++) {
      var kv = works[i]['KV'];
      var mn = works[i]['MovementNumber'];
      var tr = works[i]['Transitions'];
      var ge = works[i]['Genre'];
      var cp = works[i]['Composer'];
      var work = new Work(kv, mn, tr, ge, cp);
      worksArr.push(work);
    }

    //Hier wird das HTML zusammengesetzt
    var html = "";
    for (var i = 0; i < worksArr.length; i++) {
      html += getWorkMarkup(i + 1, worksArr[i]);
    }

    //Hier wird das HTML in den Container gesetzt
    $("#transitionData").append(getTable(html));
  },
  function(xhr) {
    console.error(xhr);
  }
);

function getWorkMarkup(counter, work) {
  var html = "";
  var countStr = counter.toString();
  var workIdType = "KV ";
  if (work.composer === "Beethoven") workIdType = "Op. ";
  if (work.composer === "Haydn") workIdType = "Hob.";

  for (var i = 0; i < work.transitions.length; i++) {
    var id = countStr + i.toString();
    var snippet = '<tr>' +
    '<td>' + (workIdType + work.id) + '</td>' +
    '<td>' + work.transitions[i].Structure + '</td>' +
    '<td><a data-linkId="' + id + '" onclick="showDetails(' + id + ')" class="cp">Vollanzeige</a></td>' +
    '</tr>';
    html += snippet;
    var trData = getTransitionTrMarkup(work, id, i + 1, work.transitions[i]);
    html += trData;
  }
  return html;
}

function getTransitionTrMarkup(work, id, transitionCounter, transition) {  
  var html = '<tr id="' + id + '" class="details" style="display: none;">' +
    '<td colspan="3">' +
      '<fieldset>' +
        '<legend>KV ' + work.id + ', ' + work.movementNumber + '. Satz</legend>' +
        '<div><span class="bold">Überleitung: ' + transitionCounter + '</span></div>' +
        '<div>Name: ' + (transition.Structure || 'keine Angabe') + '</div>' +
        '<div>Harmoniefolge: ' + (transition.Harmonies || 'keine Angabe') + '</div>' +
        '<div>Wirkung: ' + (transition.Behavior || 'keine Angabe') + '</div>' +
        '<div>Kadenz: ' + (transition.Cadence || '') + '</div>' +
        '<div>Kadenzart: ' + (transition.CadenceBass || '') + '</div>' +
        '<div>Bemerkungen: ' + (transition.Other || '') + '</div>' +
        '<div>Takt: ' + (transition.Measures || 'keine Angabe') + '</div>' +
        '<div>Gattung: ' + (work.genre || 'keine Angabe') + '</div>' +
      '</fieldset>' +
    '</td>' +
  '</tr>';
  return html;
}

function getTable(worksHtml) {
  return '<table class="transitionTable">' +
    '<tr class="firstRow">' +
      '<th style="width: 25%;">Werk</th>' +
      '<th style="width: 400px">Modell</th>' +
      '<th>Anzeige</th>' +
    '</tr>' +
    worksHtml +
  '</table>';
}
