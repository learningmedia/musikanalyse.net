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

loadJSON('/content/tutorials/ueberleitung/json-data/transitions.json', function(data) {
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
    //Hier wird die JSON-Objekte an den Container gehängt
    $("#transitionData").data('transitions', worksArr);
    //Hier wird das HTML der Tabelle erstellt
    $("#transitionData").append(createTable(worksArr));
    ClearHarmonyFields();
    HideDetails();
    $("#noMatchContainer").hide();
    $("#resultTable").hide();
  },
  function(xhr) {
    console.error(xhr);
  }
);

function createTable(transitions) {
  var html = "";
  for (var i = 0; i < transitions.length; i++) {
    html += getWorkMarkup(i + 1, transitions[i]);
  }
  return getTableMarkup(html);
}

function getTableMarkup(worksHtml) {
  return '<table id="resultTable">' +
    '<tr class="firstRow">' +
      '<th style="width: 25%;">Werk</th>' +
      '<th style="width: 400px">Modell</th>' +
      '<th>Anzeige</th>' +
    '</tr>' +
    worksHtml +
  '</table>';
}

function getWorkMarkup(counter, work) {
  var html = "";
  var countStr = counter.toString();
  var workIdType = "KV ";
  if (work.composer === "Beethoven") workIdType = "Op. ";
  if (work.composer === "Haydn") workIdType = "Hob.";

  for (var i = 0; i < work.transitions.length; i++) {
    var id = countStr + i.toString();
    var snippet = '<tr class="item">' +
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
  var html = '<tr id="' + id + '" class="details">' +
    '<td colspan="3">' +
      '<fieldset>' +
        '<legend>KV ' + work.id + ', ' + work.movementNumber + '. Satz</legend>' +
        '<div><span class="bold">Überleitung: ' + transitionCounter + '</span></div>' +
        '<div>Name: ' + (transition.Structure || 'keine Angabe') + '</div>' +
        '<div class="harmonies">Harmoniefolge: ' + (transition.Harmonies || 'keine Angabe') + '</div>' +
        '<div class="behavior">Wirkung: ' + (transition.Behavior || 'keine Angabe') + '</div>' +
        '<div class="cadence">Kadenz: ' + (transition.Cadence || '') + '</div>' +
        '<div class="cadenceBass">Kadenzart: ' + (transition.CadenceBass || '') + '</div>' +
        '<div>Bemerkungen: ' + (transition.Other || '') + '</div>' +
        '<div>Takt: ' + (transition.Measures || 'keine Angabe') + '</div>' +
        '<div>Gattung: ' + (work.genre || 'keine Angabe') + '</div>' +
      '</fieldset>' +
    '</td>' +
  '</tr>';
  return html;
}
