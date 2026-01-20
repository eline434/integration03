gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.js-only').forEach(el => {
    el.classList.remove('js-only');
});

document.querySelector('.intro').classList.add('intro-js');

const $carousel = document.getElementById('carousel');
const $items = document.querySelectorAll('.carousel__item');
const totalItems = $items.length;

function getRadius() {
    const width = window.innerWidth;

    if (width < 768) {
        return 100;
    } else if (width < 1024) {
        return 200;
    } else {
        return 300;
    }
}

const rotationObject = { rotation: 0 };
const offsetObject = { x1: 0, y1: 0, x2: 0, y2: 0 };

function positionItems(rotation = 0) {
    const radius = getRadius();

    $items.forEach((item, index) => {
        const angle = (360 / totalItems) * index + rotation;
        const angleRad = (angle * Math.PI) / 180;

        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        const isGroup1 = item.classList.contains('carousel__item--1');
        const offsetX = isGroup1 ? offsetObject.x2 : offsetObject.x1;
        const offsetY = isGroup1 ? offsetObject.y2 : offsetObject.y1;

        item.style.transform = `
            translate(-50%, -100%)
            translate(${x + offsetX}px, ${y + offsetY}px)
            rotate(${angle + 90}deg)
        `;
    });
}

// Carousel rotatie animatie
const tlCarousel = gsap.timeline({
    scrollTrigger: {
        trigger: ".carousel__animation",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: () => positionItems(rotationObject.rotation)
    }
});

tlCarousel.to(rotationObject, {
    rotation: 360 * 1,
    ease: "none",
});

const $carousel1 = document.querySelectorAll('.carousel__item--1');
const $carousel2 = document.querySelectorAll('.carousel__item--2');

const tlSplit = gsap.timeline({
    scrollTrigger: {
        trigger: ".carousel__animation",
        start: "70% bottom",
        end: "90% bottom",
        scrub: 1,
        onUpdate: () => positionItems(rotationObject.rotation)
    }
})

if (window.innerWidth >= 768) {
    tlSplit.to(offsetObject, {
        x1: -window.innerWidth * 0.30,
        y1: window.innerHeight * 0.90,
        x2: window.innerWidth * 0.30,
        y2: -window.innerHeight * 0.00,
        ease: "none",
    }, 0);
} else {
    tlSplit.to('.carousel', {
        opacity: 0,
    })
}


function textChanger() {

    const $introtext = document.querySelectorAll('.intro__item--text');
    const $introsubtext = document.querySelectorAll('.intro__item--subtext');

    $introtext.forEach(text => {
        gsap.set(text,
            {
                scale: 0,
            }
        )
    });

    gsap.set('.intro__text--1',
        {
            scale: 1,
        }
    )

    $introsubtext.forEach(text => {
        gsap.set(text,
            {
                scale: 0,
            }
        )
    });

    gsap.set('.intro__subtext--1',
        {
            scale: 1,
        }
    )

    const tlIntro = gsap.timeline({
        scrollTrigger: {
            trigger: ".header",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        }
    })

    tlIntro.to('.intro__subtext--1', {
        scale: 0,
    })

    tlIntro.to('.intro__text--1', {
        scale: 0,
    })

    tlIntro.to('.intro__subtext--2', {
        scale: 1,
    })

    tlIntro.to('.intro__text--2', {
        scale: 1,
    })

    tlIntro.to('.intro__text--2', {
        scale: 0,
    })

    tlIntro.to('.intro__text--3', {
        scale: 1,
    })

    tlIntro.to('.intro__text--3', {
        scale: 0,
    })

    tlIntro.to('.intro__text--4', {
        scale: 1,
    })

    tlIntro.to('.intro__text--4', {
        opacity: 0,
        duration: 1,
    })

    tlIntro.to('.intro__subtext--2', {
        opacity: 0,
        duration: 1,
    }, "<")
}

const $first = document.querySelectorAll('.first__text');

if (window.innerWidth >= 768) {
    $first.forEach(text => {
        gsap.set(text,
            {
                opacity: 0,
            }
        )
    });

    const tlFirst = gsap.timeline({
        scrollTrigger: {
            trigger: ".first",
            start: "top 30%",
            end: "bottom bottom",
            scrub: 1,
        }
    })

    tlFirst.to('.first__text', {
        opacity: 1,
        duration: 1,
    })
}


positionItems();
textChanger()