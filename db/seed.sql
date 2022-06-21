

INSERT INTO parents(name, login_name, password_hash, family_name) VALUES ('Saura', 'sauraganguli','$2b$10$vkSEjPUVM5NZYh7CRrdykO1FNgfGU07wGYjrdrX6iC5dSQDFvLhIO', 'Ganguli');
INSERT INTO parents(name, login_name, password_hash, family_name) VALUES ('Rina','rinasham','$2b$10$vkSEjPUVM5NZYh7CRrdykO1FNgfGU07wGYjrdrX6iC5dSQDFvLhIO', 'Sham');

INSERT INTO kids(name, parent_id, login_name, password_hash, total_points, total_cents, avatar) VALUES (
	'Laura', 1, 'lauraganguli', '$2b$10$vkSEjPUVM5NZYh7CRrdykO1FNgfGU07wGYjrdrX6iC5dSQDFvLhIO', 500, 1000, 'dog'
);
INSERT INTO kids(name, parent_id, login_name, password_hash, total_points, total_cents, avatar) VALUES (
	'Bob', 2, 'bobsham', '$2b$10$vkSEjPUVM5NZYh7CRrdykO1FNgfGU07wGYjrdrX6iC5dSQDFvLhIO', 500, 1000, 'koala'
);

INSERT INTO tasks(description, kid_id, status, points, category) VALUES ('Weekly Pocket Money', 1, 'approved', 1000, 'recurring');
INSERT INTO tasks(description, kid_id, status, cents, category) VALUES ('Get a B or higher in maths', 1, 'approved', 1000, 'Recurring');


INSERT INTO goals (description, kid_id, cents, status, allocated_cents) VALUES ('New Final Fantasy Game', 1,  5000, 'approved', 1000);
INSERT INTO goals (description, kid_id, cents, status, allocated_cents) VALUES ('Gucci Flip Flops', 1,  5000, 'pending', 2000);
INSERT INTO goals (description, kid_id, points, status, allocated_points) VALUES ('Play Outside', 1,  5000, 'approved', 3000);
INSERT INTO goals (description, kid_id, points, status, allocated_points) VALUES ('Family hug time', 1,  10000, 'pending', 2000);
