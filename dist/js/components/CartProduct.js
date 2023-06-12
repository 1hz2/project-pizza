import {select} from '../settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct {
    constructor(menuProduct, element) {
      const thisCartProduct = this;
      thisCartProduct.id = menuProduct.id;
      thisCartProduct.name = menuProduct.name;
      thisCartProduct.amount = menuProduct.amount;
      thisCartProduct.price = menuProduct.price;
      thisCartProduct.params = menuProduct.params;
      thisCartProduct.priceSingle = parseFloat(menuProduct.price);
  
      thisCartProduct.element = element; 
  
      thisCartProduct.getElements();
      thisCartProduct.initAmountWidget();
      thisCartProduct.initActions();
    }
  
    getElements() {
      const thisCartProduct = this;
  
      thisCartProduct.dom = {
        wrapper: thisCartProduct.element,
        amountWidget: thisCartProduct.element.querySelector(select.cartProduct.amountWidget),
        price: thisCartProduct.element.querySelector(select.cartProduct.price),
        edit: thisCartProduct.element.querySelector(select.cartProduct.edit),
        remove: thisCartProduct.element.querySelector(select.cartProduct.remove),
      };
      thisCartProduct.amountWidgetElem = thisCartProduct.element.querySelector(
        select.cartProduct.amountWidget
      );
    }
  
    initAmountWidget() {
      const thisCartProduct = this;
  
      thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.amountWidgetElem);
  
      thisCartProduct.amountWidgetElem.addEventListener('updated', function () {
        thisCartProduct.amount = thisCartProduct.amountWidget.value;
        thisCartProduct.price = thisCartProduct.amount * thisCartProduct.priceSingle;
        thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
      });
    }
  
    remove() {
      const thisCartProduct = this;
  
      const event = new CustomEvent('remove', {
        bubbles: true,
        detail: {
          cartProduct: thisCartProduct,
        },
      });
  
      thisCartProduct.dom.remove.dispatchEvent(event);
    }
  
    initActions() {
      const thisCartProduct = this;
  
      thisCartProduct.dom.edit.addEventListener('click', function (event) {
        event.preventDefault();
      });
  
      thisCartProduct.dom.remove.addEventListener('click', function (event) {
        event.preventDefault();
  
        thisCartProduct.remove();
      });
    }

    getData(){
      const thisCartProduct = this;

      const dataSummary = {
        id: thisCartProduct.id,
        name: thisCartProduct.name,
        amount: thisCartProduct.amountWidget.value,
        priceSingle: thisCartProduct.priceSingle,
        price: thisCartProduct.priceSingle *= thisCartProduct.amountWidget.value,
      };

      return dataSummary;
    }
  }

  export default CartProduct;