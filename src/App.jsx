import './App.css'
import Navbar from './components/Navbar/Navbar';
import Banner from './components/banner/Banner';

import Players from './components/players/Players';



const fetchPlayer = async () => {
  const res = await fetch('/data.json');
  return res.json();
}





function app(){

return (


  <>
  
  <Navbar/>

  <Banner/>

  <Players/>



  
  
  </>
)



};


export default app;

