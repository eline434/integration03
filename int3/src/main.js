import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as preloader from "./sections/preloader.js";
import { prefersReducedMotion, getResponsiveRadius, breakpoints } from "./utils/mediaQuery.js";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

const enableJSFeatures = () => {
    document.querySelectorAll('.js-only').forEach(el => {
        el.classList.remove('js-only');
    });
    document.querySelector('.intro')?.classList.add('intro-js');
};

const initCatwalkDrawSVG = () => {
    if (prefersReducedMotion()) return;

    const catwalkPaths = document.querySelectorAll('.catwalk path');
    catwalkPaths.forEach(path => {
        gsap.fromTo(path,
            { drawSVG: '0%' },
            {
                drawSVG: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.outfits',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            }
        );
    });
};

const initCarouselAnimation = () => {
    const $carousel = document.getElementById('carousel');
    const $items = document.querySelectorAll('.carousel__item');
    const totalItems = $items.length;

    if (!$carousel || totalItems === 0) return;

    const rotationObject = { rotation: 0 };
    const offsetObject = { x1: 0, y1: 0, x2: 0, y2: 0 };

    const positionItems = (rotation = 0) => {
        const radius = getResponsiveRadius();

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
    };

    positionItems();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
        if (prefersReducedMotion()) return;

        const tlCarousel = gsap.timeline({
            scrollTrigger: {
                trigger: ".carousel__animation",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: () => positionItems(rotationObject.rotation)
            }
        });

        tlCarousel.to(rotationObject, {
            rotation: 360,
            ease: "none",
        });
    });

    mm.add(breakpoints.tablet, () => {
        if (prefersReducedMotion()) return;

        const tlSplit = gsap.timeline({
            scrollTrigger: {
                trigger: ".carousel__animation",
                start: "70% bottom",
                end: "90% bottom",
                scrub: true,
                onUpdate: () => positionItems(rotationObject.rotation)
            }
        });

        tlSplit.to(offsetObject, {
            x1: -window.innerWidth * 0.30,
            y1: window.innerHeight * 0.90,
            x2: window.innerWidth * 0.30,
            y2: -window.innerHeight * 0.00,
            ease: "none",
        }, 0);
    });

    mm.add(breakpoints.mobile, () => {
        if (prefersReducedMotion()) return;

        gsap.timeline({
            scrollTrigger: {
                trigger: ".carousel__animation",
                start: "70% bottom",
                end: "90% bottom",
                scrub: true,
            }
        }).to('.carousel', { opacity: 0 });
    });
};

const initIntroTextAnimation = () => {
    if (prefersReducedMotion()) return;

    const $introtext = document.querySelectorAll('.intro__maintext');
    const $intro = document.querySelector('.intro');

    $introtext.forEach(text => gsap.set(text, { scale: 0 }));
    gsap.set('.intro__text--1', { scale: 1, opacity: 0 });
    gsap.set('.intro__subtext--1', { scale: 1, opacity: 0 });
    gsap.set('.intro__subtext--2', { scale: 0 });

    gsap.to(['.intro__text--1', '.intro__subtext--1'], {
        opacity: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: "body",
            start: "5% top",
            toggleActions: "play none none reverse"
        }
    });

    const tlIntro = gsap.timeline({
        scrollTrigger: {
            trigger: ".carousel__section",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onEnter: () => {
                $intro?.classList.remove('visually-hidden');
            },
            onLeave: () => {
                $intro?.classList.add('visually-hidden');
            },
            onEnterBack: () => {
                $intro?.classList.remove('visually-hidden');
            },
            onLeaveBack: () => {
                $intro?.classList.remove('visually-hidden');
            }
        }
    });

    tlIntro
        .to('.intro__subtext--1', { scale: 0 })
        .to('.intro__text--1', { scale: 0 })
        .to('.intro__subtext--2', { scale: 1 })
        .to('.intro__text--2', { scale: 1 })
        .to('.intro__text--2', { scale: 0 })
        .to('.intro__text--3', { scale: 1 })
        .to('.intro__text--3', { scale: 0 })
        .to('.intro__text--4', { scale: 1 })
        .to('.intro__text--4', { opacity: 0, duration: 1 })
        .to('.intro__subtext--2', { opacity: 0, duration: 1 }, "<");
};


const initSectionTextAnimation = () => {
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add(breakpoints.tablet, () => {
        const $first = document.querySelectorAll('.section__text');

        $first.forEach(text => gsap.set(text, { opacity: 0 }));

        gsap.timeline({
            scrollTrigger: {
                trigger: ".section--first",
                start: "top 30vh",
                end: "bottom bottom",
                scrub: true,
            }
        }).to('.section__text', { opacity: 1, duration: 1 });
    });
};

const initGeschiedenisVragen = () => {
    if (prefersReducedMotion()) return;

    gsap.set(['.geschiedenis__vraag--1', '.geschiedenis__vraag--2'], {
        opacity: 0,
        scale: 0,
    });

    gsap.to('.geschiedenis__vraag--1', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: ".geschiedenis__vragen",
            start: "-10% top",
            toggleActions: "play none none reverse"
        }
    });

    gsap.to('.geschiedenis__vraag--2', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: ".geschiedenis__vragen",
            start: "10% top",
            toggleActions: "play none none reverse"
        }
    });
};

const initLichaamVragen = () => {
    if (prefersReducedMotion()) return;

    const vragen = [
        { el: '.lichaam__vraag--1', rotation: -6.946, start: "-15% top" },
        { el: '.lichaam__vraag--2', rotation: 8.17, start: "top top" },
        { el: '.lichaam__vraag--3', rotation: -3.023, start: "15% top" }
    ];

    vragen.forEach(({ el, rotation, start }) => {
        gsap.set(el, { opacity: 0, scale: 0, rotation });

        gsap.to(el, {
            opacity: 1,
            scale: 1,
            rotation,
            duration: 0.3,
            scrollTrigger: {
                trigger: ".lichaam__vragen",
                start,
                toggleActions: "play none none reverse"
            }
        });
    });
};

const initMannelijkheidScroll = () => {
    if (prefersReducedMotion()) return;

    const vragen = gsap.utils.toArray(".mannelijkheid__vraag");
    const $section = document.querySelector('.mannelijkheid__vragen');

    if (!$section || vragen.length === 0) return;

    // Initial positioning data
    const vraagConfig = [
        { y: 0, x: -200, rotation: 3.136 },
        { y: 50, x: -600, rotation: -4.199 },
        { y: -30, x: -950, rotation: 10.696 },
        { y: 40, x: -1300, rotation: 1.623 },
        { y: -20, x: -1600, rotation: -3.9 },
        { y: 35, x: -2050, rotation: 10.28 }
    ];

    // Setup initial positions
    vragen.forEach((vraag, index) => {
        if (vraagConfig[index]) {
            gsap.set(vraag, {
                transformOrigin: '0% 50%',
                ...vraagConfig[index]
            });
        }
    });

    // Horizontal scroll timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: $section,
            start: 'top 20%',
            end: 'bottom 40%',
            scrub: true,
        }
    });

    const totalDistance = window.innerWidth + 2400;
    vragen.forEach((vraag) => {
        tl.to(vraag, { x: `+=${totalDistance}`, ease: 'none' }, 0);
    });
};

const initBallAnimation = () => {
    let tlball = gsap.timeline({
        scrollTrigger: {
            trigger: ".sport",
            start: "10% top",
            end: "bottom 30%",
            scrub: true,
        }
    });

    tlball.from('.sport__text--1', {});
    tlball.to('.sport__text--1', { x: 1300, y: 600 });

    tlball.from('.sport__img', {});
    tlball.to('.sport__img', { rotate: -143.629 });

    tlball.from('.sport__text--2', { x: 1300, y: -600 });
    tlball.to('.sport__text--2', {});
};


const init = () => {
    enableJSFeatures();
    initCarouselAnimation();
    initIntroTextAnimation();
    initSectionTextAnimation();
    initGeschiedenisVragen();
    initLichaamVragen();
    initCatwalkDrawSVG();
    initBallAnimation();
    initMannelijkheidScroll();

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
};

preloader.init(init);