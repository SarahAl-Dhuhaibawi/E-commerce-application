import { Product } from "./product.js";

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
function createProductObjects(products){
    products.forEach(product =>{
        const productObj = new Product(product.img, product.name, product.price, product.saldo);
        console.log(productObj);
    });
}