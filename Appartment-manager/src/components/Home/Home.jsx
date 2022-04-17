import React from 'react'
import { CustomizedTables } from './Table'
import {useSelector} from 'react-redux'

export const Home = () => {

  const {isLoggedIn} = useSelector(state => state);
  return (
    <>
    {isLoggedIn ? <CustomizedTables /> : <div>Please Login</div>}
    
    </>
  )
}
