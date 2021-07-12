$(document).ready(function(){
    $('.speakers-slider').slick({   
        arrows: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
        

    });

    $('.photos-slider').slick({
        arrows: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        variableWidth: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    // const div = $('.participate');
    // const footer = $('.footer');
    // let divHeight = $('.participate').innerHeight() + 'px';
    // let divWidth = $('.participate').innerWidth() + 'px';

    // footer.css("background","url(../img/bg/participate_bg.jpg) center center/cover no-repeat");

    // console.log(divHeight, divWidth);


    $(document).on('click', 'a[href^="#form"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
    });
    
});