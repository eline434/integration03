gsap.registerPlugin(Draggable);

const $dragger = document.querySelector('.split__dragger');
const $topImage = document.querySelector('.split__image--top');
const $bottomImage = document.querySelector('.split__image--bottom');

let dragStartX = 0;
let hasSplit = false;

let lastTap = 0;
const isMobileOrTablet = window.innerWidth < 1024; // 64em = 1024px

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

    gsap.to($splitAfter, {
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: 'power2.inOut'
    });

    // Animeer IMGgroup images vanaf split__after positie naar hun posities
    const imgGroupImages = document.querySelectorAll('.IMGgroup__img');
    const splitAfterRect = $splitAfter.getBoundingClientRect();
    const splitAfterCenterX = splitAfterRect.left + splitAfterRect.width / 2;
    const splitAfterCenterY = splitAfterRect.top + splitAfterRect.height / 2;

    // Rotation values uit CSS
    const rotations = {
        'IMGgroup__img--1': 2.357,
        'IMGgroup__img--2': 12.446,
        'IMGgroup__img--3': 3.005,
        'IMGgroup__img--4': -9.855,
        'IMGgroup__img--5': -4.078,
        'IMGgroup__img--6': 6.548,
        'IMGgroup__img--7': -2.006
    };

    imgGroupImages.forEach((img) => {
        const imgRect = img.getBoundingClientRect();
        const imgCenterX = imgRect.left + imgRect.width / 2;
        const imgCenterY = imgRect.top + imgRect.height / 2;
        const offsetX = splitAfterCenterX - imgCenterX;
        const offsetY = splitAfterCenterY - imgCenterY;
        
        // Vind de rotation uit het rotations object
        let targetRotation = 0;
        for (const className in rotations) {
            if (img.classList.contains(className)) {
                targetRotation = rotations[className];
                break;
            }
        }

        gsap.fromTo(img,
            {
                x: offsetX,
                y: offsetY,
                rotation: 0,
                opacity: 0
            },
            {
                x: 0,
                y: 0,
                rotation: targetRotation,
                opacity: 1,
                duration: 1.5,
                delay: 2,
                ease: 'power2.out'
            }
        );
    });
}