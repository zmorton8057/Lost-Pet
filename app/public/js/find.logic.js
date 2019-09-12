// initialize form buttons
$(document).ready(function () {

    // show / hide form details
    $("#form-show").click(function (event) {
        event.preventDefault();
        $("#toggle-form").toggle();
    });

    // show / hide location form
    $("#toggle-location").click(function (event) {
        event.preventDefault();
        $("#toggle-location-form").toggle();
    });
});