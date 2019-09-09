CREATE TABLE user_pets (
pet_id SERIAL,
pet_image1 varchar(1040),
pet_image2 varchar(1040),
pet_image3 varchar(1040),
pet_name varchar(100) not null,
pet_type varchar(100) not null,
pet_breed varchar(100),
color varchar(100) not null,
pet_size varchar(100),
coat_type varchar(100) not null,
coat_length varchar(100) not null,
sex varchar(100) not null,
pet_age int,
lost_status bool default false,
lost_date varchar(100),
pet_zip int,
owner_id varchar(1000)
);
insert into user_pets (pet_name, pet_type, pet_breed, color, pet_size, pet_image1, sex , pet_age,pet_zip, lost_status, coat_type, coat_length)
values ('Fil','Dog', 'Labrador Retriever','Black','Large','petpichere','Male',10,92694, true, 'wirey','long');
insert into user_pets (pet_name, pet_type, pet_breed, color, pet_size, pet_image1, sex , pet_age,pet_zip, lost_status, coat_type, coat_length)
values ('Phillip','Cat', 'Tabby','Orange','Small','no_image','Male',5,92626, false,'silky','long hair');
select * from user_pets;