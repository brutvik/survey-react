import React from "react";
import './App.css';


import {
    Link
  } from 'react-router-dom';

const Home = () => {
	

	return (
        <div>
        <div>
        <nav>
          <ul>
            <li>
              <Link to="/userList">User List</Link>
            </li>
            <li>
              <Link to="/">Survey</Link>
            </li>
          </ul>
        </nav>
        </div>
    
            <h2>WELCOME TO SWE 645</h2>
            <img src={require('./swe_image.jpeg')} alt="Description" />;
                
            </div>
        
        
	);
};

export default Home;
