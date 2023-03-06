import { Product } from "./Product.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";
const url = 'https://js2-mp3-default-rtdb.europe-west1.firebasedatabase.app/products.json';

getProducts(url)
    .then(createProductObjects);

//Fetch products from firebase
async function getProducts(url) {
    const response = await fetch(url);
    const products = await response.json();
    console.log(products);
    return products;
}

//Create Product objects with info from firebase
/**TODO
 * Fix cookies
 */
function createProductObjects(products){
    products.forEach(product =>{
        const productObj = new Product(product.img, product.name, product.price, product.saldo);
        console.log(productObj);

        const btn = productObj.getBtn();
        if(product.saldo !== 0){
            btn.addEventListener('click', () =>{
                const span = document.querySelector('.shopping-cart-container span');
                span.innerText++;

                Cookies.set('product', `${productObj.getImg()};${productObj.getName()};${productObj.getPrice()}`,{expires: 1});
                console.log(Cookies.get());
                console.log(products.indexOf(product));
            })
        }
        else{
            btn.innerText = 'Out of stock';
        }
    });
}

//Check for cookies
if(document.cookie !== ''){
    console.log('Cookies', document.cookie);
}