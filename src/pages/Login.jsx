import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from"axios" ;


export default function Login({ user ,setUserAuth,setAuth}) {
    const [users , setUsers]=useState([])
    const [userInfo , setUserInfo]=useState({
        id:Date.now(),
        
    })
    const [msg,setMsg]=useState('')
    const navigate=useNavigate()
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange =(event)=>{
        setPasswordInput(event.target.value);
        setUserInfo((prev)=>{return {...prev , [event.target.name] : event.target.value}})
    }

    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

    const handleChange=(event)=>{
        setUserInfo((prev)=>{return {...prev , [event.target.name] : event.target.value}})
    }
    const getUsers=()=>{
        axios.get("http://localhost:3000/users").then((res)=>setUsers(res.data)).catch(err=>console.log(err))
    }
    const handleLogin=(event)=>{
        event.preventDefault();
        let user=users.find(e=>e.email===userInfo.email&&e.password===userInfo.password ) ;
        if(user){
            setAuth(true) ;
            axios.put("http://localhost:3000/usersession/0" ,     {
                id : 0,
                auth : true
              })
            setUserAuth(user)
            navigate('/home')  
        }else{
            setMsg("User not found")
        }
    }
    useEffect(()=>{
        
        getUsers()
    },[])
    const [image, setImage] = useState(null)

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
 }
}
  return (
    <center><div class="container" style={{marginTop : 100 , maxWidth : 1920}} >
    <h1 class="text-center ">Welcome ! </h1><br></br>
    <img src="/user.png" alt="" style={{height: 200}}/><br></br><br></br>
    <input style={{maxWidth : 540}} class="form-control"  type="email" name='email' placeholder="Email" onChange={(e)=>handleChange(e)} id='email' /><br></br><br></br>
    <div class="input-group" style={{display:"flex" , alignItems :"center" , justifyContent:"center"}}>
    <input id='inputField' style={{maxWidth : 500}}  type={passwordType} onChange={handlePasswordChange} value={passwordInput}  name="password" class="form-control" placeholder="Password" />
        <div class="input-group-text">
            <button id='toggleShow' onClick={togglePassword}>
            { passwordType==="password"? <img src='/eye-slash.svg'/> :<img src='/eye-fill.svg'/> }
            </button>    
        </div>
    </div><br></br>
    <button onClick={(e)=>handleLogin(e)}  type="button" class="btn btn-primary">Login</button><br></br><br></br>
    <p style={{fontSize : 20}}>You don't have an account ? <Link to="/signup" id='link'>Sign Up</Link> </p>
    <p style={{color:"red" , textAlign:"center"}}>{msg}</p>
    <div>
    <input type="file" onChange={onImageChange} className="filetype" />
    <img style={{height : 300 , borderRadius :  "50%" , width : 300}} alt="preview image" src={image}/><br></br><br></br>

  </div>
    </div></center>
  )
}
