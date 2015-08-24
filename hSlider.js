(function($){
  'use strict';

  var defaults = {
    delay: 2000,
    type: 'slider'
  }

  $.fn.hSlider = function(options){
    var hSliderEl = this;
    var hSlider = {};
    var imgSrcs = [];
    var images = [];
    var navIndexes = [];
    var currIndex = 0;
    var nextPrevNav;
    var timer;

    var init = function() {
      hSlider = $.extend({}, defaults, options);
      createImages();
      createNav();
      createNextPrev();
      writeToDom();
      clickEvents();
      timeDelay();
    }

    var createImages = function() {
      var imagesArray = hSliderEl.find('img');
      imagesArray.each(function(index){
        var src = $(this).prop('src');
        var imgHtml;
        if (index === 0){
          imgHtml = '<div class="hslider-main-image current" actual-slide="'+index+'" style="background-image: url(\''+src+'\')"></div>'
        }
        else{
          imgHtml = '<div class="hslider-main-image" actual-slide="'+index+'" style="background-image: url(\''+src+'\')"></div>'
        }
        imgSrcs.push(src);
        images.push(imgHtml);
      });
    };

    var createNav = function() {
      for (var i = 0; i < images.length; i++) {
        if (hSlider.type === 'carousel'){
          if( i === 0 ){
            navIndexes.push('<span class="hslider-nav hslider-select hslider-carousel selected" slide="'+i+'" style="background-image: url(\''+imgSrcs[i]+'\')"></span>');
          }
          else{
            navIndexes.push('<span class="hslider-nav hslider-select hslider-carousel" slide="'+i+'" style="background-image: url(\''+imgSrcs[i]+'\')"></span>');
          }
        }
        else{
          if( i === 0 ){
            navIndexes.push('<span class="hslider-nav hslider-select selected" slide="'+i+'"></span>');
          }
          else{
            navIndexes.push('<span class="hslider-nav hslider-select" slide="'+i+'"></span>');
          }
        }
      };
    };

    var setEffect = function() {
      // later
    };

    var createNextPrev = function() {
      var nextSlide;
      var prevSlide;
      if( (currIndex + 1) === images.length){
        nextSlide = 0;
      }
      else{
        nextSlide = (currIndex + 1);
      }
      if ((currIndex-1) < 0){
        prevSlide = images.length - 1
      }
      else{
        prevSlide = (currIndex-1);
      }
      nextPrevNav = '<div class="hslider-nav hslider-prev" slide="'+prevSlide+'"></div><div class="hslider-nav hslider-next" slide="'+nextSlide+'"></div>';
    };

    var writeToDom = function() {
      hSliderEl.html('');
      var joinedImages = images.join(' ');
      var joindeIndexes = navIndexes.join(' ');
      var newHtml;
      if (hSlider.type = 'carousel') {
        newHtml = '<div class="hslider-image-container">'+joinedImages+'<div class="hslider-prev-next-wrap hslider-nav-wrap">'+nextPrevNav+'</div></div><div class="hslider-indexes-wrap hslider-nav-wrap">'+joindeIndexes+'</div>'
      }
      else{
        newHtml = '<div class="hslider-image-container">'+joinedImages+'<div class="hslider-prev-next-wrap hslider-nav-wrap">'+nextPrevNav+'</div><div class="hslider-indexes-wrap hslider-nav-wrap">'+joindeIndexes+'</div></div>'
      }
      hSliderEl.html(newHtml);
    };

    var clickEvents = function() {
      $('.hslider-nav-wrap').click(function(event){
        clickedNav(event);
      });
    };

    var refreshIndexes = function() {
      $('.hslider-indexes-wrap').find('span').each(function(){
        if ($(this).attr('slide') == currIndex){
          $(this).addClass('selected');
        }
        else{
          $(this).removeClass('selected');
        }
      });
    };

    var refreshNextPrev = function() {
      var el = $('.hslider-prev-next-wrap')
      el.html('');
      el.html(nextPrevNav);
    };

    var timeDelay = function() {
      var time = parseInt(hSlider.delay)
      timer = setTimeout(function(){nextImage(currIndex + 1)}, time);
    };

    var nextImage = function(index) {
      if (index === images.length) {
        index = 0;
      }
      currIndex = index;
      $('.hslider-main-image').each(function(){
        if ($(this).attr('actual-slide') == currIndex){
          $(this).addClass('current');
        }
        else{
          $(this).removeClass('current');
        }
      });
      createNextPrev();
      refreshNextPrev();
      refreshIndexes();
      timeDelay();
    };

    var clickedNav = function(event) {
      window.clearTimeout(timer);
      var index = parseInt($(event.target).attr('slide'));
      if (!isNaN(index)){
        currIndex = index;
        createNextPrev();
        refreshNextPrev();
        refreshIndexes();
        nextImage(currIndex);
      }
    };

    init(options);
  }
})(jQuery)