import React from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios";
import { OutlinedCard } from './Card';


export const Resident = () => {
    const { id } = useParams();


    const [isError, setIsError] = React.useState(false);
    const [fetching, setFetching] = React.useState(true);
    const [values, setValues] = React.useState({});

    React.useEffect(() => {
        setFetching(true);
      
        axios.get(`http://localhost/resident/${id}`).then((res) => {
            console.log(res.data)
            setValues(res.data);
            setIsError(false);
            setFetching(false);
        }).catch(err => {
            setIsError(true);
            setFetching(false);

        })
    
      return () => {
        
      }
    }, [])
    

  return (
    <>
      {fetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <h2>Error!</h2>
      ) : (
        <div>
          <OutlinedCard data={values} />
        </div>
      )}
    </>
  );
}

