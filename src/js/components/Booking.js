import { select, templates } from "../settings.js";
import AmountWidget from "./AmountWidget.js";


class Booking{
    constructor(app, bookingContainer){
        const thisBooking = this
        thisBooking.app = app;
        thisBooking.bookingContainer = bookingContainer;

        thisBooking.render(bookingContainer);
        thisBooking.initWidgets();
    }

    render(){
        const thisBooking = this;

        //generate HTML from templates.bookingWidget
        const generatedHTML = templates.bookingWidget();

        // create empty object dom
        thisBooking.dom = {};

        //change content to generatedHTML
        thisBooking.dom.wrapper = thisBooking.bookingContainer;
        console.log(thisBooking.dom.wrapper);

        thisBooking.dom.wrapper.innerHTML = generatedHTML;

        thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
        thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);

    }

    initWidgets(){
        const thisBooking = this;

        thisBooking.amountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
        thisBooking.amountWidget = new AmountWidget(thisBooking.dom.hoursAmount);

        thisBooking.dom.peopleAmount.addEventListener('updated', function(){

        });

        thisBooking.dom.hoursAmount.addEventListener('updated', function(){

        });
    }

}

export default Booking;