import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home } from '../Home/Home'
import { Login } from '../Login/Login'
import { Navbar } from '../Navbar/Navbar'
import { NotFound } from '../NotFound/NotFound'
import { Register } from '../Register/Register'

export const Router = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
