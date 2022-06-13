INSERT INTO families(name) VALUES ('Ganguli');
INSERT INTO families(name) VALUES ('Sham');
INSERT INTO families(name) VALUES ('Adria');

INSERT INTO parents(name, family_id, login_name, password_hash) VALUES ('Saura', 1, 'sauraganguli','$2b$10$vkSEjPUVM5NZYh7CRrdykO1FNgfGU07wGYjrdrX6iC5dSQDFvLhIO');
INSERT INTO parents(name, family_id, login_name, password_hash) VALUES ('Rina', 2, 'rinasham','$2b$10$vkSEjPUVM5NZYh7CRrdykO1FNgfGU07wGYjrdrX6iC5dSQDFvLhIO');

INSERT INTO kids(name, family_id, login_name, password_hash, total_points, total_cents) VALUES (
	'Laura', 1, 'lauraganguli', '$2b$10$vkSEjPUVM5NZYh7CRrdykO1FNgfGU07wGYjrdrX6iC5dSQDFvLhIO', 500, 1000
);
INSERT INTO kids(name, family_id, login_name, password_hash, total_points, total_cents) VALUES (
	'Bob', 2, 'bobsham', '$2b$10$vkSEjPUVM5NZYh7CRrdykO1FNgfGU07wGYjrdrX6iC5dSQDFvLhIO', 500, 1000
);

INSERT INTO tasks(description, kid_id, status, points, category) VALUES ('Weekly Pocket Money', 1, 'approved', 1000, 'recurring');
INSERT INTO tasks(description, kid_id, status, cents, category) VALUES ('Get a B or higher in maths', 1, 'approved', 1000, 'Recurring');


INSERT INTO goals(description, kid_id, cents) VALUES ('New Final Fantasy Game', 1,  5000);
