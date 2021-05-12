const cursor = document.querySelector('.cursor');
const cursorTxt = cursor.querySelector('.cursor__text');
const burgers = document.querySelectorAll('.burger');
const logo = document.querySelector('.header__id');
const header = document.querySelector('.header');
const projectCards = document.querySelectorAll('.card');

const screenWidth = window.screen.width;
const screenHeigth = window.screen.height;


// console.log(screenHeigth);
// console.log(screenWidth);


if (screenWidth>991) {
    window.addEventListener('mousemove', cursorMove);
    window.addEventListener('mouseover', activeCursor);

}

//CURSOR DECORATION
function cursorMove(e) {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';   
}







//CURSOR TRANSFORMATIONS
function activeCursor(e) {
    const item = e.target;

    if(item.classList.contains("header__id") || item.classList.contains("burger")) {
        cursor.classList.add("cursor__active-nav");
    } else {
        cursor.classList.remove("cursor__active-nav");
    }

    if(item.classList.contains("btn") || item.classList.contains("card__btn")){
        cursor.classList.add("cursor__active-btn");
        gsap.to(".title__swipe", 0.7, {y: "0%"});
        cursorTxt.innerText = "Tap";
        
    } else {
        cursor.classList.remove("cursor__active-btn");
        cursorTxt.innerText = "";
        gsap.to(".title__swipe", 0.7, {y: "100%"});
    }

}



//BURGER ANIMATIONS
function navToggle(e) {
    if (!e.target.classList.contains('active')) {
        burgers.forEach(burger => burger.classList.add('active'));

        gsap.to(".burger__1", 0.5, {rotate: "45", y: 4, background: "black"});
        gsap.to(".burger__2", 0.5, {rotate: "-45", y: -5, background: "black"});
        gsap.to(".nav", 1, {clipPath: "circle(3000px at 100% -10%)"});
        gsap.to(".header__id", 1, {color: "#000"});

        document.body.classList.add('hide');

    } else {
        burgers.forEach(burger => burger.classList.remove('active'));
        
        gsap.to(".burger__1", 0.5, {rotate: "0", y: 0, background: "#fff"});
        gsap.to(".burger__2", 0.5, {rotate: "0", y: 0, background: "#fff"});
        gsap.to(".nav", 1.2, {clipPath: "circle(0.1px at 150% -50%)"});
        gsap.to(".header__id", 1, {color: "#fff"});

        document.body.classList.remove('hide');
    }
 

}


//BARBA PAGE TRANSITIONS
barba.init({
    views: [
        {
            namespace: 'home',
            beforeEnter() {
                logo.href = "./index.html";   

            },
            beforeLeave() {
               
            }
        },

        {
            namespace: 'projects',
            beforeEnter() {
                logo.href = "../index.html";
                
            },
            beforeLeave() {
            }

        }
    ],


    transitions: [{
        leave({current, next}) {
            let done = this.async();
            // An animation
            const tl = gsap.timeline({defaults: {ease: 'power2.inOut'}});
            tl.fromTo(current.container, 1, {opacity: 1}, {opacity: 0});
            tl.fromTo(".swipe", 0.75, {x: '-100%'}, {x: '0%', onComplete: done}, "-=0.5");
            
        },
        
        enter({current, next}) {
            let done = this.async();
            // Scroll to the top
            window.scrollTo(0, 0);
            // An animation
            const tl = gsap.timeline({defaults: {ease: 'power2.inOut'}});
            tl.fromTo(".swipe", 1, {x: '0%'}, {x: '100%', stagger: 0.25, onComplete: done});
            tl.fromTo(next.container, 1, {opacity: 0}, {opacity: 1});
            tl.fromTo(header, 1, {y: '-100%'}, {y: '0%', ease: 'power2.inOut'}); 

            
        }

    }]
});


//EventListeners
burgers.forEach(burger => {
    burger.addEventListener('click', navToggle);
});







//SCROLL UP BTN
const offset = 100; 
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
