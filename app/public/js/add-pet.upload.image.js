// author - vn //
var images = [];

// init all buttons
$(document).ready(function () {

    // upload image when camera icon is clicked
    $(document).on('click', '#add-pet-upload', function () {
        $(`input[id='add-pet-upload-image']`).trigger('click');
        document.getElementById('add-pet-upload-image').addEventListener('change', readFile);
    });

    // remove image on click
    $(document).on('click', '.add-pet-remove-img', function () {
        var thisImg = $(this).attr('src');
        $(this).remove();
        // remove this image from the array
        var newimages = images.indexOf(thisImg);

        if (newimages > -1) {
            let temp = images.splice(newimages, 1);
        }
        console.log(`images: ${images}`);

        // check max images allowed
        maxPhotos(images.length);
    });
});

// read uploaded image
function readFile() {
    if (this.files && this.files[0]) {

        var FR = new FileReader();
        FR.addEventListener('load', function (base64Img) {

            // pass base64 image to be uploaded to jumbotron
            displayPhoto(base64Img.target.result);
            images.push(base64Img.target.result);
            console.log(`images: ${images}`);

            // check if max images allowed
            maxPhotos(images.length);

        });
        FR.readAsDataURL(this.files[0]);
    }
};

// display smaller photo icon 
function retakePhoto() {
    $('#add-pet-form-message').empty();
    $('#add-pet-form-message').append('<i id="add-pet-upload" class="fas fa-camera fa-3x" for="add-pet-upload-photo"></i>');
    $('#add-pet-form-message').append('<input type="file" id="add-pet-upload-image" style="display: none;" />');
};

// display photo to top of jumbotron
function displayPhoto(image) {
    $('.add-pet-camera').empty();
    $('#add-pet-jumbotron-top').append(`<div class="col-md-12"><img src="${image}" alt="image" class="add-pet-uploaded-images responsive mb-2 add-pet-remove-img">`);
    retakePhoto();
};

// set max photos to 3
function maxPhotos(max) {
    if (max < 3) {
        $('#add-pet-form-message').empty();
        $('#add-pet-form-message').append('<i id="add-pet-upload" class="fas fa-camera fa-3x" for="add-pet-upload-photo"></i>');
        $('#add-pet-form-message').append('<input type="file" id="add-pet-upload-image" style="display: none;" />');
    } else if (max === 3) {
        $('#add-pet-form-message').empty();
        $('#add-pet-form-message').text('Max photos allowed!');
    }
};