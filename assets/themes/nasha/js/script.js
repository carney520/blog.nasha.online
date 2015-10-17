//for post toc
$(document).ready(function(){
  if($('ul#markdown-toc').length > 0){
    $('.post-content :header').css({cursor:'pointer'}).click(function(event){
      document.location="#markdown-toc";
    });
  }
});
