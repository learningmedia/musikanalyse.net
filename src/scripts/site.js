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

  var copyrightNote = [
    'Zitatrecht nach § 51 S. 2 Nr. 1 UrhG',
    'Für das Angebot von musikanalyse.net gilt das Zitatrecht § 51 S. 2 Nr. 1 UrhG, weil die Beiträge ›wissenschaftliche Werke‹ sind, deren Inhalt der Vermittlung von Erkenntnissen dient bzw. bei denen das Vorliegen eines Erkenntnisbezuges gegeben ist. Nach der 2008 gültigen Neufassung des § 51 erstreckt sich das Zitatrecht auch auf Multimediawerke.',
    'Für geschützte Werke befindet sich der Quellennachweis direkt unter dem Beispiel. Die Verbreitung der Dateien dieser Beispiele ist verboten. Rechte und Pflichten der unter Creative-Common publizierten Dateien sind der jeweiligen Lizenz zu entnehmen. Soundbeispiele ohne Quellenangabe werden unter CC0 (= Public Domain) zur Verfügung gestellt.',
    'Videos von Youtube werden als Deep-Link angeboten und sind laut BGH-Urteil vom 17.07.2003 legal.',
    'Wenn Sie das Verbot der Verbreitung urheberrechtsgeschützter Dateien zur Kenntnis genommen haben und sich damit einverstanden erklären, klicken Sie bitte "ok". Für diesen Besuch der Website werden dann keine weiteren Dialoge mehr angezeigt.']
    .join('\n\n');

  jQuery('audio').on('mouseenter', function() {
    var accepted = Cookies.get('copyright-note-accepted');
    if (accepted === 'true') return;
    accepted = confirm(copyrightNote);
    Cookies.set('copyright-note-accepted', accepted ? 'true' : 'false');
  });

  var firstValue = Math.floor((Math.random() * 10) + 1);
  var secondValue = Math.floor((Math.random() * 10) + 1);
  var first = window.document.getElementById('first');
  var second = window.document.getElementById('second');
  first.value = firstValue;
  second.value = secondValue;
  $('#contact-form').on('submit', function (event) {
    $('#contact-button').attr('disabled', true);
    $.ajax({
      url: this.action,
      type: 'POST',
      dataType: 'text',
      data: $(this).serialize(),
      success: function (text) {
        $('#contact-button').text('Vielen Dank!')
        alert(text);
      },
      error: function (error) {
        alert(error.responseText || error.statusText || error.message || error);
        $('#contact-button').attr('disabled', null);
      }
    });
    event.preventDefault();
  });

});
