drop table if exists lost_pets;

CREATE TABLE lost_pets
(
    pet_id SERIAL,
    pet_image1 varchar(1040),
    pet_image2 varchar(1040),
    pet_image3 varchar(1040),
    pet_type varchar(100) not null,
    pet_breed varchar(100) not null,
    color varchar(100) not null,
    coat_type varchar(100) not null,
    sex varchar(100),
    pet_size varchar(100) not null,
    lost_status bool default true,
    last_zip int not null,
    finder_name varchar(100),
    finder_phone varchar(100),
    finder_email varchar(100)

);


insert into lost_pets
    (
    pet_image1,
    pet_image2,
    pet_image3,
    pet_type,
    pet_breed,
    color,
    coat_type,
    sex,
    pet_size,
    last_zip,
    finder_name,
    finder_phone,
    finder_email
    )
values
    ('data:longstr1', 'data:longstr2', 'data:longstr3',
        'pet_type',
        'pet_breed',
        'color',
        'coat_type',
        'sex',
        'pet_size',
        92627,
        'finder_name',
        'finder_phone',
        'finder_email'
);

select *
from lost_pets;
