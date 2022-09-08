--liquibase formatted sql

--changeset alba:1
INSERT INTO bank (name)
VALUES ('Таврический'),
       ('Совкомбанк'),
       ('ББР'),
       ('Открытие'),
       ('Тинькофф'),
       ('Хоумкредитбанк'),
       ('Совкомбанк');

--changeset alba:2
INSERT INTO bank (name)
VALUES ('Дом.РФ'),
       ('ЭТБ');

--changeset alba:3
INSERT INTO deposit (name,
                     open_date,
                     close_date,
                     initial_sum,
                     year_percent,
                     percentage_type,
                     capitalization,
                     bank_id)
VALUES ('Активный взлет', '2022-07-25', '2023-08-24', 50000, 8.55, 'AT_THE_END', true, 3),
       ('Надежный', '2022-07-08', '2022-10-07', 10000, 8.4, 'AT_THE_END', false, 8),
       ('Доход без границ', '2022-07-08', '2022-08-08', 100001, 7.5, 'AT_THE_END', false, 9);

--changeset alba:4
INSERT INTO contribution (date,
                          sum,
                          deposit_id)
VALUES ('2022-07-25', 50000, 1),
       ('2022-07-08', 10000, 2),
       ('2022-07-08', 100001, 3);
