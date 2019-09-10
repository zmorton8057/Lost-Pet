var images = [];

// init all buttons
$(document).ready(function () {

    // upload image when camera icon is clicked
    $(document).on('click', '#upload', function () {
        $(`input[id='upload-image']`).trigger('click');
        document.getElementById('upload-image').addEventListener('change', readFile);
    });
});

// read uploaded image
function readFile() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();

        FR.addEventListener('load', function (base64Img) {

            // pass base64 image to be uploaded to jumbotron
            displayPhoto(base64Img.target.result);


        });

        FR.readAsDataURL(this.files[0]);
    }
};

function retakePhoto(image) {
    $('#form-message').empty();
    $('#form-message').append('<i id="upload" class="fas fa-camera fa-3x" for="upload-photo"></i>');
    $('#form-message').append('<input type="file" id="upload-image" style="display: none;" />');
    maxPhotos(image);

};

function displayPhoto(image) {
    $('.camera').empty();
    $('#jumbotron-top').append(`<img src="${image}" alt="image" class="uploaded-images responsive text-center mb-2">`);
    retakePhoto(image);

};
function maxPhotos(image) {
    images.push(image);
    if (images.length === 3) {
        $('#form-message').empty();
        $('#form-message').text('Max photos allowed!');
    }
}