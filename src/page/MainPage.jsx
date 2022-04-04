import React from "react"; 
import { Link } from "react-router-dom";
 
const MainPage = () => {
  return (
    <div className="main-container">
       <div className="text-boxcontainer">
         <h1>Online Tickets</h1>
         <p>Buy Tickets To Enjoy your life</p>  
         <Link to="/buytickets">
          <button className="btn-buyticket">Buy Tickets</button>
         </Link>
       </div>
    </div>
  )
  
};

export default MainPage;
