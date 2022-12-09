# 🎮 GameSwitch NYC 🎮

Game.Connect.Repeat!

## Exchange your games with no cost!

This is a platform for gamers to interact with local peers by trading video games. Game Switch provides an alternative way of refreshing your game collection. Many of you have experienced this or know someone who has. When you trade games in you local GameStop store you don't get enough. What's the use of returning when you can exchange a game you have not experienced with another gamer with no money involved. Wouldn’t it be cool to have a low cost way to get more value for your used games and also meet local peers with similar interests? 
GameSwitch NYC has a user-friendly interface our application allows you to sign up, login, search for games, and users. You can change you profile picture to the cutest avatars it has. When you trade the game and both user accepts you can contact the user to coordinate the meetup. If you are tired of playing your game, sign up and see what games you want to play by trading the game you don't want. GameSwitch NYC has your back!


## Important Links

🕹️ [Deployed Frontend](https://game-switch-nyc.netlify.app/)

🕹️ [Deployed Backend](https://latest-gameswitch.onrender.com)

🕹️ [Trello](https://trello.com/b/Zu5DpOyo/capstone-group-1-video-game-exchange)

🕹️ [Wireframe](https://wireframe.cc/8CnMSP)

🕹️ [ERD](https://miro.com/welcomeonboard/elN5aFYxVzhYdVI5VEpPTVVvWjNJMUVkM0N6MGpMaWd3NkJVWGNQMUNBT2NGTVIxcUllYzRaRGJIcUUxT3FPbHwzNDU4NzY0NTE2MDUzODU0MDU1fDI=?share_link_id=45931369474)

## Local Setup

### Frontend Setup

```bash
# clone the repository to your local machine.
git clone git@github.com:Lortiz528/GameSwitch.git

# navigate to the front-end directory
cd frontend

# create the .env file (make sure you are on the same level as the package.json of the frontend-end directory)
touch .env

#inside the .env file enter these data and save (you need to register a firebase account)
# https://firebase.google.com/
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_API_URL=http://localhost:3333

# install the required node modules
npm i

# start the server
npm start
```

### Backend Setup

```bash
# clone the repository to your local machine.
git clone git@github.com:Lortiz528/GameSwitch.git

# navigate to the back-end directory
cd backend

# create the .env file (make sure you are on the same level as the package.json of the back-end directory)
touch .env

#inside the .env file enter these data and save

PORT=3333
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=game_switch

# install the required node modules
npm i

# initialize and seed the database
npm run db:init
npm run db:seed

# start the server
nodemon server.js
```

## Contributors

🎰 [JuHao Chen](https://github.com/JuHaoChen1997)

🎰 [Luis Ortiz](https://github.com/Lortiz528)

🎰 [Lili Wu](https://github.com/liliwu8)

🎰 [Pratima Roy](https://github.com/PratimaRoy)
