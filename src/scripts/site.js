window.addEventListener('DOMContentLoaded', function () {

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

  var copyrightNote = 'Zitatrecht nach § 51 S. 2 Nr. 1 UrhG\n\n' +
             'Für das Angebot von musikanalyse.net gilt das Zitatrecht § 51 S. 2 Nr. 1 UrhG, weil die Beiträge ›wissenschaftliche Werke‹ sind, deren Inhalt der Vermittlung von Erkenntnissen dient bzw. bei denen das Vorliegen eines Erkenntnisbezuges gegeben ist. Nach der 2008 gültigen Neufassung des § 51 erstreckt sich das Zitatrecht auch auf Multimediawerke.\n\n' +
             'Für geschützte Werke befindet sich der Quellennachweis direkt unter dem Beispiel. Die Verbreitung der Dateien dieser Beispiele ist verboten. Rechte und Pflichten der unter Creative-Common publizierten Dateien sind der jeweiligen Lizenz zu entnehmen. Soundbeispiele ohne Quellenangabe werden unter CC0 (= Public Domain) zur Verfügung gestellt.\n\n' +
             'Wenn Sie das Verbot der Verbreitung urheberrechtsgeschützter Dateien zur Kenntnis genommen haben und sich damit einverstanden erklären, klicken Sie bitte "ok". ' +
             'Wenn Sie den Dialog mit "ok" beenden, werden für diese Besuch der Website keine weiteren Dialoge mehr angezeigt.'

  jQuery('audio').on('mouseenter', function() { 
    var accepted = Cookies.get('copyright-note-accepted');
    if (accepted === 'true') return;
    accepted = confirm(copyrightNote); 
    Cookies.set('copyright-note-accepted', accepted ? 'true' : 'false');
  });

});
