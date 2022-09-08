--liquibase formatted sql

--changeset alba:1
CREATE TABLE IF NOT EXISTS bank
(
    id   INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);
--rollback DROP TABLE bank;

--changeset alba:2
CREATE TABLE IF NOT EXISTS contribution
(
    id         INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    date       TIMESTAMP NOT NULL,
    sum        NUMERIC   NOT NULL,
    deposit_id INT REFERENCES deposit (id) ON DELETE CASCADE
);
--rollback DROP TABLE contribution;

--changeset alba:3
CREATE TABLE IF NOT EXISTS deposit
(
    id              INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name            VARCHAR(128) NOT NULL,
    open_date       TIMESTAMP    NOT NULL,
    close_date      TIMESTAMP    NOT NULL,
    initial_sum     NUMERIC      NOT NULL,
    year_percent    NUMERIC      NOT NULL,
    percentage_type VARCHAR(40)  NOT NULL,
    capitalization  BOOLEAN      NOT NULL,
    bank_id         INT REFERENCES bank (id)
);
--rollback DROP TABLE deposit;
