(function( $ ){

  $.fn.startSlider = function() {

    var i = 0;
    var autoDelay = 5000;
    var timer;

    this.find('div.slide').hide();

    var slides = this.find('div.slide');

    $(slides[0]).show();

    function advance() {
      $(slides[i]).fadeOut(500, function(){
        i = (i !== slides.length - 1) ? i + 1 : 0;
        $(slides[i]).fadeIn();
      });
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(advance, autoDelay);
    }

    resetTimer();

    $('.next-slide').click(function(e){
      e.preventDefault();
      advance();
      resetTimer();
    });

    $('.prev-slide').click(function(e){
      e.preventDefault();
      $(slides[i]).fadeOut(500, function(){
        i = (i !== 0) ? i - 1 : slides.length - 1;
        $(slides[i]).fadeIn();
      });
      resetTimer();
    });

  };
})( jQuery );
