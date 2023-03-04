/**TODO
 * Get all products from firebase
 * Display all products*/

const url = 'https://js2-mp3-default-rtdb.europe-west1.firebasedatabase.app/products.json';

getProducts(url)
    .then(displayProducts);

async function getProducts(url) {
    const response = await fetch(url);
    const products = await response.json();
    console.log(products);
    return products;
}

function displayProducts(products) {
    products.forEach(product => {
        console.log(product);
        const container = document.querySelector('main');

        const productCard = document.createElement('section');
        productCard.classList.add('product-card');
        container.appendChild(productCard);

        const productImg = document.createElement('img');
        productImg.src = product.img;
        productCard.appendChild(productImg);

        const productTitle = document.createElement('h3');
        productTitle.innerText = product.name;
        productCard.appendChild(productTitle);

        const div = document.createElement('div');
        productCard.appendChild(div);

        const priceTag = document.createElement('h4');
        priceTag.innerText = product.price + ' kr';
        div.appendChild(priceTag);

        if(product.saldo != 0){
            const btn = document.createElement('button');
            btn.innerText = 'Add to cart';
            div.appendChild(btn);
        }
        else{
            const p = document.createElement('p');
            p.innerText = 'Out of stock';
            div.appendChild(p);
        }
    });
}
