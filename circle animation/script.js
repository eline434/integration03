gsap.registerPlugin(ScrollTrigger);

const $carousel = document.getElementById('carousel');
const $items = document.querySelectorAll('.carousel-item');
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

function positionItems(rotation = 0) {
    const radius = getRadius();

    $items.forEach((item, index) => {
        const angle = (360 / totalItems) * index + rotation;
        const angleRad = (angle * Math.PI) / 180;

        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        item.style.transform = `
            translate(-50%, -100%)
            translate(${x}px, ${y}px)
            rotate(${angle + 90}deg)
        `;
    });
}

const rotationObject = { rotation: 0 };

gsap.to(rotationObject, {
    rotation: 360 * 1,
    ease: "none",
    scrollTrigger: {
        trigger: ".header",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
            positionItems(rotationObject.rotation);
        }
    }
});


function textChanger() {

    const $introtext = document.querySelectorAll('.intro__text');
    const $introsubtext = document.querySelectorAll('.intro__subtext');

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
}

positionItems();
textChanger()