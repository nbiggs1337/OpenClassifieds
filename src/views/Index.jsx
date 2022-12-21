import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { collect, getData } from "../firebase/routes"


function Index() {
  const [users, setUsers] = useState({});

  
  useEffect(() => {
    // const getData = async () => {
    //   const data = await getDocs(collect);
    //   console.log(data)
    // }
    getData();
  }, [])
  
  
  return (
    <div>Index
        <h1>Hello World! This is the homepage.</h1>
        
        <br />
        
        <button>
          <Link to="/login">Login</Link>
        </button>
        <button>
          <Link to="/register">Register</Link>
        </button>
        
        
        
    </div>
  )
}

export default Index