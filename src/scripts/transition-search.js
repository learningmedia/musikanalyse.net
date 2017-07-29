// Functionality for searching in transitions of Mozarts, Haydns and...
// Ulrich Kaiser, 2011 
// prorting to musikanalyse.net at 07/29/2017 

function onSelectionChange() {
  loadSearch($('#searchSelector').val());
}

// Methode für die Auswahl der Art der Suche

function loadSearch(name) {
  $(".fieldSets").hide();
  if (name != "none") {
    $("#" + name).show();
  } else {
    reset()
  }
}

// Methoden für die Sichtbarkeit der Elemente auf dem Suchformular
// Setzt die Visibility aller Einträge auf "collapsed"

function showTable() {
  $(".item").show();
  $("#resultTable").show();
}

function hideTable() {
  $(".item").hide();
  $(".details").hide();
  $("#resultTable").hide();
}

// Zeigt entweder den No-Match-Container an oder die Tabelle mit den Ergebnissen

function setVisibilityOfResults(value) {
  if (value) {
    $("#noMatchContainer").hide();
    $("#resultTable").show();
  }
  else {
    $("#noMatchContainer").show();
    $("#resultTable").hide();
    hideTable();
  }
}

// Zum Ausklappen der Details zu einem Datenbankeintrag

function showDetails(id) {
  var elem = $("a[data-linkId=" + id + "]");
  if (elem.html() == "Vollanzeige") {
    elem.html("reduzieren");
    elem.addClass("cp");
    $("#" + id).show();
  }
  else {
    elem.html("Vollanzeige");
    $("#" + id).hide();
  }
}

function reset() {
  $(".item").hide();
  $(".details").hide();
  $("#noMatchContainer").hide();
  $("#resultTable").hide();
  onHarmoniesResetClick();
}

function onHarmonyDeleteClick() {
  var number = $("#ddl_number").val();
  var harmony = $("#ddl_harmony").val();

  var searchPattern = $("#searchPattern").val();
  var replaceValue = number + harmony.split("-")[1];
  var symbols = searchPattern.split("-");
  if (replaceValue == symbols[symbols.length - 1]) {
    var newPattern = "";
    for (var i = 0; i < symbols.length - 1; i++) {
      newPattern += symbols[i] + "-";
    }
    $("#searchPattern").attr("value", newPattern.substring(0, newPattern.length - 1));
    var imageTag = "<img src=\"/img/mozartHarmonies/" + number + harmony + ".png\">";
    var innerHtml = $("#harmoniesContainer").html();
    var innerHtmlNew = innerHtml.replace(imageTag, "");
    $("#harmoniesContainer").html(innerHtmlNew);
  }
  else {
    alert("Sie können nur die letzte Harmonie der Akkordefolge löschen, da sonst leicht ein fehlerhafter Suchausdruck entstehen könnte.");
  }
}

function onHarmoniesResetClick() {
  $("#searchPattern").attr("value", "");
  $("#harmoniesContainer").html("");
}

// Funktionsbereich für die Harmoniesuche

function onNextHarmonyShowClick() {
  var number = $("#ddl_number").val();
  var harmony = $("#ddl_harmony").val().split("-");
  var lastValue = $("#searchPattern").attr("value");
  if (lastValue === undefined || lastValue === "") {
    lastValue = number + harmony[1];
  }
  else {
    lastValue = lastValue + "-" + number + harmony[1];
  }
  $("#searchPattern").attr("value", lastValue);
  var image = $("<img src='/img/mozartHarmonies/" + number + harmony[0] + "-" + harmony[1] + ".png'>");
  image.appendTo("#harmoniesContainer");
}

function search() {
  var searchPattern = $("#searchPattern").attr("value");
  var value = false;
  $(".details div.harmonies:contains('" + searchPattern + "')").each(function (i, elem) {
    $(this).parent().parent().parent().prev().show();
    value = true;
  });
  setVisibilityOfResults(value);
}

// Funktionsbereich für die Kadenzsuche

function showCadenceBass() {
  $("#bassSelelectorField").toggle();
}

function hideCadenceBass() {
  $("#bassSelelectorField").toggle();
}

function onCadenceSearchClick() {
  hideTable();
  var value = false;
  var bassSelectorFieldIsVisible = $("#bassSelelectorField").is(":visible");

  if (bassSelectorFieldIsVisible) {
    if ($("#bassSelector1").is(":checked")) {
      $(".cadenceBass:contains('diskantisierend')").parent().parent().parent().prev().show();
    }
    if ($("#bassSelector2").is(":checked")) {
      $(".cadenceBass:contains('tenorisierend')").parent().parent().parent().prev().show();
    }
    if ($("#bassSelector3").is(":checked")) {
      $(".cadenceBass:contains('bassierend')").parent().parent().parent().prev().show();
    }
    value = true;
  }
  else {
    $("div.cadence").each(function (i, elem) {
      var jqobj = $(elem);
      if (jqobj.html().length === 8) {
        jqobj.parent().parent().parent().prev().show();
        value = true;
      };
    });
  }

  setVisibilityOfResults(value);
}

// Funktionsbereich für die professionelle Suche

function onProfessionalSearchClick() {
  var searchPattern = $("#professionalSearchTermLabel1").val();
  if (searchPattern != "") {
    var value = false;
    $(".details fieldset div:contains('" + searchPattern + "')").each(function () {
      $(this).parent().parent().parent().prev().show();
      value = true;
    });
    setVisibilityOfResults(value);
  }
}

// Funktionsbereich für die Behavior-Suche

function onBehaviorSearchClick() {
    hideTable();
    var value = $("#behaviorSelector2").is(":checked");
    if (value) {
        $("div.behavior:contains('nicht')").each(function(i, elem) {
            $(elem).parent().parent().parent().prev().show();
            value = true;
        });
    } else {
        $(".details div.behavior:contains('Wirkung: modulierend')").each(function(i, elem) {
            $(elem).parent().parent().parent().prev().show();
            value = true;
        });
    }
    setVisibilityOfResults(value);
}