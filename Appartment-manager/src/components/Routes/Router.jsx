import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { AvailableFlat } from '../Available/AvailableFlat'
import { Home } from '../Home/Home'
import { Login } from '../Login/Login'
import { Navbar } from '../Navbar/Navbar'
import { NotFound } from '../NotFound/NotFound'
import { Register } from '../Register/Register'
import { Resident } from '../Resident/Resident'
import { Flats } from "../Flats/Flats";

export const Router = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resident/:id" element={<Resident />} />
        <Route path="/flat/:id" element={<Flats/>} />
        <Route path="/available_flat_details" element={<AvailableFlat />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
