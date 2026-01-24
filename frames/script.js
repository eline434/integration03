gsap.registerPlugin(Draggable);

const $frames = document.querySelectorAll('.mannelijkheid__interaction--frame');
const referenceImg = document.querySelector('.mannelijkheid__interaction--IMG');

$frames.forEach((frame, index) => {

    function calculateCenter() {
        const frameRect = frame.getBoundingClientRect();
        const imgRect = referenceImg.getBoundingClientRect();

        const frameCenterX = frameRect.left + frameRect.width / 2;
        const frameCenterY = frameRect.top + frameRect.height / 2;

        const relativeX = frameCenterX - imgRect.left;
        const relativeY = frameCenterY - imgRect.top;

        console.log(`Frame ${frame.classList[1]} center relative to IMG:`, {
            x: relativeX.toFixed(2),
            y: relativeY.toFixed(2),
            percentageX: ((relativeX / imgRect.width) * 100).toFixed(2) + '%',
            percentageY: ((relativeY / imgRect.height) * 100).toFixed(2) + '%'
        });
    }

    Draggable.create(frame, {
        type: "x,y",
        onDragStart: function () {
            $frames.forEach((otherFrame) => {
                if (otherFrame !== frame) {
                    gsap.to(otherFrame, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        },
        onDragEnd: function () {
            console.log(`\n=== Final position for ${frame.classList[1]} ===`);
            calculateCenter();
        }
    });

    console.log(`\n=== Initial position for ${frame.classList[1]} ===`);
    calculateCenter();
});
