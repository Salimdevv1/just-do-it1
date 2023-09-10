import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function Home({user , setAuth,auth , darkMode , setDarkMode}) {
    const [newTodo , setNewTodo]=useState({
        userId:user.id,
        checked: false,
        
    })

    const days = new Date();
    const day = days.getDay();
    const dayNames = ["Sunday" , "Monday", "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
    const [getDay , setGetDay] = useState('')
    const getday= ()=> {
        setGetDay(dayNames[day])
    }
    
    

    const [msg , setMsg]=useState('')
    const handleChange=(e)=>{
      
        setNewTodo(prev=>{return{...prev , [e.target.name]: e.target.value}})
        setNewTodo(prev =>{return {...prev , id:Date.now()}})
    }
    const AddTodo=(e)=>{
        alert('Todo Added Successfully')
        e.preventDefault();
        document.getElementById('inputField').value = ""
        axios.post("http://localhost:3000/todos" , newTodo).then(res=>setMsg('Task Added')).catch(err=>console.log(err))
        setMsg("test")
    } 
    const [todoId , setTodoId] = useState(0)
    const [check , setCheck] = useState(false)
    const checkTodo=(e)=>{
        setCheck(!check);
        setTodoId(e.id);
        axios.put(`http://localhost:3000/todos/${e.id}`,{...e , checked:check})
    }
    
    const deleteTodo =(id) => {
        axios.delete(`http://localhost:3000/todos/${id}`);
        setMsg("task deleted")
    }
    const [userImage , setUserImage] = useState([])
    const navigate=useNavigate();
    // const [logout , setLogout]=useState(true);
    const [todos,setTodos]=useState([])
    useEffect(()=>{
        !auth ? navigate    ('/'):null; 
    },[auth]) ; 
    useEffect(
        ()=>{
            axios.get("http://localhost:3000/todos").then(res=>setTodos(res.data.filter(e=>e.userId===user.id))).catch(err=>console.log(err))
            axios.get('http://localhost:3000/users').then(res=>setUserImage(res.data.filter(e=>e.id===user.id))).catch(err=>console.log(err))
            getday()
        },[msg , check],
        
)
console.log(auth)
const handleLogout = ()=> {
    axios.put("http://localhost:3000/usersession/0" ,      {
        id : 0,
        auth : false
      })
      setAuth(false)
}

  return (
    <center><div style={{maxWidth : 1920 ,  }} className='container'>
        <h1 id='demo' style={{fontSize : 80}}>Just Do It.</h1>
       <br></br>
       {userImage?.map(e=>(
        <>
        <img src={e.image} style={{width : 250 , borderRadius : 100}}/><br></br><br></br>
        <h2>Hey {e.username}  it's {getDay}</h2><br></br>
        <p>{getDay}</p>
        </>
       ))}
       <form >
        <div style={{display:"flex" , alignItems:"center" , maxWidth: 1920 ,minWidth : 300 , justifyContent:"space-around"}}>
        <input  class="form-control" type="text" name='content' placeholder="Add a task" onChange={(e)=>handleChange(e)} id='inputField' />
        <input class="form-control" style={{marginLeft :"1rem"}} type="date" name='date' placeholder="Add Your New Todo" onChange={(e)=>handleChange(e)}  id='inputField'/>
        <button type="button" class="btn btn-primary" onClick={(ev)=>AddTodo(ev)} style={{marginLeft :"1rem" , minWidth : 100}}>I Got This</button>
        </div><br></br>
        <div style={{display :"flex" , alignItems:"center" , justifyContent:"center"}}>
        </div>
       </form><br></br>
       <h2>Your Tasks</h2><br></br>
       <div>
        {todos?.map(e=>(    
            <div className='container' id='task-container'>
                <div id='tasks-container'>
                <p style={{textDecoration:e.checked?"line-through":null}} id='salimdev'>{e.content}</p>
                <p style={{textDecoration:e.checked?"line-through":null}} >{e.date}</p>
                </div>
                <div id='div-btn'>
                    <button id="btn" onClick={()=>deleteTodo(e.id)}><img src="/trash-fill.svg" alt="" style={{width : 30}} /></button>
                    <button id="btn" onClick={()=>checkTodo(e)}><img src="/check-lg.svg" alt="" style={{width : 30}}  /></button>
                </div>
            </div>
        ))}

        </div> <br></br>
        <p>{todos.length==0?(<p style={{fontSize : 20, color :"green"}}>You don't have any task todo you can relax</p>): null}</p>
        <p>{todos.length>=1?(<span style={{fontSize : 25 , color :"red"}}>You have  {todos.reduce((total , el)=>1+total, 0)} Task To do  </span>): null} </p>
        <button onClick={()=>handleLogout()} type="button" class="btn btn-danger">Logout</button>
    </div></center>
  )

}
