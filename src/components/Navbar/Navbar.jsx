// import React from 'react';
import Currency from '/assets/Currency.png'

const Navbar = ({ coin }) => {
    return (
        <div className="container mx-auto transition-all duration-300 sticky top-0 z-50">
            <div className="navbar bg-base-100 shadow-sm ">
  <div className="flex-1">
    <a href="#" className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <button className="flex justify-between items-center gap-2 font bold text-xl">
      {coin} coins
      <img src={Currency} alt="Currency" className="h-5 w-5" />
    </button>
  </div>
</div>
        </div>
    );
};

export default Navbar;