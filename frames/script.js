gsap.registerPlugin(Draggable);

const $frames = document.querySelectorAll('.mannelijkheid__interaction--frame');
const $referenceImg = document.querySelector('.mannelijkheid__interaction--IMG');
const $textDisplay = document.querySelector('.mannelijkheid__interaction--textDisplay');

$frames.forEach((frame, index) => {

    function calculateCenter() {
        const frameRect = frame.getBoundingClientRect();
        const imgRect = $referenceImg.getBoundingClientRect();

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

        const percentageX = ((relativeX / imgRect.width) * 100).toFixed(2);
        const percentageY = ((relativeY / imgRect.height) * 100).toFixed(2);

        if (frame.classList.contains('frame-l')) {
            if (percentageX >= 30 && percentageX <= 60 && percentageY >= 10 && percentageY <= 45) {
                $textDisplay.textContent = 'kracht';
            }
            else if (percentageX >= 30 && percentageX <= 60 && percentageY >= 45 && percentageY <= 57) {
                $textDisplay.textContent = 'verlangen';
            }
            else if (percentageX >= 30 && percentageX <= 60 && percentageY >= 57 && percentageY <= 93) {
                $textDisplay.textContent = 'mode';
            }
            else if (percentageX >= 0 && percentageX <= 100 && percentageY >= 0 && percentageY <= 100) {
                $textDisplay.textContent = 'zwart';
            }
        }

        if (frame.classList.contains('frame-m')) {
            if (percentageX >= 30 && percentageX <= 60 && percentageY >= 10 && percentageY <= 45) {
                $textDisplay.textContent = 'kracht';
            }
            else if (percentageX >= 30 && percentageX <= 60 && percentageY >= 45 && percentageY <= 57) {
                $textDisplay.textContent = 'verlangen';
            }
            else if (percentageX >= 30 && percentageX <= 60 && percentageY >= 57 && percentageY <= 93) {
                $textDisplay.textContent = 'mode';
            }
            else if (percentageX >= 0 && percentageX <= 100 && percentageY >= 0 && percentageY <= 100) {
                $textDisplay.textContent = 'zwart';
            }
        }

        if (frame.classList.contains('frame-s')) {
            if (percentageX >= 35 && percentageX <= 65 && percentageY >= 20 && percentageY <= 57) {
                $textDisplay.textContent = 'verlangen';
            }
            else if (percentageX >= 45 && percentageX <= 53 && percentageY >= 9 && percentageY <= 18) {
                $textDisplay.textContent = 'kracht';
            }
            else if (percentageX >= 25 && percentageX <= 60 && percentageY >= 26 && percentageY <= 43) {
                $textDisplay.textContent = 'kracht';
            }
            else if (percentageX >= 30 && percentageX <= 60 && percentageY >= 57 && percentageY <= 93) {
                $textDisplay.textContent = 'mode';
            }
            else if (percentageX >= 0 && percentageX <= 100 && percentageY >= 0 && percentageY <= 100) {
                $textDisplay.textContent = 'zwart';
            }
        }

        if (frame.classList.contains('frame-xs')) {
            if (percentageX >= 35 && percentageX <= 65 && percentageY >= 20 && percentageY <= 57) {
                $textDisplay.textContent = 'verlangen';
            }
            else if (percentageX >= 45 && percentageX <= 53 && percentageY >= 9 && percentageY <= 18) {
                $textDisplay.textContent = 'kracht';
            }
            else if (percentageX >= 25 && percentageX <= 60 && percentageY >= 26 && percentageY <= 43) {
                $textDisplay.textContent = 'kracht';
            }
            else if (percentageX >= 30 && percentageX <= 60 && percentageY >= 57 && percentageY <= 93) {
                $textDisplay.textContent = 'mode';
            }
            else if (percentageX >= 0 && percentageX <= 100 && percentageY >= 0 && percentageY <= 100) {
                $textDisplay.textContent = 'zwart';
            }
        }
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
});
