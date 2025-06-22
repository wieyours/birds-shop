CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(150) NOT NULL
);

insert into users (email, senha)
values ('admin@birdshop.com', '123456');
