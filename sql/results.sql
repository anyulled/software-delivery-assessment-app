drop table if exists sda.result;

create table if not exists sda.result
(
    id          int unique auto_increment not null,
    question_id int                       not null,
    value       float                     not null,
    session_id  int                       not null
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_general_ci;

alter table sda.result
    add constraint result_question_id_fk
        foreign key (question_id) references sda.question (id)
            on update cascade;

alter table sda.result
    add constraint result_session_id_fk
        foreign key (session_id) references sda.session (id)
            on update cascade;

# Continuous delivery
insert into sda.result(question_id, session_id, value)
VALUES (1, 1, 1.8),
       (2, 1, 2.1),
       (3, 1, 3.3),
       (4, 1, 2.5),
       (5, 1, 2.9),
       (6, 1, 3.3),
       (7, 1, 2.9),
       (8, 1, 3.0),
       (9, 1, 3.7),
       (10, 1, 2.0),
       (11, 1, 2.0),
       (12, 1, 1.7),
       (13, 1, 2.3),
       (14, 1, 2.1);

# Flow
insert into sda.result(session_id, question_id, value)
values (1, 15, 1.5),
       (1, 16, 2.07),
       (1, 17, 2.41),
       (1, 18, 3.9),
       (1, 19, 2.6),
       (1, 20, 2.26),
       (1, 21, 2.57),
       (1, 22, 3.3),
       (1, 23, 3.4);

# Team Topologies
insert into sda.result(session_id, question_id, value)
values (1, 24, 3.71),
       (1, 25, 4.5),
       (1, 26, 3.07),
       (1, 27, 2.6),
       (1, 28, 2.5),
       (1, 29, 2.5),
       (1, 30, 3.23),
       (1, 31, 4.35),
       (1, 32, 3.14);

# Security
insert into sda.result(session_id, question_id, value)
values (1, 33, 2.6),
       (1, 34, 2.9),
       (1, 35, 2.6),
       (1, 36, 2.8),
       (1, 37, 3.1),
       (1, 38, 2.6),
       (1, 39, 3.5),
       (1, 40, 3.6),
       (1, 41, 3.3),
       (1, 42, 3),
       (1, 43, 2.2);

# Deployment
insert into sda.result(session_id, question_id, value)
values (1, 44, 3.1),
       (1, 45, 3.3),
       (1, 46, 3.7),
       (1, 47, 3.3);

# Operability
insert into sda.result(session_id, question_id, value)
values (1, 48, 2.6),
       (1, 49, 2.8),
       (1, 50, 2.1),
       (1, 51, 3.1),
       (1, 52, 3.6),
       (1, 53, 2.5),
       (1, 54, 2.6),
       (1, 55, 3),
       (1, 56, 2.6),
       (1, 57, 2.9),
       (1, 58, 2.9),
       (1, 59, 3),
       (1, 60, 2.9),
       (1, 61, 3.4);

# Reliability
insert into sda.result(session_id, question_id, value)
values (1, 62, 3),
       (1, 63, 3),
       (1, 64, 2.6),
       (1, 65, 2.5),
       (1, 66, 2.9),
       (1, 67, 2.7),
       (1, 68, 2.5),
       (1, 69, 2.5),
       (1, 70, 2.9),
       (1, 71, 2.6);

# On-Call
insert into sda.result(session_id, question_id, value)
values (1, 72, 5),
       (1, 73, 5),
       (1, 74, 5),
       (1, 75, 5),
       (1, 76, 5),
       (1, 77, 5),
       (1, 78, 5),
       (1, 79, 5),
       (1, 80, 9),
       (1, 81, 6);

# Testability
insert into sda.result(session_id, question_id, value)
values (1, 82, 1.9),
       (1, 83, 2.1),
       (1, 84, 3.3),
       (1, 85, 3.1),
       (1, 86, 3.1),
       (1, 87, 3.3),
       (1, 88, 3),
       (1, 89, 3),
       (1, 90, 2.1),
       (1, 91, 3);

# Team Health
insert into sda.result(session_id, question_id, value)
values (1, 92, 5),
       (1, 93, 5),
       (1, 94, 5),
       (1, 95, 5),
       (1, 96, 5),
       (1, 97, 5),
       (1, 98, 5),
       (1, 99, 5),
       (1, 100, 5),
       (1, 101, 5),
       (1, 102, 5),
       (1, 103, 5),
       (1, 104, 5),
       (1, 105, 5);

select t.name, q.name, q.description, q.minimum_text, q.maximum_text, result.value
from result
         inner join sda.session s on result.session_id = s.id
         inner join sda.question q on result.question_id = q.id
         inner join sda.topic t on q.topic_id = t.id
;