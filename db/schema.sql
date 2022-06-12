DROP TABLE IF EXISTS families CASCADE;
DROP TABLE IF EXISTS parents;
DROP TABLE IF EXISTS kids CASCADE;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS points;
DROP TABLE IF EXISTS goals;

CREATE TABLE families(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE parents(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	family_id INT REFERENCES families(id),
	login_name VARCHAR(255),
	password_hash VARCHAR(255)
);

CREATE TABLE kids(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	family_id INT REFERENCES families(id),
	login_name VARCHAR(255),
	password_hash VARCHAR(255),
	total_points INT,
	total_cents INT
);

CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	description TEXT,
	kid_id INT REFERENCES kids(id),
	status VARCHAR(255),
	points INT,
	cents INT,
	expiry_date TIMESTAMP,
	category VARCHAR(255)
);

CREATE TABLE goals(
	id SERIAL PRIMARY KEY,
	kid_id INT REFERENCES kids(id),
	description TEXT,
	cents INT,
	points INT,
	allocated_cents INT,
	allocated_points INT
);