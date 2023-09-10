import React , { useEffect, useState } from 'react'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Routes ,Route } from 'react-router-dom'
import Home from './pages/Home'
import DarkMode from './component/DarkMode'
import axios from 'axios'

export default function App() {

  const [auth , setAuth] =useState(new Object);
  const [userAuth,setUserAuth] = useState({});

  useEffect(
    ()=>{
      axios.get('http://localhost:3000/usersession/0').then(res=>setAuth(res.data.auth)).catch(err=>console.log(err))
    } , []
  )
  return (

    <div className='container'>
      <div>
      <DarkMode></DarkMode>
      </div>
      <Routes>
        <Route path="/" element={<Login setUserAuth={setUserAuth} setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/home' element={<Home user={userAuth} setAuth={setAuth} auth={auth}/>}></Route>
      </Routes>
    </div>
    
      )
}
