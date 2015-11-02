$(function () {
  var buttons = $('[data-role=category-button]');
  var sections = $('[data-role=category-section]');

  function getCurrentCategoryFromUrl() {
    return (window.document.location.hash || '#').replace(/^#/, '') || 'all';
  }

  function showCategory(category) {
    sections.toggleClass('is-active', false);
    buttons.toggleClass('is-active', false);
    sections.filter('[data-category=' + category + ']').toggleClass('is-active', true);
    buttons.filter('[data-category=' + category + ']').toggleClass('is-active', true);
  }

  var initialCategory = getCurrentCategoryFromUrl();
  showCategory(initialCategory);

  window.addEventListener('hashchange', function (evt) {
    var activeCategory = getCurrentCategoryFromUrl();
    showCategory(activeCategory);
  });

  $('.exercise').each(function () {
    var exercise = $(this);
    $('<a href="#">Übung anzeigen</a>').on('click', function () {
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
