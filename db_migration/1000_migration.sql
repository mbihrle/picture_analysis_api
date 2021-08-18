

CREATE TABLE logins (
	id serial primary key,
	hash varchar(100) NOT NULL,
	email text UNIQUE NOT NULL
);

CREATE TABLE users (
	id serial primary key,
	name varchar(100) NULL,
	email text UNIQUE NOT NULL,
	entries bigint DEFAULT 0,
	joined timestamp NOT NULL,
);
