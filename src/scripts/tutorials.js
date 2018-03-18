$(function () {

  var MIN_TOKEN_SIZE = 3;
  var HIDDEN_CLASS_NAME = 'hidden';
  var TOKENIZER_REGEXP = new RegExp('[0-9A-zÀ-ÿ]{' + MIN_TOKEN_SIZE + ',}', 'g');

  function uniqueStrings(arr) {
    return Object.keys(arr.reduce(function (dict, str) {
      dict[str] = true;
      return dict;
    }, {}));
  }

  function tokenize(string) {
    var matches = string.match(TOKENIZER_REGEXP);
    return (matches || []).map(x => x.toLowerCase());
  }

  function createIndexItem(title, abstract, $link) {
    return {
      tokens: uniqueStrings(tokenize(title).concat(tokenize(abstract))),
      $item: $link.parents('[data-role="tutorial-item"]')
    }
  }

  function createIndexFromIndexItems(indexItems) {
    return indexItems.reduce(function (dictionary, item) {
      item.tokens.forEach(function (token) {
        var results = dictionary[token];
        if (!results) dictionary[token] = results = [];
        results.push(item);
      });
      return dictionary;
    }, {});
  }

  function createSearchRegExp(searchText) {
    var searchText = searchText.toLowerCase();
    return searchText.length < MIN_TOKEN_SIZE ? /.*/g : new RegExp(searchText.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'));
  }

  function createSearchEngine() {

    var indexItems = [];
    $('[data-role="tutorial-link"]').each(function (index, link) {
      var $link = $(link);
      var title = $link.text();
      var abstract = $link.attr('title');
      var indexItem = createIndexItem(title, abstract, $link);
      indexItems.push(indexItem);
    });

    var index = createIndexFromIndexItems(indexItems);

    function toggleVisibility(searchText) {
      var searchRegExp = createSearchRegExp(searchText);

      var matchingEntries = Object.keys(index).filter(function (token) {
        return searchRegExp.test(token);
      }).map(function (token) {
        return index[token];
      }).reduce(function (arr, indexEntries) {
        return arr.concat(indexEntries);
      }, []);

      Object.keys(index).forEach(function (token) {
        var indexItems = index[token];
        indexItems.forEach(function (indexEntry) {
          var isMatch = matchingEntries.indexOf(indexEntry) !== -1;
          indexEntry.$item[isMatch ? 'removeClass' : 'addClass'](HIDDEN_CLASS_NAME);
        });
      });

      $('[data-role="tutorial-section"]').each(function (index, section) {
        var $section = $(section);
        var isVisible = !!$section.find('[data-role="tutorial-item"]:not(.' + HIDDEN_CLASS_NAME + ')').length;
        $section[isVisible ? 'removeClass' : 'addClass'](HIDDEN_CLASS_NAME);
      })
    }

    return {
      toggleVisibility: toggleVisibility
    };
  }

  var engine = createSearchEngine();

  $('#tutorials-filter').on('input', function (event) {
    engine.toggleVisibility(event.target.value);
  }).focus();

});
