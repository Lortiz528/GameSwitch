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

--create the reveiws table
-- DROP TABLE IF EXISTS reviews;
-- CREATE TABLE reviews(
--     review_id SERIAL PRIMARY KEY,
--     reviewer TEXT,
--     content TEXT,
--     rating NUMERIC,
--     CHECK (rating >= 0 AND rating <= 5),
--     id_of_recipe INTEGER REFERENCES recipes (recipe_id)
--     ON DELETE CASCADE
-- )