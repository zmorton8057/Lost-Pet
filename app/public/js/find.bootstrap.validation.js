

// var images = [img1, img2, img3]


function getForm() {

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

    formData.push(petType, breed, color, size, coatType, sex, finderName, finderEmail, finderContact)
    console.log('formData: ' + formData);

}

function validateForm(userProfile, userProfileJson) {

    // checks if answer to question is filled in correctly
    if (userProfile.name.length == 0 || userProfile.image.length == 0 || userProfile.answer1 == 0 || userProfile.answer2 == 0 || userProfile.answer3 == 0 || userProfile.answer4 == 0 || userProfile.answer5 == 0 || userProfile.answer6 == 0 || userProfile.answer7 == 0 || userProfile.answer8 == 0 || userProfile.answer9 == 0 || userProfile.answer10 == 0) {
        return;
    } else {
        postAPI(userProfileJson);
        submitForm(userProfile);
    };
};

function submitForm(userProfile) {

    // // POST request
    // $.ajax(`/db/friends`, {
    //     type: 'POST',
    //     data: userProfile
    // }).catch((err) => {
    //     if (err) throw err;
    // });
};

// post api as json
function postAPI(userProfileJson) {

    // POST request
    $.ajax(`/api/friends`, {
        type: 'POST',
        data: userProfileJson
    }).done((match) => {
        $('#match-title').empty();
        $('#match-name').empty();
        $('#match-image').empty();
        $('#match-title').text('Match!');
        $('#match-name').append(`<h3>${match.name}</h3>`);
        $('#match-image').attr('src', match.image);
        var img = $('<img id="dynamic-image" class="text-center" style="width:100%;max-width:300px">'); //Equivalent: $(document.createElement('img'))
        img.attr('src', match.image);
        img.appendTo('#match-image');
    }).catch((err) => {
        if (err) throw err;
    });
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
                    event.preventDefault()
                    getForm();
                }
            }, false);
        });
    }, false);
})();

