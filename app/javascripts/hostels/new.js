$(function() {

    var checkin = $('#checkin-date');
    var checkout = $('#checkout-date');

    checkin.datepicker();
    checkout.datepicker();

    checkin.change(function() {
        checkout.datepicker('option', 'minDate', $(this).val());
    });

    checkout.change(function() {
        checkin.datepicker('option', 'maxDate', $(this).val());
    });
});