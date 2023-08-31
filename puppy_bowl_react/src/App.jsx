import React, { useState, useEffect } from 'react';
import SinglePlayerDetails from './components/SinglePlayerDetails';
import PlayerCard from './components/PlayerCard';
import './App.css'


const cohortName = "2307-fsa-et-web-sf";
const api_url = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

const App = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    console.log("Puppies:", players)


  const fetchAllPlayers = async () => {
        try {
            const response = await fetch(api_url);
            const responseData = await response.json();
            const playersArray = responseData.data.players;
            setPlayers(playersArray);
        } catch (error) {
                console.error("Trouble fecthing players", error);
        }
    };
  
    const removePlayer = async (playerId) => {
        try {
          const response = await fetch(`${api_url}/${playerId}`, {
            method: 'DELETE'
          });
          const responseData = await response.json();
      
            if (responseData.success) {
              console.log(`Player ${players.id} removed successfully.`);
            } else {
              console.error(`Failed to remove player ${players.id}`);
            } 
        } catch (error) {
            console.error(`Error while removing player ${players.id}.`, error);
        }
      };


    useEffect(() => {
      fetchAllPlayers();
    }, []);


return (
  <div className='app'>
    <h1>Puppy Bowl Roster</h1>
    {selectedPlayerId ? (
      <SinglePlayerDetails playerId={selectedPlayerId} api_url={api_url}/>
    ) : ( 
      <div className='player-container'>
        {players.length === 0 ? (
          <p>No players available.</p>
        ) : (
          players.map((player) => (
            <PlayerCard 
              key={player.id}
              player={player}
              setSelectedPlayerId = {setSelectedPlayerId}
              removePlayer={removePlayer}
              />
          ))
        )}
        </div>
    )}
  </div>
);
}
        

export default App;
