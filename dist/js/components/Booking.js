import { select, templates } from "../settings.js";
import AmountWidget from "./AmountWidget.js";
import DatePicker from "./DatePicker.js";
import HourPicker from "./HourPicker.js";


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

        thisBooking.dom.wrapper.innerHTML = generatedHTML;

        thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
        thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
        thisBooking.dom.datePicker = document.querySelector(select.widgets.datePicker.wrapper);
        thisBooking.dom.hourPicker = document.querySelector(select.widgets.hourPicker.wrapper);

    }

    initWidgets(){
        const thisBooking = this;

        thisBooking.amountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
        thisBooking.amountWidget = new AmountWidget(thisBooking.dom.hoursAmount);
        thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
        thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
        //console.log(thisBooking.hourPicker);

        thisBooking.dom.peopleAmount.addEventListener('updated', function(){

        });

        thisBooking.dom.hoursAmount.addEventListener('updated', function(){

        });
    }

}

export default Booking;