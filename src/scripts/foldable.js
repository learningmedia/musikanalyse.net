var element;
var elements = document.getElementsByClassName("foldable");

for (var i = 0; i < elements.length; i++) {
	var btn = document.createElement("BUTTON");
	var link = 'foldable-' + i;
	btn.classList.add(link);
	var text = document.createTextNode("Erläuterungen verbergen");
	btn.appendChild(text);
	element = elements[i];
	element.id = link;
	element.before(btn);
}