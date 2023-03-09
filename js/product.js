export class Product {
    #img;
    #name;
    #price;
    #amount;
    #saldo;
    #id;
    #btn;
    #productCard;

    constructor(img, name, price, saldo, id) {
        this.#img = img;
        this.#name = name;
        this.#price = price;
        this.#amount = 0;
        this.#saldo = saldo;
        this.#id = id;
        this.#displayProduct();
    }

    #displayProduct() {
      const container = document.querySelector('main');

       this.#productCard = document.createElement('section');
       this.#productCard.classList.add('product-card');
        container.appendChild(this.#productCard);

        const productImg = document.createElement('img');
        productImg.src = this.#img;
        this.#productCard.appendChild(productImg);

        const productTitle = document.createElement('h3');
        productTitle.innerText = this.#name;
        this.#productCard.appendChild(productTitle);

        const div = document.createElement('div');
        this.#productCard.appendChild(div);

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

    getAmount(){
        return this.#amount; 
    }

    getInfo(){
        return{
            img: this.#img,
            name: this.#name,
            price: this.#price,
            amount: this.#amount,
            saldo: this.#saldo,
            id: this.#id
        };
    }

    getBtn() {
        return this.#btn;
    }

    getProductCard() {
        return this.#productCard;
    }

    setAmount(nbr){
        this.#amount = nbr;
    }
}