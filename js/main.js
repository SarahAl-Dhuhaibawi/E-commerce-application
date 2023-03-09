import { Product } from "./Product.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";
const url = 'https://js2-mp3-default-rtdb.europe-west1.firebasedatabase.app/products.json';


 setNumberOfItemsInCart();

getProducts(url)
    .then(createProductObjects);

//Fetch products from firebase
async function getProducts(url) {
    const response = await fetch(url);
    const products = await response.json();
    console.log(products)
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

        const productCard = productObj.getProductCard();

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
                    setNumberOfItemsInCart();
                }
            });
        }
    });
}


function getAllCookies() {
    const allCookies = Cookies.get();
    return allCookies;
}

function setNumberOfItemsInCart() {
    const allCookies = getAllCookies();
    let nbrOfItems = 0;
    for (const cookie in allCookies) {
         const cookieObj = JSON.parse(allCookies[cookie]);
        console.log(cookie)
        console.log('Cookie object', cookieObj);
        console.log(cookieObj.amount);
        nbrOfItems += cookieObj.amount;
    }
    const span = document.querySelector('.shopping-cart-container span');
    span.innerText = nbrOfItems;
}