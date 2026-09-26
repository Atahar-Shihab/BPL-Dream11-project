// import React from 'react';
import { use } from 'react';
import AvailablePlayer from '../AvailablePlayers/AvailablePlayer';
import { useState } from 'react';
import SelectedPlayers from './SelectedPlayers';

const Players = ({ players,coin, setCoin }) => {
    const data = use(players);
    const [pl,setPl] = useState([]);
    const [selectedType, setSelectedType] = useState("available");

    const handleTypeChange = (type) => {
        setSelectedType(type);
    }
    return (

        <div className="container mx-auto my-4">
            <div className="flex justify-between gap-2 my-4 px-34 py-4 rounded-2xl ">
            <div>
            <div className="aura aura-dual">
  <div className="card bg-base-100">
      <h2 className="text-xl font-bold ">{selectedType === "available" ? "Available Players" : "Selected Players"}</h2>
  </div>
</div>
            </div>
            <div className="flex">
            <button onClick={() => handleTypeChange("available")} className={`btn btn-sm ${selectedType === "available" ? "bg-[#E7FE29]" : "bg-gray-300"} rounded-r-none rounded-l-2xl m-auto`}>Available</button>
            <button onClick={() => handleTypeChange("selected")} className={`btn btn-sm ${selectedType === "selected" ? "bg-[#E7FE29]" : "bg-gray-300"} rounded-l-none rounded-r-2xl m-auto`} >Selected({pl.length})</button>
            </div>
            </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
            {
                selectedType === "available" ? (
                    data.map(player => <AvailablePlayer pl={pl} setPl={setPl} key={player.id} data={player} coin={coin} setCoin={setCoin} />)
                ) : (
                    <SelectedPlayers pl={pl} setPl={setPl} />
                    
                )
            }
            

        </div>
        </div>
    );
};

export default Players;