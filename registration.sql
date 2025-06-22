create table registration (
    id serial primary key,
	id_birds integer,
	cpf varchar,
	pay_date date,
	description varchar,
	price real,
	name VARCHAR(100)
	FOREIGN KEY (id_birds) REFERENCES birds (id)
);
