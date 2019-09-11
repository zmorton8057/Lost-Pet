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


var lostStatus = function(testiftrue){
    if (testiftrue){
        return "MISSING"
        console.log(testiftrue) 
    }    else {
        return "SAFE"
    }
   
}



  
// $.get('/query/petinfo/allpets', function(req, res,){
    


// })
//         .then(function(response){
//             // stringify the object returned from response
//             var data = response;
//             JSON.stringify(data)
//             console.log(data[0])
            

            
//         console.log(lostStatus(data[0].lost_status))
//             ////appending each profile to the dom
//             $( ".profile1" ).append( `<div class="card"><h1>${lostStatus(data[0].lost_status)}</h1><h4><img class="img-fluid image-profile" src="./demo/carousel/puppy-dog.jpg" alt="${data[0].pet_name} the ${data[0].pet_type}" style="width:100%"><h4>${data[0].pet_name} the ${data[0].pet_type}</h4><p class="title">${data[0].sex} - Age: ${data[0].pet_age} yo </p><p class="title">${data[0].pet_breed}</p><p class="title">Location: ${data[0].pet_zip}</p><h5>Coat Description:</h5><p class="title">Color: ${data[0].color}</p><p class="title">Coat Length: ${data[0].coat_length}</p><p class="title">Coat Type: ${data[0].coat_type}</p><p><button class="">Contact</button></p></div>` );

//             $( ".profile2" ).append( `<div class="card"><h1>${lostStatus(data[1].lost_status)}</h1><img class="img-fluid image-profile" src="${data[1].pet_image1}" alt="${data[1].pet_name} the ${data[1].pet_type}" style="width:100%"><h4>${data[1].pet_name} the ${data[1].pet_type}</h4><p class="title">${data[1].sex} - Age: ${data[1].pet_age} yo </p><p class="title">${data[1].pet_breed}</p><p class="title">Location: ${data[1].pet_zip}</p><h5>Coat Description:</h5><p class="title">Color: ${data[1].color}</p><p class="title">Coat Length: ${data[1].coat_length}</p><p class="title">Coat Type: ${data[1].coat_type}</p><p><button class=''>Contact</button></p></div>` );
        
//             $( ".profile3" ).append( `<div class="card"><h1>${lostStatus(data[2].lost_status)}</h1><img class="img-fluid image-profile" src="${data[2].pet_image1}" alt="${data[2].pet_name} the ${data[2].pet_type}" style="width:100%"><h4>${data[2].pet_name} the ${data[2].pet_type}</h4><p class="title">${data[2].sex} - Age: ${data[2].pet_age} yo </p><p class="title">${data[2].pet_breed}</p><p class="title">Location: ${data[2].pet_zip}</p><h5>Coat Description:</h5><p class="title">Color: ${data[2].color}</p><p class="title">Coat Length: ${data[2].coat_length}</p><p class="title">Coat Type: ${data[2].coat_type}</p><p><button class=''>Contact</button></p></div>` );
        
//             $( ".profile4" ).append( `<div class="card"><h1>${lostStatus(data[3].lost_status)}</h1><img class="img-fluid image-profile" src="${data[3].pet_image1}" alt="${data[3].pet_name} the ${data[3].pet_type}" style="width:100%"><h4>${data[3].pet_name} the ${data[3].pet_type}</h4><p class="title">${data[3].sex} - Age: ${data[3].pet_age} yo </p><p class="title">${data[3].pet_breed}</p><p class="title">Location: ${data[3].pet_zip}</p><h5>Coat Description:</h5><p class="title">Color: ${data[3].color}</p><p class="title">Coat Length: ${data[3].coat_length}</p><p class="title">Coat Type: ${data[3].coat_type}</p><p><button class=''>Contact</button></p></div>` );

//             $( ".profile5" ).append( `<div class="card"><h1>${lostStatus(data[4].lost_status)}</h1><img class="img-fluid image-profile" src="${data[4].pet_image1}" alt="${data[4].pet_name} the ${data[4].pet_type}" style="width:100%"><h4>${data[4].pet_name} the ${data[4].pet_type}</h4><p class="title">${data[4].sex} - Age: ${data[4].pet_age} yo </p><p class="title">${data[4].pet_breed}</p><p class="title">Location: ${data[4].pet_zip}</p><h5>Coat Description:</h5><p class="title">Color: ${data[4].color}</p><p class="title">Coat Length: ${data[4].coat_length}</p><p class="title">Coat Type: ${data[4].coat_type}</p><p><button class=''>Contact</button></p></div>` );
        
//         }) 

//         /// responsiveness for carousel reloads the carousel on window resize
       window.onresize = function(event){
           this.document.location.reload(true);
       }