import React from 'react'
import { CustomizedTables } from './Table'
import {useSelector} from 'react-redux'

export const Home = () => {

  const {isLoggedIn} = useSelector(state => state);
  return (
    <>
    <h1>DashBoard</h1>
    {isLoggedIn ? <CustomizedTables /> : <div>Please Login</div>}
    
    </>
  )
}
