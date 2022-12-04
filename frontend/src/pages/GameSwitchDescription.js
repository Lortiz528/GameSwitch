import { Image } from 'react-bootstrap';

function GameSwitchDescription() {
  return (
    <div className="gameswitchdescription">
      <section className="instructionCard">
        <h2>Welcome to Game Switch NYC!</h2>
        <p>
          <strong>
            This is a platform for gamers to interact with local peers by
            trading video games. Game Switch provides an alternative way of
            refreshing your game collection.
          </strong>
        </p>
      </section>
      <section className="instructionCard">
        <h4>
          To make the most out of this site, users need to make an account
        </h4>
        <Image src="https://i.imgur.com/h2FOgqH.png" alt="login" />
      </section>

      <section className="instructionCard">
        <br></br>
        <h4>Game Switchers can search for local users in their area</h4>
        <Image width={'1000px'} src="https://i.imgur.com/aTtgct5.png" />
      </section>
      <br></br>
      <br></br>

      <section className="instructionCard">
        <h4>A users page contains their short bio and game library</h4>
        <Image width={'1000px'} src="https://i.imgur.com/YRcEDEN.png" />
      </section>

      <br />
      <br />
      <section className="instructionCard">
        <h4>
          See a game you like? click on it and offer up a trade with one of your
          games
        </h4>
        <Image src="https://i.imgur.com/SGcEyGG.png" />
        <Image src="https://i.imgur.com/5bGYyaw.png" />
      </section>

      <section className="instructionCard">
        <h4>Manage your Current Trade requests and Offers</h4>
        <Image src="https://i.imgur.com/D8zW4CW.png" />
      </section>

      <section>
        <h4></h4>
        <Image />
      </section>
    </div>
  );
}
export default GameSwitchDescription;
