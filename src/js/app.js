import {settings, classNames, select} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Home from './components/Home.js';

  const app = {
    initPages: function(){
      const thisApp = this;
      thisApp.pages = document.querySelector(select.containerOf.pages).children;

      thisApp.navLinks = document.querySelectorAll(select.nav.links);

      const idFromHash = window.location.hash.replace('#/', '');

      let pageMatchingHash = thisApp.pages[0].id;

      for(let page of thisApp.pages){
        if(page.id == idFromHash){
          pageMatchingHash = page.id;
          break;

        }
      }

      thisApp.activatePage(pageMatchingHash);

      for(let link of thisApp.navLinks){
        link.addEventListener('click', function(event){
          const clickedElement = this;
          event.preventDefault();

          /* get page id from href attribute */
          const id = clickedElement.getAttribute('href').replace('#', '');

          /* run thisApp.activatePage with that id */
          thisApp.activatePage(id);

          /* change url hash */
          window.location.hash = '#/' + id;
        });
      }
    },

    activatePage: function(pageId){
      const thisApp = this;

      /* add class active to matching pages, remove from non-matching */
      for(let page of thisApp.pages){
        page.classList.toggle(classNames.pages.active, page.id == pageId);
      }

      /* add class active to matching links, remove from non-matching */
      for(let link of thisApp.navLinks){
        link.classList.toggle(
          classNames.nav.active,
          link.getAttribute('href') == '#' + pageId
        );
      }

    },

    initMenu: function(){
      const thisApp = this;

      for(let productData in thisApp.data.products){
        new Product(thisApp, thisApp.data.products[productData].id, thisApp.data.products[productData]);
      }
    },

    initCart: function(){
      const thisApp = this;

      const cartElem = document.querySelector(select.containerOf.cart);
      thisApp.cart = new Cart(cartElem);
    },

    initData: function(){
      const thisApp = this;
      //const url = 'http://localhost:3131/products';
      const url = settings.db.url + '/' + settings.db.product;
      thisApp.data = {};
      fetch(url)
        .then(function(rawResponse){
          return rawResponse.json();
        })
        .then(function(parsedResponse){

          // save parsedResponse as thisApp.data.products
          thisApp.data.products = parsedResponse;

          // execute initMenu method
          thisApp.initMenu();

        });
    },

    initBooking: function(){
      const thisApp = this;

      const bookingContainer = document.querySelector(select.containerOf.booking);
      thisApp.booking = new Booking(thisApp, bookingContainer);
    },

    initHome: function(){
      new Home();
    },

    init: function(){
      const thisApp = this;

      thisApp.initHome();
      thisApp.initPages();
      thisApp.initData();
      thisApp.initMenu();
      thisApp.initCart();
      thisApp.initBooking();
    },
  };
  
  app.init();

