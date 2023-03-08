import React, { Component, useState, useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import styles from './stylesheets/styles.css';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { Reviews } from './pages/Reviews.jsx';
import { Favorites } from './pages/Favorites.jsx';
import { Wishlist } from './pages/Wishlist.jsx';
import Landing from './pages/Landing.jsx';
import { CollectionList } from './pages/CollectionList.jsx';
import DetailsModal from './components/DetailsModal.jsx';
import NewRestaurant from './pages/NewRestaurant.jsx';
import {useNavigate} from 'react-router-dom';
import helperFns from './helperFns.js';
import { lazy, Suspense } from 'react';



function App() {
  useEffect(() => {
    console.log(helperFns);
    helperFns.getUserCoords();
  }, []);

  return (

    <div className="router">

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />
        <Route path='/collection' element={<CollectionList />} />
        <Route path='/home' element={<Landing />} />
        {/* <Route element={<Landing/>} path='/home' exact /> */}
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/wishlist' element={<Wishlist />} />
        {/* <Route path='/details-modal' element={<DetailsModal show={true} />} /> */}
        <Route path='/new-restaurant' element={<NewRestaurant />} />
      </Routes>
    </div>

  );
}

export default App;