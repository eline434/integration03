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

        if (frame.classList.contains('frame-l')) {
            if (relativeX >= 145 && relativeX <= 280 && relativeY >= 170 && relativeY <= 315) {
                console.log('kracht');
                $textDisplay.textContent = 'kracht';
            }
            else if (relativeX >= 145 && relativeX <= 280 && relativeY >= 315 && relativeY <= 400) {
                console.log('verlangen');
                $textDisplay.textContent = 'verlangen';
            }
            else if (relativeX >= 145 && relativeX <= 280 && relativeY >= 400 && relativeY <= 650) {
                console.log('mode');
                $textDisplay.textContent = 'mode';
            }
            else if (relativeX >= 0 && relativeX <= imgRect.width && relativeY >= 0 && relativeY <= imgRect.height) {
                console.log('zwart');
                $textDisplay.textContent = 'zwart';
            }
        }

        if (frame.classList.contains('frame-m')) {
            if (relativeX >= 145 && relativeX <= 280 && relativeY >= 170 && relativeY <= 315) {
                console.log('kracht');
                $textDisplay.textContent = 'kracht';
            }
            else if (relativeX >= 145 && relativeX <= 280 && relativeY >= 315 && relativeY <= 400) {
                console.log('verlangen');
                $textDisplay.textContent = 'verlangen';
            }
            else if (relativeX >= 145 && relativeX <= 280 && relativeY >= 400 && relativeY <= 650) {
                console.log('mode');
                $textDisplay.textContent = 'mode';
            }
            else if (relativeX >= 0 && relativeX <= imgRect.width && relativeY >= 0 && relativeY <= imgRect.height) {
                console.log('zwart');
                $textDisplay.textContent = 'zwart';
            }
        }

        if (frame.classList.contains('frame-s')) {
            if (relativeX >= 165 && relativeX <= 280 && relativeY >= 170 && relativeY <= 400) {
                console.log('verlangen');
                $textDisplay.textContent = 'verlangen';
            }
            else if (relativeX >= 125 && relativeX <= 165 && relativeY >= 170 && relativeY <= 300) {
                console.log('kracht');
                $textDisplay.textContent = 'kracht';
            }
            else if (relativeX >= 145 && relativeX <= 280 && relativeY >= 400 && relativeY <= 650) {
                console.log('mode');
                $textDisplay.textContent = 'mode';
            }
            else if (relativeX >= 0 && relativeX <= imgRect.width && relativeY >= 0 && relativeY <= imgRect.height) {
                console.log('zwart');
                $textDisplay.textContent = 'zwart';
            }
        }

        if (frame.classList.contains('frame-xs')) {
            if (relativeX >= 165 && relativeX <= 280 && relativeY >= 170 && relativeY <= 400) {
                console.log('verlangen');
                $textDisplay.textContent = 'verlangen';
            }
            else if (relativeX >= 125 && relativeX <= 165 && relativeY >= 170 && relativeY <= 300) {
                console.log('kracht');
                $textDisplay.textContent = 'kracht';
            }
            else if (relativeX >= 145 && relativeX <= 280 && relativeY >= 400 && relativeY <= 650) {
                console.log('mode');
                $textDisplay.textContent = 'mode';
            }
            else if (relativeX >= 0 && relativeX <= imgRect.width && relativeY >= 0 && relativeY <= imgRect.height) {
                console.log('zwart');
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
