// author - vn //
var images = [];

// hide form details on load
$("#toggle-form").hide();
$('#toggle-location-form').hide();

// init all buttons
$(document).ready(function () {

    // upload image when camera icon is clicked
    $(document).on('click', '#upload', function () {
        $(`input[id='upload-image']`).trigger('click');
        document.getElementById('upload-image').addEventListener('change', readFile);
    });

    // remove image on click
    $(document).on('click', '.remove-img', function () {
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
    $('#form-message').empty();
    $('#form-message').append('<i id="upload" class="fas fa-camera fa-3x" for="upload-photo"></i>');
    $('#form-message').append('<input type="file" id="upload-image" style="display: none;" />');
};

// display photo to top of jumbotron
function displayPhoto(image) {
    $('.camera').empty();
    $('#jumbotron-top').append(`<div class="col-md-12"><img src="${image}" alt="image" class="uploaded-images responsive mb-2 remove-img">`);
    retakePhoto();
};

// set max photos to 3
function maxPhotos(max) {
    if (max < 3) {
        $('#form-message').empty();
        $('#form-message').append('<i id="upload" class="fas fa-camera fa-3x" for="upload-photo"></i>');
        $('#form-message').append('<input type="file" id="upload-image" style="display: none;" />');
    } else if (max === 3) {
        $('#form-message').empty();
        $('#form-message').text('Max photos allowed!');
    }
};