const maxoutfits = 4;
var outfitpos1 = 0;
var outfitpos2 = 1;

const init = () => {
    $outfit1 = document.querySelector('.outfit-1');
    $outfit2 = document.querySelector('.outfit-2');

    $outfit1.addEventListener('click', (event) => {
        console.log("outfit 1 clicked");
        outfitpos2 = (outfitpos2 + 1) % maxoutfits;
        if (outfitpos1 == outfitpos2) {
            outfitpos2 = (outfitpos2 + 1) % maxoutfits;
        }
        $outfit2.style.backgroundPosition = `-${outfitpos2 * 500}px 0`;
    })

    $outfit2.addEventListener('click', (event) => {
        console.log("outfit 2 clicked");
        outfitpos1 = (outfitpos1 + 1) % maxoutfits;
        if (outfitpos1 == outfitpos2) {
            outfitpos1 = (outfitpos1 + 1) % maxoutfits;
        }
        $outfit1.style.backgroundPosition = `-${outfitpos1 * 500}px 0`;
    })

}
init();