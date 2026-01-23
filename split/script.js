gsap.registerPlugin(Draggable);

const dragger = document.querySelector('.split__dragger');
const topImage = document.querySelector('.split__image--top');
const bottomImage = document.querySelector('.split__image--bottom');

let dragStartX = 0;
let hasSplit = false;

let lastTap = 0;
const isMobileOrTablet = window.innerWidth < 1024; // 64em = 1024px

if (isMobileOrTablet) {
    dragger.addEventListener('touchend', function (e) {
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
    Draggable.create(dragger, {
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
    const splitContainer = document.querySelector('.split__container');
    const splitText = document.querySelectorAll('.split__text');
    const splitAfter = document.querySelector('.split__after');

    gsap.to(topImage, {
        y: -300,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.to(bottomImage, {
        y: 300,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.to([splitContainer, ...splitText], {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
    });

    gsap.to(splitAfter, {
        opacity: 1,
        ease: 'power2.inOut'
    });
}