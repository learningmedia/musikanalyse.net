$(function () {

    // Allgemeine Musiklehre:
    var amProvider = {
        getName: function (language) { return "Allgemeine Musiklehre"; },
        getHeader: function (language) { return "AM"; },
        getContent: function (noteSet, language) { return language === "de" ? "<div>Hallo von der Allgemeine Musiklehre!</div>" : "<div>Hello from Allgemeine Musiklehre!</div>"; }
    };

    // Funktionstheorie:
    var ftProvider = {
        getName: function (language) { return "Funktionstheorie"; },
        getHeader: function (language) { return "FT"; },
        getContent: function (noteSet, language) { return language === "de" ? "<div>Hello from Funktionstheorie!</div>" : null; }
    };

    // Pitch Class Set:
    var pcProvider = {
        getName: function (language) { return "Pitch Class Set"; },
        getHeader: function (language) { return "PC"; },
        getContent: function (noteSet, language) { return "<div>Hello from Pitch Class Set!</div>"; }
    };

    var theoryProviders = [amProvider, ftProvider, pcProvider],
        currentProvider = 0,
        currentLanguage = "de",
        currentResults = calculateResults(theoryProviders, currentProvider, currentLanguage);

    $("#piano").piano({
        startKey: 48,
        endKey: 72,
        selectionMode: $.fn.piano.selectionMode.MULTIPLE,
        selectionChangedCallback: onSelectionChanged
    });

    $("#languagePicker input:radio").on("click", function () {
        currentLanguage = $("#languagePicker input:checked").val();
        refresh();
    });

    $("#theoryHeaders").on("click", ".header", function (ev) {
        var $element = $(ev.target);
        var newIndex = +$element.attr("data-index");
        currentProvider = newIndex;
        refresh();
    });

    Hash.addListener(onHashChanged);
    Hash.startListening();

    function onSelectionChanged() {
        var keys = $("#piano").piano().getSelectedKeys();
        Hash.replaceHash(createHashFromKeys(keys));
    }

    function onHashChanged() {
        refresh();
    }

    function createHashFromKeys(keys) {
        var key = "",
            i;
        for (i = 0; i < keys.length; i++) {
            key = key + (keys[i] < 10 ? "0" + keys[i] : "" + keys[i]);
        }
        return key;
    }

    function createKeysFromHash(hash) {
        var keys = [],
            i;
        if (!hash) {
            hash = "";
        }
        for (i = 0; i < hash.length; i += 2) {
            var keyStr = hash.substring(i, i + 2);
            keys.push(+keyStr);
        }
        return keys;
    }

    function refresh() {
        var keys = createKeysFromHash(Hash.getCurrentHash());
        $("#piano").piano().setSelectedKeys(keys);
        Notation.createNoteRenderer($("#score canvas")[0]).renderKeys(keys);

        currentResults = calculateResults(theoryProviders, currentProvider, new NoteLex.NoteSet(keys), currentLanguage);
        showHeaders("#theoryHeaders", "#header-template", currentResults, currentLanguage);
        $("#results article").removeClass().addClass("theory-" + currentProvider).addClass(currentResults[currentProvider].content ? "enabled" : "disabled");
        showContent(currentResults);
    }

    function calculateResults(providers, selectedProviderIndex, noteSet, language) {
        var results = [],
            provider,
            i;

        for (i = 0; i < providers.length; i++) {
            provider = providers[i];
            results.push({
                index: i,
                name: provider.getName(language),
                header: provider.getHeader(language),
                content: provider.getContent(noteSet, language),
                selected: i === selectedProviderIndex
            });
        }
        return results;
    }

    function showHeaders(parentElementId, headerTemplateId, results) {
        var headerContainer = $(parentElementId),
            headerTemplate = $(headerTemplateId).html(),
            instantiateHeader = _.template(headerTemplate);

        headerContainer.empty();
        results.forEach(function (result) {
            headerContainer.append(instantiateHeader(result));
        });
    }

    function showContent(results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].selected) {
                $("#results > article").html(results[i].content || "<div></div>");
            }
        }
    }

});
