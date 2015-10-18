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

});
