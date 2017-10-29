var element;
var elements = document.getElementsByClassName("foldable");

for (var i = 0; i < elements.length; i++) {
  var btn = document.createElement("BUTTON");
  var link = 'toggleId-' + i;
  btn.classList.add(link);
  var text = document.createTextNode("Erläuterungen verbergen");
  btn.appendChild(text);
  btn.addEventListener('click', foldableClick);

  element = elements[i];
  element.id = link;
  element.parentNode.insertBefore(btn, element);
}

function foldableClick(event) {
  var elem = event.target;
  var cssClass = elem.classList[0];
  debugger;
  var container = document.getElementById(cssClass);
  if (container) {
    if (container.style.display === 'none') {
      container.style.display = 'block';
      elem.value = "Erläuterungen verbergen";
    } else {
      container.style.display = 'none';
      elem.value = "Erläuterungen anzeigen";
    }
  }
}  
