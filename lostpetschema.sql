drop table if exists lost_pets;

CREATE TABLE lost_pets (
pet_id SERIAL,
pet_image1 varchar(1040),
pet_image2 varchar(1040),
pet_image3 varchar(1040),
pet_name varchar(100),
pet_type varchar(100) not null,
pet_breed varchar(100) not null,
color varchar(100) not null,
coat_type varchar(100) not null,
sex varchar(100),
pet_age int,
pet_size varchar(100) not null,
lost_status bool default true,
last_zip int not null,
finder_name varchar(100),
finder_phone varchar(100),
finder_email varchar(100)

);

select * from lost_pets;