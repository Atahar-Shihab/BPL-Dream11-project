// import React from 'react'; 
import { FaUser,FaFlag } from "react-icons/fa";
const AvailablePlayer = ({data}) => {
    console.log(data);


    const { playerName, playerCountry, playerType, playerImg, price, rating, bowlingStyle, battingStyle } = data;

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={playerImg}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title"><FaUser />{playerName}</h2>
    <div className="flex  justify-between items-center gap-2">
        <div className="flex justify-between items-center gap-2">
        <FaFlag/>
        <p className="">{playerCountry}</p>
        
        </div>
       <button className="btn btn-ghost">{playerType}</button>
 
    </div>
    <div className="divider"></div>
    <div className="aura aura-gold flex justify-between items-center
    bg-linear-to-r from-blue-800 via-blue-300 to-lime-200 p-2 rounded-lg text-white">
    <h2 className="font-bold">Rating:</h2>
    <p className="font-bold justify-end flex text-slate-800 ">{rating}</p>
    </div> 
    <div className="flex justify-between items-center gap-26">
        <p>{battingStyle}</p>
        <p>{bowlingStyle}</p>
    </div>
    <div className="card-actions justify-between items-center">
      <p className="font-semibold">Price: ${price}</p>
      <button className="btn">Choose Player</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default AvailablePlayer;