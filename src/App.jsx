import './App.css'
import Navbar from './components/Navbar/Navbar';
import Banner from './components/banner/Banner';

import Players from './components/players/Players';
import { Suspense } from 'react';


const fetchPlayer =  async () => {
  const res = await fetch('/data.json');
  return res.json();
}





function app(){

  const players = fetchPlayer();
return (


  <>
  
  <Navbar />

  <Banner/>
<br />
<br />
<br />
<br />
<br />
  <Suspense fallback={<span className="loading loading-spinner text-error"></span>}>
    <Players players={players}> </Players>
  </Suspense>



  
  
  </>
)



};


export default app;

