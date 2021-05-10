// функция IBG для фоновой фулл-скрин картинки
function ibg(){
    $.each($('.ibg'), function(index, val) {
        if($(this).find('img').length>0){
            $(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
        }
    });
}
ibg();

//смена классов
$('.icon-menu').click(function(event){
    $(this).toggleClass('active');
    $('.menu__body').toggleClass('active');
    $('body').toggleClass('lock');
});


// слайдер слик

$(document).ready(function(){
    $('.slider__body').slick({
        dots: true,
        arrows: false,
        accessibility: false,
        slidesToShow: 1,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        nextArrow: '<button type="button" class="slick-next"></button>',
        prevArrow: '<button type="button" class="slick-prev"></button>',
        responsive: [{
            breakpoint: 768,
            settings: {}
        }]
    });

    // form validation

    $('.subscribe__form').validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: {
                required: "Please, enter your e-mail address",
                email: "Please, enter a valid email address"
            }
        }
    });

});
 
  

    
