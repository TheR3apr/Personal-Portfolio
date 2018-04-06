var app = app || {
  arr: [[{url:"https://github.com/TheR3apr/Simon-Game", pic:"http://gdurl.com/7QNF", description:"Simon game"}, 1],
       [{url:"https://github.com/TheR3apr/Pomodoro-Clock", pic:"http://gdurl.com/m-s7", description:"A pomodoro clock"}, 1],
       [{url:"https://github.com/TheR3apr/Calculator", pic:"http://gdurl.com/Yz6Xz", description:"A simple calculator"}, 1],
       [{url:"https://github.com/TheR3apr/Tic-tac-toe", pic:"http://gdurl.com/aGlX", description:"Tic-Tac-Toe"}, 1],
       [{url:"https://github.com/TheR3apr/Random-Quote-Machine", pic:"http://gdurl.com/cJzf", description:"A random quote machine"}, 1],
       [{url:"https://github.com/TheR3apr/Wiki-viewer", pic:"http://gdurl.com/PXkp", description:"A Wikipedia search engine"}, 1],
       [{url:"https://github.com/TheR3apr/Personal-Portfolio", pic:"http://gdurl.com/nfC4", description:"This portfolio page"},1]],
  initialize: function() {
    this.temparr = [];
    this.mode = 0;
    this.point = 0;
    this.slideIndex = 0;
    this.slides = $('.slideshow');
    this.dots = $('.dot');
  },
  controller: {
    regulatePopulation: function() {
      var curnum;
      $('#col1 a, #col2 a, #col3 a, #the-stuff').empty();
      $('#next2, #prev2').css('display', 'none');
      var cur = app.point*6;
      var source = $('#entry-template').html();
      app.template = Handlebars.compile(source);
      app.temparr = app.arr.filter(function(val){
        return !!(!app.mode || val[1] === app.mode);
      });
      if (app.temparr.length === 0) app.view.alternative();
      while (cur< app.arr.length && cur< (app.point + 1)*6){
        curnum = (cur%3)+1;
        app.view.populate(curnum, cur);
        cur++;
      }
      if (app.point > 0) app.view.displayPrevButton();
      if (cur < app.temparr.length) app.view.displayNextButton(); //!!!!
    },
    changePopulation: function (prevNext) {
      if (prevNext) app.point++;
      else app.point--;
      this.regulatePopulation();
    },
    download: function(){},
    submit: function(){},
    menuButton: function(){
      $('#menu').toggleClass('active');
    },
    moveSlides: function(n){
      this.manageSlides(app.slideIndex += n);
    },
    currentSlide: function(n){
      this.manageSlides(app.slideIndex = n);
    },
    manageSlides: function(n){
      app.view.deactivateSlides();
      if (n !== undefined){
        if (n > app.slides.length) slideIndex = 1;
        if (n < 1) app.slideIndex = app.slides.length;
      }
      else {
        app.slideIndex++;
        if (app.slideIndex > app.slides.length) app.slideIndex = 1;
      }
      app.view.activateSlide();
      clearTimeout(app.curTimeout);
      app.curTimeout = setTimeout(app.controller.manageSlides, 6000);
    },
    filterButton: function(n) {
      app.mode = n;
      app.point = 0;
      this.regulatePopulation();
    }
  },
  view: {
    populate: function(colnum, cur) {
      $('#col'+colnum).append(app.template(app.temparr[cur][0]));
    },
    displayPrevButton: function() {
      $('#prev2').css('display', '');
    },
    displayNextButton: function() {
      $('#next2').css('display', '');
    },
    deactivateSlides: function() {
      app.slides.css('display', 'none');
      app.dots.removeClass('active');
    },
    activateSlide: function(){
    	$('#pic0' + app.slideIndex).css('display', 'block');
    	$('#dot0' + app.slideIndex).addClass('active');
    },
    alternative: function(){
    	$('#the-stuff').append("<h1>There is nothing here... yet.</h1>");
    }
  }
}
$(document).ready(function(){
  app.initialize();
  app.controller.manageSlides();
  app.controller.regulatePopulation();
})
/*var app = app || {
  controler: {
    pp: function(){
      
    },
    ws: function(){
    
    },
    os: function(){
      
    },
    pw: function(){
      
    }
  }
};
var slideIndex = 0;
var curTimeout;
function moveSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slideshow");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  if (arguments.length === 1){
    if (n > slides.length) {slideIndex = 1}; 
    if (n < 1) {slideIndex = slides.length};
  }
  else {
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1} 
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
  clearTimeout(curTimeout);
  curTimeout = setTimeout(showSlides, 6000); 
}
$(document).ready(function(){
  showSlides();
  $('.menu-button').click(function () {
    $('#menu').toggleClass("activate");
});

})*/