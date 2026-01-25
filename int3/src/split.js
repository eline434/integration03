import { gsap } from "gsap";

import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, ScrollTrigger);

const $dragger = document.querySelector('.split__dragger');
const $topImage = document.querySelector('.split__image--top');
const $bottomImage = document.querySelector('.split__image--bottom');

let dragStartX = 0;
let hasSplit = false;

let lastTap = 0;
const isMobileOrTablet = window.innerWidth < 1024;

if (isMobileOrTablet) {
    $dragger.addEventListener('touchend', function (e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 500 && tapLength > 0) {
            if (!hasSplit) {
                hasSplit = true;
                performSplit();
            }
        }
        lastTap = currentTime;
    });
} else {
    Draggable.create($dragger, {
        type: 'x',
        bounds: { minX: 0, maxX: 200 },
        onDragStart: function () {
            dragStartX = this.x;
        },
        onDrag: function () {
            if (hasSplit) return;

            const dragDistance = Math.abs(this.x - dragStartX);

            if (dragDistance > 50) {
                hasSplit = true;
                performSplit();
            }
        }
    });
}

function performSplit() {
    const $splitContainer = document.querySelector('.split__container');
    const $splitText = document.querySelectorAll('.split__text');
    const $splitAfter = document.querySelector('.split__after');

    // Calculate position for .split__after
    const containerRect = $splitContainer.getBoundingClientRect();
    const splitRect = document.querySelector('.split').getBoundingClientRect();
    const topPosition = containerRect.bottom - splitRect.top + 20; // 20px gap

    // Set the top position
    $splitAfter.style.top = topPosition + 'px';

    gsap.to($topImage, {
        y: -300,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.to($bottomImage, {
        y: 300,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.to([$splitContainer, ...$splitText], {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
    });

    const windowWidth = window.innerWidth;
    let initialY;
    if (windowWidth >= 1024) {
        initialY = -850;  // Desktop
    } else if (windowWidth >= 768) {
        initialY = -450;  // Tablet
    } else {
        initialY = -250;  // Mobile
    }

    gsap.set($splitAfter, {
        y: initialY,
    });

    gsap.to($splitAfter, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
    });

    const $imgGroupImages = document.querySelectorAll('.IMGgroup__img');
    const $imgGroup = document.querySelector('.IMGgroup');
    const splitAfterRect = $splitAfter.getBoundingClientRect();
    const splitAfterCenterX = splitAfterRect.left + splitAfterRect.width / 2;
    const splitAfterCenterY = splitAfterRect.top + splitAfterRect.height / 2;

    const imgGroupRect = $imgGroup.getBoundingClientRect();
    const imgGroupBottom = imgGroupRect.bottom;
    const imgGroupCenterX = imgGroupRect.left + imgGroupRect.width / 2;
    const imgGroupCenterY = imgGroupRect.top + imgGroupRect.height / 2;
    const offsetToImgGroupEnd = imgGroupBottom - splitAfterCenterY;
    const offsetToImgGroupCenter = imgGroupCenterY - splitAfterCenterY;

    let splitAfterX, splitAfterY, splitAfterRotation;
    if (windowWidth >= 768) {
        splitAfterX = (window.innerWidth / 2) - splitAfterCenterX + 40;
        splitAfterY = -0;
        splitAfterRotation = -10.644;
    } else {
        splitAfterX = -40;
        splitAfterY = offsetToImgGroupEnd - 40;
        splitAfterRotation = -10.644;
    }

    gsap.to($splitAfter, {
        y: splitAfterY,
        x: splitAfterX,
        rotation: splitAfterRotation,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: $imgGroup,
            start: 'top 80%',
            end: 'bottom 70%',
            scrub: 1,
            once: true
        }
    });

    let rotations;

    if (windowWidth >= 768) {
        rotations = {
            'IMGgroup__img--1': 13.219,
            'IMGgroup__img--2': 17.973,
            'IMGgroup__img--3': -9.92,
            'IMGgroup__img--4': -16.345,
            'IMGgroup__img--5': -0.113,
            'IMGgroup__img--6': 25.53,
            'IMGgroup__img--7': -2.006
        };
    } else {
        rotations = {
            'IMGgroup__img--1': 2.357,
            'IMGgroup__img--2': 12.446,
            'IMGgroup__img--3': 3.005,
            'IMGgroup__img--4': -9.855,
            'IMGgroup__img--5': -4.078,
            'IMGgroup__img--6': 6.548,
            'IMGgroup__img--7': -2.006
        };
    }

    $imgGroupImages.forEach((img) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenterX = imgRect.left + imgRect.width / 2;

        let targetRotation = 0;
        for (const className in rotations) {
            if (img.classList.contains(className)) {
                targetRotation = rotations[className];
                break;
            }
        }

        gsap.fromTo(img,
            {
                x: (window.innerWidth / 2) - imgCenterX,
                y: -800,
                rotation: 0,
                opacity: 0
            },
            {
                x: 0,
                y: 0,
                rotation: targetRotation,
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: $imgGroup,
                    start: 'top 80%',
                    end: 'bottom 70%',
                    scrub: 1,
                    once: true
                }
            }
        );
    });
}