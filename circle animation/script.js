gsap.registerPlugin(ScrollTrigger);

const carousel = document.getElementById('carousel');
const $items = document.querySelectorAll('.carousel-item');
const totalItems = $items.length;

function getRadius() {
    const width = window.innerWidth;

    if (width < 768) {
        return 100; // Mobiel
    } else if (width < 1024) {
        return 200; // Tablet
    } else {
        return 300; // Desktop
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