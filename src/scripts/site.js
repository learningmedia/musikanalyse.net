window.addEventListener('DOMContentLoaded', function () {

  // EXECISES /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  [].slice.call(window.document.querySelectorAll('.exercise')).forEach(function (exercise) {
    var link = document.createElement('a');
    link.classList.add('exercise-link');
    link.textContent = 'Übung anzeigen';
    link.addEventListener('click', function () {
      openExercise(exercise.innerHTML);
    });
    exercise.parentNode.insertBefore(link, exercise);
  });

  function openExercise(content) {
    var win = window.open('/tutorial-exercise', Date.now().toString(), 'height=600, width=800');
    win.addEventListener('DOMContentLoaded', function () {
      win.document.getElementById('content').innerHTML = content;
    });
  }



  // COPYRIGHTS /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var copyrightNote = [
    'Zitatrecht nach § 51 S. 2 Nr. 1 UrhG',
    'Für das Angebot von musikanalyse.net gilt das Zitatrecht § 51 S. 2 Nr. 1 UrhG, weil die Beiträge ›wissenschaftliche Werke‹ sind, deren Inhalt der Vermittlung von Erkenntnissen dient bzw. bei denen das Vorliegen eines Erkenntnisbezuges gegeben ist. Nach der seit 2008 gültigen Neufassung des § 51 erstreckt sich das Zitatrecht auch auf Multimediawerke.',
    'Für geschützte Werke befindet sich der Quellennachweis direkt unter dem Beispiel. Die Verbreitung der Dateien dieser Beispiele ist verboten. Rechte und Pflichten der unter Creative-Common publizierten Dateien sind der jeweiligen Lizenz zu entnehmen. Soundbeispiele ohne Quellenangabe werden unter CC0 (= Public Domain) zur Verfügung gestellt. Videos von Youtube werden als Deep-Link angeboten und sind laut BGH-Urteil vom 17.07.2003 legal.',
    'Wenn Sie das Verbot der Verbreitung urheberrechtsgeschützter Dateien zur Kenntnis genommen haben und sich damit einverstanden erklären, klicken Sie bitte "ok". In diesem Fall wird ein Cookie ohne personenbezogene Daten gesetzt. Für diesen Besuch der Website werden dann keine weiteren Dialoge mehr angezeigt.']
    .join('\n\n');

  jQuery('audio').on('mouseenter', function() {
    var accepted = Cookies.get('copyright-note-accepted');
    if (accepted === 'true') return;
    accepted = confirm(copyrightNote);
    Cookies.set('copyright-note-accepted', accepted ? 'true' : 'false');
  });



  // FOLDABLE ELEMENTS /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var element;
  var elements = document.getElementsByClassName("foldable");

  for (var i = 0; i < elements.length; i++) {
    element = elements[i];
    var expanded = element.getAttribute("data-initial-state") === 'expanded';
    var dataText = element.getAttribute("data-text");
    var anchor = document.createElement("a");
    var link = 'toggleId-' + i;
    anchor.classList.add(link);
    var textElement = document.createTextNode(dataText + (expanded ? " - verbergen" : " - anzeigen"));
    anchor.appendChild(textElement);
    anchor.addEventListener('click', foldableClick);
    anchor.classList.add(expanded ? 'foldable-block' : 'foldable-collapsed');
    anchor.classList.add('clickable');

    element.id = link;
    element.parentNode.insertBefore(anchor, element);
    element.style.display = expanded ? 'block' : 'none';
  }

  function foldableClick(event) {
    var elem = event.target;
    var text = elem.innerHTML;
    var cssClass = elem.classList[0];
    var container = document.getElementById(cssClass);
    if (container) {
      if (container.style.display === 'none') {
        container.style.display = 'block';
        elem.textContent = text.replace('anzeigen', 'verbergen');
        elem.classList.remove('foldable-collapsed');
        elem.classList.add('foldable-block');
      } else {
        container.style.display = 'none';
        elem.textContent = text.replace('verbergen', 'anzeigen');
        elem.classList.remove('foldable-block');
        elem.classList.add('foldable-collapsed');
      }
    }
  }


  // TOGGLE MATERIALS /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $("a[data-toggle]").on("click", function(event) {
    event.preventDefault();
    var title = $(this).attr("data-toggle");
    var div = document.getElementById(title)
    if (div.style.display == "none") {
      div.style.display = "block";
      $('html, body').animate({
        scrollTop: $(div).offset().top
      }, 500);
    } else {
      div.style.display = "none";
    }
  });

});
