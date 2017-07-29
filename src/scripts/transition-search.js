// Funktionalität zur clientseitigen Suche in den Überleitungen Mozarts
// Ulrich Kaiser, 2011 
// Aktualisiert am 11.02.2013

function OnSelectionClick() {
  LoadSearch($('#searchSelector').val());
}

// Methode für die Auswahl der Art der Suche

function LoadSearch(name) {
  $(".fieldSets").hide();
  if (name != "none") {
    $("#" + name).show();
  } else {
    Reset()
  }
}

// Allgemeine Funktionalität zum Einstellung der Sichtbarkeit

function ClearHarmonyFields() {
  $(".fieldSets").hide();
  $("#bassSelelectorField").hide();
}

// Methoden für die Sichtbarkeit der Elemente auf dem Suchformular
// Setzt die Visibility aller Einträge auf "collapsed"

function HideDetails() {
  $(".item").hide();
  $(".details").hide();
}

// Zeigt entweder den No-Match-Container an oder die Tabelle mit den Ergebnissen

function SetVisibilityOfResults(value) {
  if (value) {
    $("#noMatchContainer").hide();
    $("#resultTable").show();
  }
  else {
    $("#noMatchContainer").show();
    $("#resultTable").hide();
    HideDetails();
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

function Reset() {
  $(".item").hide();
  $(".details").hide();
  $("#noMatchContainer").hide();
  $("#resultTable").hide();
  OnHarmoniesResetClick();
}

function OnHarmonyDeleteClick() {
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

function OnHarmoniesResetClick() {
  $("#searchPattern").attr("value", "");
  $("#harmoniesContainer").html("");
}

// Funktionsbereich für die Harmoniesuche

function OnNextHarmonyShowClick() {
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

function Search() {
  var searchPattern = $("#searchPattern").attr("value");
  var value = false;
  $(".details div.harmonies:contains('" + searchPattern + "')").each(function (i, elem) {
    $(this).parent().parent().parent().prev().show();
    value = true;
  });
  SetVisibilityOfResults(value);
}

// Funktionsbereich für die Kadenzsuche

function ShowCadenceBass() {
  $("#bassSelelectorField").toggle();
}

function HideCadenceBass() {
  $("#bassSelelectorField").toggle();
}

function OnCadenceSearchClick() {
  HideDetails();
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
      if ($(elem).html().length == 102) {
        $(elem).parent().parent().parent().prev().show();
        value = true;
      };
    });
  }

  SetVisibilityOfResults(value);
}

// Funktionsbereich für die professionelle Suche

function OnProfessionalSearchClick() {
  var searchPattern = $("#professionalSearchTermLabel1").val();
  if (searchPattern != "") {
    var value = false;
    $(".details fieldset div:contains('" + searchPattern + "')").each(function () {
      $(this).parent().parent().parent().prev().show();
      value = true;
    });
    SetVisibilityOfResults(value);
  }
}

// Funktionsbereich für die Behavior-Suche

function OnBehaviorSearchClick() {
    HideDetails();
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
    SetVisibilityOfResults(value);
}