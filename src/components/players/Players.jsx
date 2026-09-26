// import React from 'react';
import { use } from 'react';
import AvailablePlayer from '../AvailablePlayers/AvailablePlayer';

const Players = ({ players }) => {
    const data = use(players);
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
            {

            data.map((player) => (
                <AvailablePlayer key={player.id} data={player} />
            ))
            
            }
            

        </div>
    );
};

export default Players;