// import React from 'react';
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';
const SelectedPlayers = ({ pl, setPl, coin, price, setCoin }) => {
    return (
        <>
        <div className="col-start-2 flex justify-between items-center p-2 rounded-3xl bg-red-400 text-white my-4">
                 <h2 className="text-2xl font-bold">Selected Players: {pl.length}</h2>

        </div>
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
                <button onClick={() => {
                    toast("Player removed from selected list!", { type: "info" });
                    setCoin(coin + price);
                     setPl(pl.filter(p => p.id !== player.id))}} className="flex items-center btn btn-error  hover:bg-red-400 gap-2"><MdDelete className="transition hover:rotate-360 duration-600" /> </button>

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