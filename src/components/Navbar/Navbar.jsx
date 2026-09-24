// import React from 'react';
import Currency from '/assets/Currency.png'

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <button className="flex justify-between items-center gap-2 font bold text-xl">
      0 coins
      <img src={Currency} alt="Currency" className="h-5 w-5" />
    </button>
  </div>
</div>
        </div>
    );
};

export default Navbar;