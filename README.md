# 🎮 GameSwitch NYC 🎮

Game.Connect.Repeat!


Game Switch is a platform for gamers to interact with local peers by trading video games. It serves as a cost effective and fun way to refresh your game collection. It sure beats the alternative- getting offered pennies on the dollar for a trade in by your local game store.

GameSwitch NYC has a user-friendly interface.  Making an account allows you to build a profile and game collection. Our users page allows you to find and sort users by location and view their collections. See a game you like? Make a trade offer! Manage your trade offers and Watch your game collections update instantly after completing trades. Build a reputation and watch your Game Switch score increase with every trade you make!


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
