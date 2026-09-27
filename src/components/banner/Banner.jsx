// import React from 'react';
import BannerImage from '/assets/banner-main.png'
import Bg from '/assets/bg-shadow.png'

const Banner = () => {
    return (
    <section className="banner relative isolate mx-4 min-h-100 overflow-hidden rounded-2xl bg-neutral-950 py-12 sm:mx-6 sm:min-h-120 sm:py-16 lg:mx-auto lg:max-w-7xl lg:py-20">
      <img
        src={Bg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-top opacity-95 sm:object-center"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-transparent via-neutral-950/10 to-neutral-950/55" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-8">
        <img src={BannerImage} alt="A cricket player holding a bat" className="mb-5 w-full max-w-xs sm:mb-6 sm:max-w-sm" />
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Assemble Your Ultimate Dream 11 Cricket Team
        </h1>
        <button type="button" className="btn btn-primary mt-6 sm:mt-8">Get Started</button>
      </div>
    </section>
    );
};

export default Banner;