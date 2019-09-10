$num = $('.my-card').length;
$even = $num / 2;
$odd = ($num + 1) / 2;


if ($num % 2 == 0) {
    $('.my-card:nth-child(' + $even + ')').addClass('active');
    $('.my-card:nth-child(' + $even + ')').prev().addClass('prev');
    $('.my-card:nth-child(' + $even + ')').next().addClass('next');
} else {
    $('.my-card:nth-child(' + $odd + ')').addClass('active');
    $('.my-card:nth-child(' + $odd + ')').prev().addClass('prev');
    $('.my-card:nth-child(' + $odd + ')').next().addClass('next');
}

$('.my-card').click(function () {
    $slide = $('.active').width();
    console.log($('.active').position().left);

    if ($(this).hasClass('next')) {
        $('.card-carousel').stop(false, true).animate({ left: '-=' + $slide });
    } else if ($(this).hasClass('prev')) {
        $('.card-carousel').stop(false, true).animate({ left: '+=' + $slide });
    }
    $(this).removeClass('prev next');
    $(this).siblings().removeClass('prev active next');

    $(this).addClass('active');
    $(this).prev().addClass('prev');
    $(this).next().addClass('next');
});

// Keyboard nav
$('html body').keydown(function (e) {
    if (e.keyCode == 37) {// left
        $('.active').prev().trigger('click');
    }
    else if (e.keyCode == 39) {// right
        $('.active').next().trigger('click');
    }
});

// // this function is causing global get of allpets. this need to be wrapped in a function.
// $.get('/allpets')
//     .then(function (response) {

//         var data = response;
//         console.log(response)
//         for (var i = 0; i < data.length; i++) {
//             $(".profile").append('<div class="card"><img class="img-fluid image-profile" src="puppy-dog.jpg" alt="John" style="width:100%"><h1>John Doe</h1><p class="title">CEO & Founder, Example</p><p>Harvard University</p><a href="#"> <i class="fa fa-dribbble"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-linkedin"></i></a><a href="#"> <i class="fa fa-facebook"></i></a><p><button>Contact</button></p></div>');
//         }

//     })
// // $( ".profile" ).append( '<div class="card"><img class="img-fluid image-profile" src="puppy-dog.jpg" alt="John" style="width:100%"><h1>John Doe</h1><p class="title">CEO & Founder, Example</p><p>Harvard University</p><a href="#"> <i class="fa fa-dribbble"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-linkedin"></i></a><a href="#"> <i class="fa fa-facebook"></i></a><p><button>Contact</button></p></div>' );