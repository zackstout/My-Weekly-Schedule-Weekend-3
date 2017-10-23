CREATE TABLE taskstodo (
id serial PRIMARY KEY,
name varchar(50),
type varchar(50),
description varchar(50),
due varchar(50),
complete BOOLEAN);

CREATE TABLE typesoftasks (
id serial PRIMARY KEY,
blue varchar(40),
green varchar(40),
red varchar(40),
yellow varchar(40));

INSERT INTO "typesoftasks" ("blue", "green", "red", "yellow")
VALUES ('academics', 'chores', 'job', 'social life');

INSERT INTO "taskstodo" ("name", "type", "description", "due", "complete", "typecolor")
VALUES ('mow yard', 'chores', 'mow that!', '10/21/2017', false, 'yellow'),
('clean room', 'chores', 'clean that!', 'yesterday', false, 'red');
