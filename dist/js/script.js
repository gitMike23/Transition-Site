let controller;
let slidescene;
let pageScene;
let detailScene;


const cursor = document.querySelector('.cursor');
const cursorTxt = cursor.querySelector('.cursor__text');
const burgers = document.querySelectorAll('.burger');
const logo = document.querySelector('.header__id');

function animateSlides() {
    // Init controller
    controller = new ScrollMagic.Controller();

    // Selecting elements
    const slides = document.querySelectorAll('.main__slide');
    const header = document.querySelector('.header');

    // Loop over each slide
    slides.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector('.img__reveal');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.text__reveal');
    
        const animTrigger  = slide.querySelector('.main__slide-wrapper');

        // GSAP
        const slideTl = gsap.timeline({
            defaults: {duration: 1, ease: 'power2.inOut'}
        });
        
        slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'});
        slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=0.9');
        slideTl.fromTo(img, {zIndex: -1}, {zIndex: 1}, '-=1');
        slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.2');
        
        // Creatig Scene

        slidescene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
        .setTween(slideTl)
        // .addIndicators({
        //     colorStart: "green",
        //     colorTrigger: "blue",
        //     name: "slide",
        // })
        .addTo(controller);

        // New Animation
        const pageTl = gsap.timeline();


        let nextSlide = slides.length - 1 === index ? "end" : slides[index+1];
        pageTl.fromTo(nextSlide, {y: '0%'}, {y: '50%'})
        pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.5})
        pageTl.fromTo(nextSlide, {y: '50%'}, {y: '0%'}, '-=0.5')

        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0,
            duration: '100%'
        })
        .setTween(pageTl)
        // .addIndicators({
        //     colorStart: "white",
        //     colorTrigger: "white",
        //     name: "page",
        //     indent: 200
        // })
        .setPin(slide, {pushFollowers: false})
        .addTo(controller)
    });
    
}


function cursorMove(e) {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
}

function activeCursor(e) {
    const item = e.target;
    if(item.classList.contains("header__id") || item.classList.contains("burger")) {
        cursor.classList.add("cursor__active-nav")
    } else {
        cursor.classList.remove("cursor__active-nav")
    }

    

    if(item.classList.contains("btn")){
        cursor.classList.add("cursor__active-btn")
        cursorTxt.innerText = "Tap"
        gsap.to(".title__swipe", 0.7, {y: "0%"});
    } else {
        cursor.classList.remove("cursor__active-btn")
        cursorTxt.innerText = ""
        gsap.to(".title__swipe", 0.7, {y: "100%"});
    }

}

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
        gsap.to(".nav", 1.2, {clipPath: "circle(1px at 150% -50%)"});
        gsap.to(".header__id", 1, {color: "#fff"});

        document.body.classList.remove('hide');
    }

    

}


// Barba page transitions

barba.init({
    views: [
        {
            namespace: 'home',
            beforeEnter() {
                animateSlides();
                logo.href = "./index.html";
            },
            beforeLeave() {
                slidescene.destroy();
                pageScene.destroy();
                controller.destroy();
            }
        },

        {
            namespace: 'fashion',
            beforeEnter() {
                logo.href = "../index.html";
                detailAnimation();
            },
            beforeLeave() {
                controller.destroy();
                detailScene.destroy();
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
            tl.fromTo('header', 1, {y: '-100%'}, {y: '0%', ease: 'power2.inOut'});
            
        }

    }]
});


function detailAnimation() {
    controller = new ScrollMagic.Controller();
    const slides = document.querySelectorAll(".detail-slide");
    slides.forEach((slide, index, slides) => {
        const slideTl = gsap.timeline({defaults: {duration:1}});
        let nextSlide = slides.length - 1 === index ? "end" : slides[index+1];
        const nextImg = nextSlide.querySelector("img");
        slideTl.fromTo(slide, {opacity: 1}, {opacity: 0});
        slideTl.fromTo(nextSlide, {opacity: 0}, {opacity: 1}, '-=1');
        slideTl.fromTo(nextImg, {x: '50%'}, {x: '0%'});

        //Scene
        detailScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0
        })
        .setPin(slide, {pushFollowers: false})
        .setTween(slideTl)
        .addTo(controller);
    });

}

//EventListeners
burgers.forEach(burger => {
    burger.addEventListener('click', navToggle);
});
window.addEventListener('mousemove', cursorMove);
window.addEventListener('mouseover', activeCursor);


