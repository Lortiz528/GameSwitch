\c game_switch;

--game_switch
--user data
INSERT INTO users (user_name,user_email,user_password,user_trade_score,user_date_of_birth,user_location,user_avatar) VALUES ('Luis','luis456@gmail.com','abcdefg',4.5,NULL,'Brooklyn',NULL),('Lily','lily789@gmail.com','aaabbb',4.5,NULL,'Manhattan',NULL),('Pratima','pratima1010@gmail.com','aaabbbccc',4.5,NULL,'Manhattan',NULL),('JuHao','JuHao123@gmail.com','aaabbbccc',4.5,NULL,'Queens',NULL);

--games
INSERT INTO games (game_name,game_img,game_rating,game_description,game_brand,user_id) VALUES('Super Mario','https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Super_Mario_World_Coverart.png/220px-Super_Mario_World_Coverart.png',4.5,'super Mario game','Nintendo',1), ('Cooking Mama','https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.0/c_scale,w_600/ncom/en_US/games/3ds/c/cooking-mama-sweet-shop-3ds/boxart', 4.5, 'cooking simulation game','Nintendo', 2);