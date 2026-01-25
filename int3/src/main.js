import { gsap } from "gsap";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// // Create and inject preloader HTML
// const preloaderHTML = `
//   <div class="preloader">
//     <div>
//       Loading
//       <span class="preloader__percentage">0%</span>
//     </div>
//     <div class="preloader__visual"></div>
//   </div>
// `;
// document.body.insertAdjacentHTML('afterbegin', preloaderHTML);

// // Preloader functionality
// const $preloaderPercentage = document.querySelector(".preloader__percentage");
// const $preloaderVisual = document.querySelector(".preloader__visual");
// let numImagesLoaded = 0;

// const imagePaths = [
//     'assets/img/rotateIMG1-50.avif',
//     'assets/img/rotateIMG1-105.avif',
//     'assets/img/rotateIMG1-145.avif',
//     'assets/img/rotateIMG2-50.avif',
//     'assets/img/rotateIMG2-105.avif',
//     'assets/img/rotateIMG2-145.avif',
//     'assets/img/rotateIMG3-50.avif',
//     'assets/img/rotateIMG3-105.avif',
//     'assets/img/rotateIMG3-145.avif',
//     'assets/img/rotateIMG4-50.avif',
//     'assets/img/rotateIMG4-105.avif',
//     'assets/img/rotateIMG4-145.avif',
//     'assets/img/rotateIMG5-50.avif',
//     'assets/img/rotateIMG5-105.avif',
//     'assets/img/rotateIMG5-145.avif',
//     'assets/img/rotateIMG6-50.avif',
//     'assets/img/rotateIMG6-105.avif',
//     'assets/img/rotateIMG6-145.avif',
//     'assets/img/rotateIMG7-50.avif',
//     'assets/img/rotateIMG7-105.avif',
//     'assets/img/rotateIMG7-145.avif',
//     'assets/img/rotateIMG8-50.avif',
//     'assets/img/rotateIMG8-105.avif',
//     'assets/img/rotateIMG8-145.avif',
//     'assets/img/rotateIMG9-50.avif',
//     'assets/img/rotateIMG9-105.avif',
//     'assets/img/rotateIMG9-145.avif',
//     'assets/img/rotateIMG10-50.avif',
//     'assets/img/rotateIMG10-105.avif',
//     'assets/img/rotateIMG10-145.avif',
//     'assets/img/rotateIMG11-50.avif',
//     'assets/img/rotateIMG11-105.avif',
//     'assets/img/rotateIMG11-145.avif',
//     'assets/img/rotateIMG12-50.avif',
//     'assets/img/rotateIMG12-105.avif',
//     'assets/img/rotateIMG12-145.avif'
// ];

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const loadImageAsync = (path) => {
//     return new Promise((resolve, reject) => {
//         const image = new Image();
//         image.src = path;
//         image.onload = () => resolve(image);
//         image.onerror = reject;
//     });
// };

// const onProgress = () => {
//     const relativeProgress = numImagesLoaded / imagePaths.length;
//     const progressPercentage = Math.round(relativeProgress * 100);
//     $preloaderPercentage.textContent = `${progressPercentage}%`;
//     $preloaderVisual.style.transform = `scale3d(1, ${relativeProgress}, 1)`;
// };

// const preloadComplete = async () => {
//     await delay(350);
//     document.querySelector("body").classList.remove("overflow-y-hidden");
//     gsap.to(".preloader", {
//         duration: 0.5,
//         autoAlpha: 0,
//         onComplete: () => {
//             document.documentElement.classList.remove("is-loading");
//             // Initialize all animations after preloader is done
//             init();
//             ScrollTrigger.refresh();
//         },
//     });
// };

// const initPreloader = async () => {
//     $preloaderVisual.classList.add("preloader__visual--has-transition");
//     onProgress();
//     document.documentElement.classList.add("is-loading");
//     document.querySelector("body").classList.add("overflow-y-hidden");

//     await Promise.all(
//         imagePaths.map(async (path) => {
//             const image = await loadImageAsync(path);
//             numImagesLoaded++;
//             onProgress();
//             return image;
//         })
//     );

//     preloadComplete();
// };

// initPreloader();

const addClass = () => {
    document.querySelectorAll('.js-only').forEach(el => {
        el.classList.remove('js-only');
    });

    document.querySelector('.intro').classList.add('intro-js');
}

const catwalkDrawSVG = () => {
    const catwalkPaths = document.querySelectorAll('.catwalk path');
    catwalkPaths.forEach(path => {
        gsap.fromTo(path,
            {
                drawSVG: '0%'
            },
            {
                drawSVG: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.outfits',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            }
        );
    });
}

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
const carousel__animation = () => {
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
}


function textChanger() {

    const $introtext = document.querySelectorAll('.intro__maintext');

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
            opacity: 0,
        }
    )

    gsap.set('.intro__subtext--2',
        {
            scale: 0,
        }
    )

    gsap.set('.intro__subtext--1',
        {
            scale: 1,
            opacity: 0,
        }
    )

    gsap.to(['.intro__text--1', '.intro__subtext--1'], {
        opacity: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: "body",
            start: "5% top",
            toggleActions: "play none none reverse"
        }
    })

    const tlIntro = gsap.timeline({
        scrollTrigger: {
            trigger: ".carousel__section",
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

const $first = document.querySelectorAll('.section__text');

const textAppear = () => {
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
                trigger: ".section--first",
                start: "top 30vh",
                end: window.innerWidth < 768 ? "top bottom" : "bottom bottom",
                scrub: 1,
            }
        })

        tlFirst.to('.section__text', {
            opacity: 1,
            duration: 1,
        })
    }
}

const popupGeschiedenisVragen = () => {
    gsap.set('.geschiedenis__vraag--1',
        {
            opacity: 0,
            scale: 0,
        }
    )

    gsap.set('.geschiedenis__vraag--2',
        {
            opacity: 0,
            scale: 0,
        }
    )

    gsap.to('.geschiedenis__vraag--1', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: ".geschiedenis__vragen",
            start: "-10% top",
            toggleActions: "play none none reverse"
        }
    })

    gsap.to('.geschiedenis__vraag--2', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: ".geschiedenis__vragen",
            start: "10% top",
            toggleActions: "play none none reverse"
        }
    })
}
const popupLichaamVragen = () => {
    console.log('lichaam vragen');

    gsap.set('.lichaam__vraag--1',
        {
            opacity: 0,
            scale: 0,
            rotation: -6.946
        }
    )

    gsap.set('.lichaam__vraag--2',
        {
            opacity: 0,
            scale: 0,
            rotation: 8.17
        }
    )

    gsap.set('.lichaam__vraag--3',
        {
            opacity: 0,
            scale: 0,
            rotation: -3.023
        }
    )

    gsap.to('.lichaam__vraag--1', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: ".lichaam__vragen",
            start: "-15% top",
            toggleActions: "play none none reverse"
        }
    })

    gsap.to('.lichaam__vraag--2', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: ".lichaam__vragen",
            start: "top top",
            toggleActions: "play none none reverse"
        }
    })

    gsap.to('.lichaam__vraag--3', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        scrollTrigger: {
            trigger: ".lichaam__vragen",
            start: "15% top",
            toggleActions: "play none none reverse"
        }
    })
}

const mannelijkheidScroll = () => {
    const vragen = gsap.utils.toArray(".mannelijkheid__vraag");
    const $section = document.querySelector('.mannelijkheid__vragen');

    /*---- setup (to end state) ----*/
    gsap.set(vragen[0], {
        transformOrigin: '0% 50%',
        y: 0,
        x: -200,
        rotation: 3.136,
    });

    gsap.set(vragen[1], {
        transformOrigin: '0% 50%',
        y: 50,
        x: -600,
        rotation: -4.199,
    });

    gsap.set(vragen[2], {
        transformOrigin: '0% 50%',
        y: -30,
        x: -950,
        rotation: 10.696,
    });

    gsap.set(vragen[3], {
        transformOrigin: '0% 50%',
        y: 40,
        x: -1300,
        rotation: 1.623,
    });

    gsap.set(vragen[4], {
        transformOrigin: '0% 50%',
        y: -20,
        x: -1600,
        rotation: -3.9,
    });

    gsap.set(vragen[5], {
        transformOrigin: '0% 50%',
        y: 35,
        x: -2050,
        rotation: 10.28,
    });

    // Create horizontal scroll animation through the clipped viewport
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: $section,
            start: 'top 20%',
            end: 'bottom 40%',
            scrub: 1,
        }
    });

    // Calculate total distance to scroll all text through
    const totalDistance = window.innerWidth + 2400;

    vragen.forEach((vraag, index) => {
        tl.to(vraag, {
            x: `+=${totalDistance}`,
            ease: 'none',
        }, 0);
    });
};

// Refresh ScrollTrigger after all content is loaded
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

// Extra refresh after images are loaded
if (document.readyState === 'complete') {
    setTimeout(() => ScrollTrigger.refresh(), 100);
    console.log('doc ready');
} else {
    window.addEventListener('load', () => {
        setTimeout(() => ScrollTrigger.refresh(), 100);
    });
}

const init = () => {
    addClass();
    positionItems();
    carousel__animation();
    textChanger();
    textAppear();
    popupGeschiedenisVragen();
    popupLichaamVragen();
    catwalkDrawSVG();
    mannelijkheidScroll();
}

init();