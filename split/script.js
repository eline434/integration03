gsap.registerPlugin(Draggable);

const dragger = document.querySelector('.split__dragger');
const topImage = document.querySelector('.split__image--top');
const bottomImage = document.querySelector('.split__image--bottom');

let dragStartX = 0;
let hasSplit = false;

Draggable.create(dragger, {
    type: 'x',
    bounds: { minX: 0, maxX: 200 },
    onDragStart: function () {
        dragStartX = this.x;
    },
    onDrag: function () {
        if (hasSplit) return;

        const dragDistance = Math.abs(this.x - dragStartX);

        // Als er meer dan 50px horizontaal is gesleept
        if (dragDistance > 50) {
            hasSplit = true;
            performSplit();
        }
    }
});

function performSplit() {
    // Verberg de dragger
    gsap.to(dragger, {
        opacity: 0,
        duration: 0.3
    });

    // Animeer het bovenste deel naar boven
    gsap.to(topImage, {
        y: -300,
        duration: 1,
        ease: 'power2.out'
    });

    // Animeer het onderste deel naar beneden
    gsap.to(bottomImage, {
        y: 300,
        duration: 1,
        ease: 'power2.out'
    });
}