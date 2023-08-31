import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const SinglePlayerDetails = ({ playerId, api_url }) => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchSinglePlayer = async () => {
            try {
                const response = await fetch(`${api_url}/${playerId}`);
                const responseData = await response.json();
                const playerData = responseData.player;
                setPlayer(playerData);
            } catch (error) {
                console.error(`Trouble fetching player #${playerId}.`, error);
            }
    };
    fetchSinglePlayer();
}, [playerId, api_url]);

if (!player) {
    return <p>Loading player details...</p>;
}

return (
    <div className="single-player-card">
    <h2>{player.name}</h2>
    <p>ID: {player.id}</p>
    <p>Breed: {player.breed}</p>
    <p>Team: {player.team ? player.team.name : "Unassigned"}</p>
    <img src={player.imageUrl} alt={player.name} />
    </div>
    )
}

SinglePlayerDetails.propTypes = {
    playerId: PropTypes.number.isRequired,
    api_url: PropTypes.string.isRequired,
};

export default SinglePlayerDetails;