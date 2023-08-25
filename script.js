// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2307-fsa-et-web-sf";
const api_url = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;


/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(api_url);
    const responseData = await response.json();

    const playersArray = responseData.data.players;

    // console.log(playersArray);
    return playersArray;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${api_url}/${playerId}`);
    const responseData = await response.json();

    const playerData = responseData.data.player;
    console.log(playerData);
    return playerData;

  } catch (error) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, error);
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  const mainPage = document.querySelector('.player-container');
  mainPage.innerHTML = "";

  if (playerList.length === 0) {
    return mainPage.innerHTML = "No players available.";
  }

  //each player card with (name, id, image) & two buttons ("see details", "remove from roster")
  playerList.forEach((player) => {
    const playerCard = document.createElement('div');
    playerCard.classList.add('player-card');

    const playerName = document.createElement('h2');
    playerName.textContent = player.name;

    const playerId = document.createElement('p');
    playerId.textContent = `ID: ${player.id}`;

    const playerImage = document.createElement('img');
    playerImage.src = player.imageUrl;
    playerImage.alt = player.name;

    const seeDetailsButton = document.createElement('button');
    seeDetailsButton.textContent = "See details";
    seeDetailsButton.addEventListener("click", async () => {
      try {
        const singlePlayer = await fetchSinglePlayer(player.id);
        renderSinglePlayer(singlePlayer);
      } catch (error) {
        console.error(`Oh no, trouble fetching player #${player.id}!`, error);
      }
    });

    const removeFromRosterButton = document.createElement('button');
    removeFromRosterButton.textContent = "Remove from roster";
    removeFromRosterButton.addEventListener("click", async () => {
      removePlayer(player.id);

      const updatedPlayers = playerList.filter(p => p.id !== player.id);
      renderAllPlayers(updatedPlayers);
    });

    playerCard.appendChild(playerName);
    playerCard.appendChild(playerId);
    playerCard.appendChild(playerImage);
    playerCard.appendChild(seeDetailsButton);
    playerCard.appendChild(removeFromRosterButton);

    mainPage.appendChild(playerCard);
  });
};

//**************DO NOT DELETE FROM API!!!*****************
// const removePlayer = async (playerId) => {
//   try {
//     const response = await fetch(`${api_url}/${playerId}`, {
//       method: 'DELETE'
//     });
//     const responseData = await response.json();

//       if (responseData.success) {
//         console.log(`Player ${player.id} removed successfully.`);
//       } else {
//         console.error(`Failed to remove player ${player.id}`);
//       } 
//   } catch (error) {
//       console.error(`Error while removing player ${player.id}.`, error);
//   }
// };

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
//displayed in a card with info (name, id, breed, image, team name) & "back to all players" button
const renderSinglePlayer = (player) => {
  const mainPage = document.querySelector('.player-container');
  mainPage.innerHTML = "";

  const singlePlayerCard = document.createElement('div');
  singlePlayerCard.classList.add('single-player-card');

  const playerName = document.createElement('h2');
  playerName.textContent = player.name;

  const playerId = document.createElement('p');
  playerId.textContent = `ID: ${player.id}`;

  const playerBreed = document.createElement('p');
  playerBreed.textContent = `Breed: ${player.breed}`;

  const playerTeamName = document.createElement('p');
  playerTeamName.textContent = `Team: ${player.team ? player.team.name : "Unassigned"}`;

  const playerImage = document.createElement('img');
  playerImage.src = player.imageUrl;
  playerImage.alt = player.name;

  const backToAllButton = document.createElement('button');
  backToAllButton.textContent = "Back to all players";
  backToAllButton.addEventListener("click", async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

  });

  singlePlayerCard.appendChild(playerName);
  singlePlayerCard.appendChild(playerId);
  singlePlayerCard.appendChild(playerBreed);
  singlePlayerCard.appendChild(playerTeamName);
  singlePlayerCard.appendChild(playerImage);
  singlePlayerCard.appendChild(backToAllButton);

  mainPage.appendChild(singlePlayerCard);
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    renderAllPlayers,
    renderSinglePlayer,
  };
} else {
  init();
}
