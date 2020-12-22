(function() {
  
  const start = {
    //grab button
    init: function() {
      this.cacheDom();
      this.bindEvent();
    },

    cacheDom: function() {
      this.main = document.getElementById('main'),
      this.startButton = document.getElementById('button');
    },

    bindEvent: function() {
      this.startButton.addEventListener('click', this.startGame.bind(this));
    },

    startGame: function() {
      this.main.removeChild(this.startButton);
    },
  };

  start.init();

})();