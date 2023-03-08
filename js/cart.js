import anime from "../node_modules/animejs/lib/anime.es.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";
export let buyingList = [];
console.log(buyingList);


productsFromCookies();

function productsFromCookies() {
    const allCookies = Cookies.get();
    for (const cookie in allCookies) {
       console.log(JSON.parse(allCookies[cookie]));
    }
}




// document.querySelector('button').addEventListener('click', event =>{
//     event.preventDefault();

// anime( {
//     targets: "#box #animation",
//     duration: 2000,
//     easing: "linear",
//     opacity: 0,
//     translateY: 30,
//     endDelay: 500,
//     rotate: "360deg",
//     loop: true,
//     direction: "alternate",
//     delay: anime.stagger(300),
//   })
// })









