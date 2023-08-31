import React from 'react';
import PropTypes from 'prop-types';

const PlayerCard = ({ player, setSelectedPlayerId, removePlayer}) => {

    const handleSeeDetails = () => {
        console.log(`see details for player ID: ${player.id}`)
        setSelectedPlayerId(player.id);
    };

    const handleRemovePlayer = () => {
        removePlayer(player.id)
    };

    return (
    <div className="player-card">
        <h2>{player.name}</h2>
        <p>ID: {player.id}</p>
        <img className="player-image" src={player.imageUrl} alt={player.name} />
        <button onClick={handleSeeDetails}>See Details</button>
        <button onClick={handleRemovePlayer}>Remove From Roster</button>
    </div>
    );
};

PlayerCard.propTypes = {
    player: PropTypes.object.isRequired,
    setSelectedPlayerId: PropTypes.func.isRequired,
    removePlayer: PropTypes.func.isRequired,
};

export default PlayerCard;