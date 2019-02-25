var syncAudio = {
  create: function (className) {
    var self = Object.create(this);
    self.audios = document.getElementsByClassName(className);
    self.playPause = function () {
     for (var i = 0; i < self.audios.length; i++) {
        if (self.audios[i].paused) {
          self.audios[i].play();
        }
        else {
          self.audios[i].pause();
        }
      }
    }
    self.reset = function() {
      for (var i = 0; i < self.audios.length; i++) {
            self.audios[i].currentTime = 0;
      }
    } 
    return self;
  }
};