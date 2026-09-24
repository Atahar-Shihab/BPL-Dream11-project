// import React from 'react';
import BannerImage from '/assets/banner-main.png'
import Bg from '/assets/bg-shadow.png'

const Banner = () => {
    return (
        <div className="banner py-20">
           <div className="px-68 py-20 m-4">
        <img src={Bg} alt="Background" className="absolute object-cover" />

  <div className="hero-content text-center">
    <div className="">
        <img src={BannerImage} alt="Banner" className="mx-auto mb-4" />
        <h1 className="text-5xl font-bold gap-2 py-2">Assemble Your Ultimate Dream 11 Cricket Team</h1>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div> 
            
        </div>
    );
};

export default Banner;