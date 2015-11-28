//for post toc
$(document).ready(function(){
  if($('ul#markdown-toc').length > 0){
    $('.post-content :header').css({cursor:'pointer'}).click(function(event){
      document.location="#markdown-toc";
    });
  }

  //the image displayer
  $('.post-content img').css({cursor:'pointer'}).click(function(event){
    //get image source
    var href=this.src;
    var displayer=$('<div></div>').addClass('image-displayer').insertAfter($('body'));
    $('body').css('overflow','hidden');
    $('<img/>').attr('src',href).appendTo(displayer).toggleClass('image-fit').click(function(){
      $(this).toggleClass('image-fit');
      if(!$(this).hasClass('image-fit')){
        $(this).css('cursor','zoom-out');
      }else{
        $(this).css('cursor','zoom-in');
      }
    });

    //the close button
    $('<div>Close</div>').addClass('display-close').appendTo(displayer).click(function(){
      //remove image displayer
      displayer.remove()
      $('body').css('overflow','scroll');
    });
  }
  );
});
