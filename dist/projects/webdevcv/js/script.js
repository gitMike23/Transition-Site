'use ctrict';
new WOW().init();

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const menuClose = document.querySelector('.menu__close');


let closeMenu = function () {
    menu.classList.remove('active');
    document.body.style.overflow = "";
};

let showMenu = function () {
    menu.classList.add('active');
    document.body.style.overflow = "hidden";
};

//show and hide Menu 
hamburger.addEventListener('click', showMenu);
menuClose.addEventListener('click', closeMenu);

menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu__overlay')) {
        closeMenu();
    }
});

//Closing modal with ESC key
document.addEventListener('keydown', (event) => {
    if(event.code === "Escape" && menu.classList.contains('active')) {
        closeMenu();
    }
});


const counters = document.querySelectorAll('.products__percent');
const lines = document.querySelectorAll('.products__item-bottom span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

// scrollup

const offset = 900; 
const scrollUp = document.querySelector('.scroll-up'); 
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path'); 
const pathLength = scrollUpSvgPath.getTotalLength(); 

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;


//updateDateOffset 
const updateDateOffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / height);
    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

//onScroll  
window.addEventListener('scroll', () => {
    updateDateOffset();
    if (getTop() > offset) {
        scrollUp.classList.add("scroll-up--active"); 
    } else {
        scrollUp.classList.remove("scroll-up--active"); 
    }

});

//click
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



window.onscroll = function (e) {
    console.log(window.scrollY); // Value of scroll Y in px
};