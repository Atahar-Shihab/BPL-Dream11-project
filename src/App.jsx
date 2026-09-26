import './App.css'
import Navbar from './components/Navbar/Navbar';
import Banner from './components/banner/Banner';

import Players from './components/players/Players';
import { Suspense,useState } from 'react';


const fetchPlayer =  async () => {
  const res = await fetch('/data.json');
  return res.json();
}





function app(){
  const [coin, setCoin] = useState(50000);

  const players = fetchPlayer();
return (


  <>
  
  <Navbar coin={coin} />

  <Banner/>
<br />
<br />
<br />
<br />
<br />
  <Suspense fallback={<span className="loading loading-spinner text-error"></span>}>
    <Players players={players}  coin={coin} setCoin={setCoin} >
    </Players>
  </Suspense>



  
  
  </>
)



};


export default app;

