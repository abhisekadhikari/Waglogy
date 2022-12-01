const card = document.querySelector('.map-card');
const cardBody = card.querySelector('.card-body')

card.addEventListener('click', () => {
  cardBody.classList.toggle('closed')
})



// services

$(window).scroll(function() {
  $('.fadedfx').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+500) {
      $(this).addClass("fadeIn");
    }
  });
});