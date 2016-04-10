$(function () {
  var buttons = $('[data-role=category-button]');
  var sections = $('[data-role=category-section]');

    $('.exercise').each(function () {
    var exercise = $(this);
    $('<a class="exercise-link" href="#">Übung anzeigen</a>').on('click', function () {
      openExercise(exercise.get(0).innerHTML);
    }).insertBefore(exercise);
  });

  function openExercise(content) {
    var doc = '<!DOCTYPE html>'
            + '<html>'
            + '<head>'
            + '    <meta charset="utf-8" />'
            + '    <meta name="viewport" content="width=device-width" />'
            + '    <style>'
            + '      body { background-color: white; font-family: Arial, Helvetica, Verdana, sans-serif; }'
            + '      img { display: block; margin: 0 auto; }'
            + '    </style>'
            + '</head>'

            + '<body>'
            + content
            + '</body>'
            + '</html>';

    var win = window.open(null, Date.now().toString(), 'height=600, width=800');
    win.document.write(doc);
    win.document.close();
  }

});
