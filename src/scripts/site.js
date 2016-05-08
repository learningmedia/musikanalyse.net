window.addEventListener('DOMContentLoaded', function () {

  [].slice.call(window.document.querySelectorAll('.exercise')).forEach(function (exercise) {
    var link = document.createElement('a');
    link.classList.add('exercise-link');
    link.textContent = 'Übung anzeigen';
    link.addEventListener('click', function () {
      openExercise(exercise.innerHTML);
    });
    exercise.parentNode.insertBefore(link, exercise);
  });

  function openExercise(content) {
    var win = window.open('/tutorial-exercise', Date.now().toString(), 'height=600, width=800');
    win.addEventListener('DOMContentLoaded', function () {
      win.document.getElementById('content').innerHTML = content;
    });
  }

});
