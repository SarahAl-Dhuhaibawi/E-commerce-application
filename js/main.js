import { Product } from "./Product.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";
const url = 'https://js2-mp3-default-rtdb.europe-west1.firebasedatabase.app/products.json';


getAllCookies();

getProducts(url)
    .then(createProductObjects);

//Fetch products from firebase
async function getProducts(url) {
    const response = await fetch(url);
    const products = await response.json();
    return products;
}

//Create Product objects with info from firebase
//Creates a cookie with the information from the object
function createProductObjects(products) {
    products.forEach(product => {
        console.log(product)
        const productObj = new Product(product.img, product.name, product.price, product.saldo);

        const btn = productObj.getBtn();
        let amount = productObj.getAmount();

        const cookieValue = Cookies.get(productObj.getName());
        if (cookieValue) {
            const storedProduct = JSON.parse(cookieValue);
            amount = storedProduct.amount;
            productObj.setAmount(amount);
        }

        // Update amount if saldo is greater than stored amount
        if (product.saldo != 0) {
            btn.addEventListener("click", () => {
                if (amount == product.saldo) {
                    console.log('Amount:', amount, 'Saldo:', product.saldo);
                    console.log("There are no more products");
                    //Show message to user
                } else {
                    amount++;
                    console.log("amount:", amount);
                    productObj.setAmount(amount);
                    console.warn("PRODUCT-OBJECT", productObj);

                    //Expires in 15 minutes
                    const expirationTime = new Date(new Date().getTime() + 15 * 60 * 1000);
                    Cookies.set(productObj.getName(), JSON.stringify(productObj.getInfo()), { expires: expirationTime });
                    getAllCookies();
                }
            });
        }
    });
}

getAllCookies()
function getAllCookies() {
    if (document.cookie !== '') {
        const allCookies = Cookies.get();
        console.log('All cookies:', allCookies);
        let nbrOfItems = 0;
        for (const cookie in allCookies) {
            const cookieObj = JSON.parse(allCookies[cookie]);
            console.log('Cookie object', cookieObj);
            console.log(cookieObj.amount);
            nbrOfItems += cookieObj.amount;
        }
        const span = document.querySelector('.shopping-cart-container span');
        span.innerText = nbrOfItems;
    }
}


//deleteAllCookies();
function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}