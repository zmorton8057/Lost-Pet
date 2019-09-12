var formData = [];

function getForm() {
    // empty form array on submission
    formData = [];

    // get pet info
    var petType = $('#pet-type').val();
    var breed = $('#breed').val().trim();
    var color = $('#color').val();
    var size = $('#size').val();
    var coatType = $('#coat-type').val();
    var sex = $('#sex').val();

    // get finder info
    var finderName = $('#finder-name').val().trim();
    var finderEmail = $('#finder-email').val().trim();
    var finderContact = $('#finder-contact').val().trim();

    var formDataValidate =
    {
        petType,
        breed,
        color,
        size,
        coatType
    };

    // building validation if form has all data; wip
    if (validateForm(formDataValidate)) {
        console.log('form has all the data');
    } else {
        console.log('form does not have all the data')
    }

    formData.push(petType, breed, color, size, coatType, sex, finderName, finderEmail, finderContact)

}

function validateForm(formDataValidate) {

    console.log(formDataValidate);
    for (var key in formDataValidate) {
        if (formDataValidate[key] !== null && formDataValidate[key] != "")
            return false;
    }
    return true;
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault()

                if (!form.checkValidity()) {
                    event.stopPropagation();
                }
                form.classList.add('was-validated');

                // if name and image fields are valid, get form details
                if (form.checkValidity()) {
                    event.preventDefault();
                    getForm();
                }
            }, false);
        });
    }, false);
})();

