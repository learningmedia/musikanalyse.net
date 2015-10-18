$(function () {
    $(".exercise")
        .addClass("accordion-inner")
        .wrap("<div class=\"accordion accordion-group\"><div class=\"accordion-body collapse\"></div></div>")
        .parent()
        .before("<div class=\"accordion-heading\"><a class=\"accordion-toggle\">Übung anzeigen</a></div>");
    $(".accordion-toggle").on("click", function () {
        var toggle = $(this);
        toggle.text(toggle.text() === "Übung anzeigen" ? "Übung ausblenden" : "Übung anzeigen");
        toggle.parent().next().collapse("toggle");
    });
});
