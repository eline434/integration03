import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const beeldImages = document.querySelectorAll('.beeld__img');
const numImages = beeldImages.length;

beeldImages.forEach((img, i) => {
    const duration = 15;
    const delay = i * 2.5;
    const totalCycleTime = numImages * 2.5;
    const extraPause = 5;

    const startX = window.innerWidth + 300;
    const endX = -2000;
    const centerY = window.innerHeight * 0.2;

    gsap.set(img, {
        x: startX,
        y: centerY,
        zIndex: 100
    });

    gsap.to(img, {
        duration: duration,
        delay: delay,
        repeat: -1,
        repeatDelay: totalCycleTime - duration + extraPause,
        ease: 'none',
        motionPath: {
            path: `M ${startX},${centerY} L ${endX},${centerY}`,
            align: "self",
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1
        }
    });
});


