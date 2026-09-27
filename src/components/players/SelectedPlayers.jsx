// import React from 'react';
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
const SelectedPlayers = ({ pl, setPl, coin, price, setCoin }) => {
    console.log(price);
    console.log(coin);
    return (
        <>
                <div className="col-start-2 flex justify-center my-8 items-center bg-red-300 rounded-2xl p-4">
            {pl.length === 0 ? <h2 className="text-2xl font-bold">No players selected yet.</h2>: <h2 className="text-2xl font-bold">Selected Players: {pl.length}</h2>}

        </div>

        <div className=""></div>

        {
            
            pl.map(player => (
                <div key={player.id} className="col-span-3 flex justify-between items-center p-3 rounded-2xl bg-linear-to-r from-blue-800 via-blue-300 to-lime-200 text-white my-4">
                <div key={player.id} className=" col-span-3 justify-between p-3  my-4">
                    <div className="flex items-center gap-4">
                        <FaUser className="text-2xl" />
                        <img src={player.playerImg} alt={player.playerName} className="w-16 h-16 rounded-full" />
                        <div>
                            <h3 className="text-xl font-bold">{player.playerName}</h3>
                            <p className="text-sm">{player.playerRole}</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {setCoin(coin + pl.price); setPl(pl.filter(p => p.id !== player.id))}} className="flex items-center btn btn-error  hover:bg-red-400 gap-2"><MdDelete className="transition hover:rotate-360 duration-600" /> </button>

                </div>
            ))
        }
        

        <div className={`${pl.length === 0 ? "hidden" : "col-start-2 flex justify-center my-8 items-center gap-4"}`}>
            <button onClick={() => setPl([])} className="btn btn-error gap-2"><MdDelete /> Clear All</button>
        </div>
            </>
    );
};

export default SelectedPlayers;