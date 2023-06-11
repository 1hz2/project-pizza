import {settings, select, templates, classNames} from './settings.js';
import utils from './utils.js';
import CartProduct from './CartProduct.js';

class Cart {
    constructor(element) {
      const thisCart = this;
  
      thisCart.products = [];
      thisCart.getElements(element);
      thisCart.initActions();
    }
  
    getElements(element) {
      const thisCart = this;
      thisCart.dom = {
        deliveryFee: element.querySelector(select.cart.deliveryFee),
        subtotalPrice: element.querySelector(select.cart.subtotalPrice),
        totalPrice: element.querySelector(select.cart.totalPrice),
        totalNumber: element.querySelector(select.cart.totalNumber),
        form: element.querySelector(select.cart.form),
        phone: element.querySelector(select.cart.phone),
        address: element.querySelector(select.cart.address),
      };
      thisCart.dom.wrapper = element;
      thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
      thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
    }
  
    initActions() {
      const thisCart = this;
  
      console.log('Init actions for CartProduct');
  
      thisCart.dom.toggleTrigger.addEventListener('click', function (event) {
        event.preventDefault();
        thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
      });
  
      thisCart.dom.productList.addEventListener('updated', function () {
        thisCart.update();
      });
  
      thisCart.dom.productList.addEventListener('remove', function (event) {
        const cartProduct = event.detail.cartProduct;
  
        thisCart.remove(cartProduct);
      });

      thisCart.dom.form = document.querySelector(select.cart.form);

      thisCart.dom.form.addEventListener('submit', function(event){
        event.preventDefault();
        thisCart.sendOrder();
      });
    }

    sendOrder(){
      const thisCart = this;

      const url = 'http://localhost:3131/orders';

      const payload = {
        address: thisCart.dom.address.value,
        phone: thisCart.dom.phone.value,
        totalPrice: thisCart.totalPrice,
        subtotalPrice: thisCart.totalPrice - settings.cart.defaultDeliveryFee,
        totalNumber: thisCart.dom.totalNumber.value,
        deliveryFee: settings.cart.defaultDeliveryFee,
        products: [],
      }

      for(let prod of thisCart.products) {
        payload.products.push(prod.getData());
      }
      
      console.log('payload', payload);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };
      
      fetch(url, options);
    }
  
    add(menuProduct) {
      const thisCart = this;
  
      /* generate HTML based on template */
      const generatedHTML = templates.cartProduct(menuProduct);
  
      /* create element using utils.createElementFromHTML */
      thisCart.element = utils.createDOMFromHTML(generatedHTML);
  
      /* find menu container */
      const cartContainer = document.querySelector(select.containerOf.cart);
  
      /* add element to menu */
      cartContainer.appendChild(thisCart.element);
  
      const cartProduct = new CartProduct(menuProduct, thisCart.element); 
  
      thisCart.products.push(cartProduct);
  
      cartProduct.element.addEventListener('remove', function () {
        thisCart.remove(cartProduct);
      });
  
      thisCart.element.addEventListener('updated', function () {
        thisCart.update();
      });
    }
  
    update() {
      const thisCart = this;
      const deliveryFee = settings.cart.defaultDeliveryFee;
      let totalNumber = 0;
      let subtotalPrice = 0;
  
      for (let product of thisCart.products) {
        totalNumber += product.amount;
        subtotalPrice += product.price;
      }
  
      if (totalNumber > 0) {
        thisCart.totalPrice = subtotalPrice + deliveryFee;
      } else {
        thisCart.totalPrice = subtotalPrice;
      }
  
      thisCart.dom.totalNumber.innerHTML = totalNumber;
      thisCart.dom.subtotalPrice.innerHTML = subtotalPrice;
      thisCart.dom.totalPrice.innerHTML = thisCart.totalPrice;
      thisCart.dom.deliveryFee.innerHTML = deliveryFee;
  
      console.log('cart settings', totalNumber, subtotalPrice, thisCart.totalPrice);
    }
  
    remove(cartProduct) {
      const thisCart = this;
  
      console.log('Cart remove() called!');
  
      cartProduct.element.remove();
  
      const index = thisCart.products.indexOf(cartProduct);
      if (index !== -1) {
        thisCart.products.splice(index, 1);
      }
  
      thisCart.update();
    }
  }

  export default Cart;