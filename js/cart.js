import anime from "../node_modules/animejs/lib/anime.es.js";
//Loop through all cookies to get info of all products added to cart



//ANIMATION ON BUTTON
const buyAnimation = {
    targets: '.buy-btn div',
    width: '100%',
    easing: 'easeInOutQuad',
    direction: 'alternate',
    backgroundColor: '#7fff7f',
};

document.querySelector('.buy-btn button').addEventListener('click', () => {
    anime(buyAnimation);
});

