export class Product {
    #img;
    #name;
    #price;
    #saldo;

    #btn;

    constructor(img, name, price, saldo) {
        this.#img = img;
        this.#name = name;
        this.#price = price;
        this.#saldo = saldo;
        this.#displayProduct();
    }

    #displayProduct() {
        const container = document.querySelector('main');

        const productCard = document.createElement('section');
        productCard.classList.add('product-card');
        container.appendChild(productCard);

        const productImg = document.createElement('img');
        productImg.src = this.#img;
        productCard.appendChild(productImg);

        const productTitle = document.createElement('h3');
        productTitle.innerText = this.#name;
        productCard.appendChild(productTitle);

        const div = document.createElement('div');
        productCard.appendChild(div);

        const priceTag = document.createElement('h4');
        priceTag.innerText = this.#price + ' kr';
        div.appendChild(priceTag);

        this.#btn = document.createElement('button');
        this.#btn.innerText = 'Add to cart';
        div.appendChild(this.#btn);
    }

    getImg() {
        return this.#img;
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        return this.#price;
    }

    getInfo(){
        return{
            img: this.#img,
            name: this.#name,
            price: this.#price
        };
    }

    getBtn() {
        return this.#btn;
    }
}