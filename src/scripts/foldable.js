var element;
var elements = document.getElementsByClassName("foldable");

for (var i = 0; i < elements.length; i++) {
  element = elements[i];
  var text = element.getAttribute("data-text");
  var anchor = document.createElement("a");
  var link = 'toggleId-' + i;
  anchor.classList.add(link);
  var text = document.createTextNode(text + " - anzeigen");
  anchor.appendChild(text);
  anchor.addEventListener('click', foldableClick);
  anchor.classList.add('foldable-collapsed');
  anchor.classList.add('clickable');

  element.id = link;
  element.parentNode.insertBefore(anchor, element);
  element.style.display = 'none';
}

function foldableClick(event) {
  var elem = event.target;
  var text = elem.innerHTML;
  var cssClass = elem.classList[0];
  var container = document.getElementById(cssClass);
  if (container) {
    if (container.style.display === 'none') {
      container.style.display = 'block';
      elem.firstChild.data = text.replace('anzeigen', 'verbergen');
      elem.classList.remove('foldable-collapsed');
      elem.classList.add('foldable-block');
    } else {
      container.style.display = 'none';
      elem.firstChild.data = text.replace('verbergen', 'anzeigen');
      elem.classList.remove('foldable-block');
      elem.classList.add('foldable-collapsed');
    }
  }
}  
