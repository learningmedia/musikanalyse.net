var element;
var elements = document.getElementsByClassName("foldable");

for (var i = 0; i < elements.length; i++) {
  var btn = document.createElement("BUTTON");
  var link = 'toggleId-' + i;
  btn.classList.add(link);
  var text = document.createTextNode("Weitere Erläuterungen anzeigen");
  btn.appendChild(text);
  btn.addEventListener('click', foldableClick);
  btn.classList.add('foldable-collapsed');

  element = elements[i];
  element.id = link;
  element.parentNode.insertBefore(btn, element);
  element.style.display = 'none';
}

function foldableClick(event) {
  var elem = event.target;
  var cssClass = elem.classList[0];
  console.log(cssClass);
  var container = document.getElementById(cssClass);
  if (container) {
    if (container.style.display === 'none') {
      container.style.display = 'block';
      elem.firstChild.data = "Erläuterungen verbergen";
      elem.classList.remove('foldable-collapsed');
      elem.classList.add('foldable-block');
    } else {
      container.style.display = 'none';
      elem.firstChild.data = "Weitere Erläuterungen anzeigen";
      elem.classList.remove('foldable-block');
      elem.classList.add('foldable-collapsed');
    }
  }
}  
