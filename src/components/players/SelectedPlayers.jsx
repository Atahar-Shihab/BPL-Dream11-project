// import React from 'react';

const SelectedPlayers = ({ pl, setPl }) => {
    return (
        <>
        <div className="col-start-2 flex justify-center my-8 items-center bg-red-300 rounded-2xl p-4">
            {pl.length === 0 ? <h2 className="text-2xl font-bold">No players selected yet.</h2>: <h2 className="text-2xl font-bold">Selected Players: {pl.length}</h2>}

        </div>
            </>
    );
};

export default SelectedPlayers;