import anime from "../node_modules/animejs/lib/anime.es.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";

const productsContainerParents = document.querySelector(".products-container");
const cancelBtn = document.querySelector(".cancel-btn");
const ThanksMessage = document.querySelector(".success-message-div");

shoppingListFromCookies();

function shoppingListFromCookies() {
    const allCookies = Cookies.get();
    let totalPrice = 0;
    for (const cookie in allCookies) {
        const product = JSON.parse(allCookies[cookie]);
        console.log(product);
        createElements(product);

        totalPrice += product.price * product.amount;
    }
    const basketTotal = document.querySelector(".basketTotal");
    basketTotal.innerText = totalPrice + ' ' + "kr";
}

function createElements(product) {
    const productsCartContainer = document.querySelector(".products");
    const productsCartDiv = document.createElement("div");
    productsCartContainer.append(productsCartDiv);
    productsCartDiv.classList.add("productsCartDiv");

    const imgAndNameDiv = document.createElement("div");
    productsCartDiv.append(imgAndNameDiv);
    imgAndNameDiv.classList.add("imgAndNameDiv");
    const productImg = document.createElement("img");
    imgAndNameDiv.append(productImg);
    productImg.src = product.img;
    const productName = document.createElement("h5");
    imgAndNameDiv.append(productName);
    productName.innerText = product.name;
    const productPrice = document.createElement("p");
    productsCartDiv.append(productPrice);
    productPrice.innerText = product.price + ' ' + "kr";
    const productTotal = document.createElement("p");
    productsCartDiv.append(productTotal);
    productTotal.innerText = product.amount;

    const productTotalSum = document.createElement("p");
    productsCartDiv.append(productTotalSum);
    productTotalSum.innerText = `${product.price * product.amount}` + ' ' + "kr";

    showAndHideElements();
    
    document.querySelector(".checkout-btn").addEventListener("click", () => {

        // display animation and thanks message
        loadingAnime();
        // ThanksMessage.style.display = 'block';
    
        //UpdateFirebase saldo
        const allCookies = Cookies.get();
        for (const cookie in allCookies) {
            const product = JSON.parse(allCookies[cookie]);
            const updatedSaldo = product.saldo - product.amount;
            
            const productSaldo = {
                saldo: updatedSaldo
            };

           updateSaldo(product.id, productSaldo);
        }
        clearCookies();
    });
    
    clearShoppingCart();
}
//show and hide elements
function showAndHideElements() {
    cancelBtn.style.display = "block";

    productsContainerParents.style.display = "block";

    document.querySelector(".cart-intro-div").style.display = "none";
}

//loading animation
function loadingAnime() {
        const animation = document.querySelector("#animation");
        const box = document.querySelector("#box");
        box.style.display = "block";
        productsContainerParents.style = "none";
        cancelBtn.style.display = "none";
        //   console.log(animation,box)

        
            anime({
                targets: "#box #animation",
                duration: 3000,
                easing: "linear",
                opacity: 0,
                translateY: 30,
                endDelay: 500,
                rotate: "360deg",
                loop: true,
                direction: "alternate",
                delay: anime.stagger(300),
            })

            setTimeout(() => {
                box.style.display = 'none';
        ThanksMessage.style.display = 'block';
            }, 3000);

         
}

//clearShoppingCart
function clearShoppingCart() {
    cancelBtn.addEventListener("click", (event) => {
        box.style.display = "none";
        productsContainerParents.style = "none";

        //Deletes all cookies
        clearCookies();
    });;
}

//En knapp för att genomföra köpet (inte på riktigt)  ????? ändra storage
//En knapp för att tömma kundvagnen ?????    ändra storage
function clearCookies(){
    const allCookies = Cookies.get();
    for (const cookie in allCookies) {
        Cookies.remove(cookie);
    }
}

//Patch saldo in firebase
async function updateSaldo(id, amount) {
    console.log('INDEX', id);
    const url = `https://js2-mp3-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`;
    const init = {
        method: 'PATCH',
        body: JSON.stringify(amount),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    const response = await fetch(url, init);
    const data = await response.json();
    console.log(data);
}