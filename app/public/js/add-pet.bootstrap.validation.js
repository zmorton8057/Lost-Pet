function getForm() {
    // empty form array on submission

    // get pet info
    // images array is inside add-pet.upload.image.js
    //convert image to s3
    var addPetImages = ['https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all&w=782', 'https://www.rachaelrayshow.com/sites/default/files/styles/video_1920x1080/public/images/2019-06/dog.jpg?itok=mFEHYdZh'];
    // var addPetImages = images;
    var pet_type = $('#add-pet-pet-type').val();
    var pet_breed = $('#add-pet-breed').val().trim();
    var color = $('#add-pet-color').val();
    var pet_size = $('#add-pet-size').val();
    var coat_type = $('#add-pet-coat-type').val();
    var sex = $('#add-pet-sex').val();
    var pet_zip = $('#add-pet-inputZip').val().trim();
    var pet_name = $('#add-pet-name').val().trim();
    var pet_age = $('#add-pet-age').val().trim();

    var addPetData = 
    {
        addPetImages,
        pet_type,
        pet_breed,
        color,
        pet_size,
        coat_type,
        sex,
        pet_zip, 
        pet_age,
        pet_name
    }

    addPet(addPetData);
}

function addPet(addPetData) {
        // POST route to api.routes
        var route = '/api/addPet'
        $.ajax(route, {
            type: 'POST',
            data: addPetData
        })
}


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

