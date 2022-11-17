-- step 1 incase there is a database already, drop it
DROP DATABASE IF EXISTS game_switch;

--step 2 create the db
CREATE DATABASE game_switch; 

--step 3 connect to the db
\c game_switch; 

--step 4 create the tables
--create the recipes table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_email TEXT,
    user_password TEXT NOT NULL,
    user_trade_score NUMERIC,
    user_date_of_birth DATE,
    user_location TEXT,
    user_avatar TEXT
);

--create the games table
DROP TABLE IF EXISTS games;
CREATE TABLE games(
    game_id SERIAL PRIMARY KEY,
    game_name TEXT NOT NULL,
    game_img TEXT,
    game_rating NUMERIC,
    CHECK (game_rating >= 0 AND game_rating <= 5),
    game_description TEXT,
    game_brand TEXT,
    user_id INTEGER NOT NULL REFERENCES users (user_id)
     ON DELETE CASCADE
);