import { gsap } from "gsap";

const imagePaths = [
    'src/assets/img/rotateIMG1-50.avif',
    'src/assets/img/rotateIMG1-105.avif',
    'src/assets/img/rotateIMG1-145.avif',
    'src/assets/img/rotateIMG2-50.avif',
    'src/assets/img/rotateIMG2-105.avif',
    'src/assets/img/rotateIMG2-145.avif',
    'src/assets/img/rotateIMG3-50.avif',
    'src/assets/img/rotateIMG3-105.avif',
    'src/assets/img/rotateIMG3-145.avif',
    'src/assets/img/rotateIMG4-50.avif',
    'src/assets/img/rotateIMG4-105.avif',
    'src/assets/img/rotateIMG4-145.avif',
    'src/assets/img/rotateIMG5-50.avif',
    'src/assets/img/rotateIMG5-105.avif',
    'src/assets/img/rotateIMG5-145.avif',
    'src/assets/img/rotateIMG6-50.avif',
    'src/assets/img/rotateIMG6-105.avif',
    'src/assets/img/rotateIMG6-145.avif',
    'src/assets/img/rotateIMG7-50.avif',
    'src/assets/img/rotateIMG7-105.avif',
    'src/assets/img/rotateIMG7-145.avif',
    'src/assets/img/rotateIMG8-50.avif',
    'src/assets/img/rotateIMG8-105.avif',
    'src/assets/img/rotateIMG8-145.avif',
    'src/assets/img/rotateIMG9-50.avif',
    'src/assets/img/rotateIMG9-105.avif',
    'src/assets/img/rotateIMG9-145.avif',
    'src/assets/img/rotateIMG10-50.avif',
    'src/assets/img/rotateIMG10-105.avif',
    'src/assets/img/rotateIMG10-145.avif',
    'src/assets/img/rotateIMG11-50.avif',
    'src/assets/img/rotateIMG11-105.avif',
    'src/assets/img/rotateIMG11-145.avif',
    'src/assets/img/rotateIMG12-50.avif',
    'src/assets/img/rotateIMG12-105.avif',
    'src/assets/img/rotateIMG12-145.avif'
];

let numImagesLoaded = 0;
let $preloaderPercentage;
let $preloaderVisual;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const loadImageAsync = (path) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = path;
        image.onload = () => resolve(image);
        image.onerror = () => {
            console.warn(`Failed to load image: ${path}`);
            resolve(null);
        };
    });
};

const updateProgress = () => {
    const relativeProgress = numImagesLoaded / imagePaths.length;
    const progressPercentage = Math.round(relativeProgress * 100);
    $preloaderPercentage.textContent = `${progressPercentage}%`;
    $preloaderVisual.style.transform = `scale3d(1, ${relativeProgress}, 1)`;
};

const complete = async (onComplete) => {
    await delay(350);
    document.querySelector("body").classList.remove("overflow-y-hidden");
    gsap.to(".preloader", {
        duration: 0.5,
        autoAlpha: 0,
        onComplete: () => {
            document.documentElement.classList.remove("is-loading");
            if (onComplete) onComplete();
        },
    });
};

/**
 * Inject preloader HTML en start loading
 * @param {Function} onComplete - Callback wanneer preloading klaar is
 */
export const init = async (onComplete) => {
    const preloaderHTML = `
        <div class="preloader">
            <div class="preloader__text">
                <svg class="preloader__football" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#FAFAFA" stroke-width="1" fill="none"/>
                    <path d="M12 2 L14 7 L19 7 L15 11 L17 16 L12 13 L7 16 L9 11 L5 7 L10 7 Z" fill="#FAFAFA"/>
                    <path d="M14 7 L15 11 M10 7 L9 11 M15 11 L17 16 M9 11 L7 16 M17 16 L12 13 M7 16 L12 13" stroke="#131313" stroke-width="0.5"/>
                </svg>
                Loading
                <span class="preloader__percentage">0%</span>
            </div>
            <div class="preloader__visual"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);

    $preloaderPercentage = document.querySelector(".preloader__percentage");
    $preloaderVisual = document.querySelector(".preloader__visual");

    $preloaderVisual.classList.add("preloader__visual--has-transition");
    updateProgress();
    document.documentElement.classList.add("is-loading");
    document.querySelector("body").classList.add("overflow-y-hidden");

    await Promise.all(
        imagePaths.map(async (path) => {
            const image = await loadImageAsync(path);
            numImagesLoaded++;
            updateProgress();
            return image;
        })
    );

    complete(onComplete);
};