gsap.registerPlugin(ScrollTrigger);

const carousel = document.getElementById('carousel');
const $items = document.querySelectorAll('.carousel-item');
const totalItems = $items.length;

function positionItems(rotation = 0) {
    const radius = 300;

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
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
            positionItems(rotationObject.rotation);
        }
    }
});

positionItems();