const maxoutfits = 4;
var outfitpos1 = 0;
var outfitpos2 = 1;
var clicks = 0;
var lastClicked = null;
var $outfit1;
var $outfit2;
var $of;

const showFinalResult = () => {
    const $container = document.querySelector('.outfits-container');
    const $final = document.querySelector('.final-character');
    let $chosen;

    $of.classList.add('visually-hidden');

    if (lastClicked === 'outfit1') {
        $outfit2.classList.add('hidden');
        $outfit1.classList.add('final-choice');
        $chosen = $outfit1;
        $final.style.backgroundPosition = `-${outfitpos1 * 500 + 250}px 0`;
    } else {
        $outfit1.classList.add('hidden');
        $outfit2.classList.add('final-choice');
        $chosen = $outfit2;
        $final.style.backgroundPosition = `-${outfitpos2 * 500 + 250}px 0`;
    }

    $final.classList.add('visible');
    $container.classList.add('final-state');

    setTimeout(() => {
        $chosen.classList.add('fade-out');
    }, 500);
}

const init = () => {
    $outfit1 = document.querySelector('.outfit-1');
    $outfit2 = document.querySelector('.outfit-2');
    $of = document.querySelector('.of');

    $outfit1.addEventListener('click', (event) => {
        if (clicks >= 3) return;

        console.log("outfit 1 clicked");
        clicks += 1;
        lastClicked = 'outfit1';

        outfitpos2 = (outfitpos2 + 1) % maxoutfits;
        if (outfitpos1 == outfitpos2) {
            outfitpos2 = (outfitpos2 + 1) % maxoutfits;
        }
        $outfit2.style.backgroundPosition = `-${outfitpos2 * 500}px 0`;

        if (clicks === 3) {
            showFinalResult();
        }
    })

    $outfit2.addEventListener('click', (event) => {
        if (clicks >= 3) return;

        console.log("outfit 2 clicked");
        clicks += 1;
        lastClicked = 'outfit2';

        outfitpos1 = (outfitpos1 + 1) % maxoutfits;
        if (outfitpos1 == outfitpos2) {
            outfitpos1 = (outfitpos1 + 1) % maxoutfits;
        }
        $outfit1.style.backgroundPosition = `-${outfitpos1 * 500}px 0`;

        if (clicks === 3) {
            showFinalResult();
        }
    })
}
init();