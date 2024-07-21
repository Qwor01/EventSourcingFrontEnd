import axios from "axios";
import React, { useState, useEffect } from 'react';

const axiosInstance = axios.create({
  timeout: 10000, 
});

const Navbar = ({setFecha}) => {

  const handleDateChange = (e) => {
    setFecha(e.target.value);
    console.log(e.target.value)
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-center mr-auto">
      <div className="mr-4">
        <label htmlFor="fecha" className="text-white mr-2">Fecha:</label>
        <input type="date" id="fecha" name="fecha" className="p-2 rounded" onChange={handleDateChange}/>
      </div>
    </nav>
  );
}

export default Navbar;