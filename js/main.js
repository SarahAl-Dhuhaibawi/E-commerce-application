import { Product } from "./Product.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";
const url = 'https://js2-mp3-default-rtdb.europe-west1.firebasedatabase.app/products.json';

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
        const productObj = new Product(product.img, product.name, product.price, product.saldo);

        const btn = productObj.getBtn();
        let amount = productObj.getAmount();

        /**TODO
         * FIX amount!
         * - compare saldo from firebase to the amount of the productObject
         */
        if (amount !== product.saldo) {
            btn.addEventListener('click', () => {
                if(amount !== productObj.getSaldo()){
                    console.log('amount:',amount);
                    productObj.setAmount(amount++);
                    console.warn('PRODUCT-OBJECT', productObj);
    
                    Cookies.set(productObj.getName(), JSON.stringify(productObj.getInfo()), { expires: 1 });
                }
            })
        }
        else {
            btn.innerText = 'Out of stock';
        }
    });
}

//Check for cookies and loop through them
if (document.cookie !== '') {
    const allCookies = Cookies.get();
    console.log('All cookies:', allCookies);

    for (const cookie in allCookies) {
        console.log(JSON.parse(allCookies[cookie]));
    }
}