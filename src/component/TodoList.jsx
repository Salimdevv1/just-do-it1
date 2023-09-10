import React,{useState} from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { RemoveTodo , CheckTodo, UpdateTodo } from '../Redux/Actions'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function TodoList() {
    const dispatch=useDispatch()
    const todos=useSelector((state)=>state) ; 
    const [show,setShow]=useState({show:false , indx:-1})
    const [newTodo , setNewTodo] = useState("")
    
  return (
    <div style={{marginTop : "1.5rem" , maxWidth : 1200}}> 
        {todos.map(e=>(
            <center><div id='container' key={e.id} >
                <div>
                  <p  id='todo-name' style={{textDecoration:e.checked?"line-through" : "none" , margin:"2rem"}}>{e.description}</p>
                  <p id='todo-date'>{e.date}</p>
                </div>
                <Button variant="danger" class='btn-choice' onClick={()=>dispatch(RemoveTodo(e.id))}><img src='/delete.svg' style={{marginRight : "0.4rem" , marginTop :"-1px"}}/>Delete</Button>
                <Button variant='success'  class='btn-choice' onClick={()=>dispatch(CheckTodo(e.id))}><img src='/check.svg' style={{marginRight : "0.4rem" , marginTop :"-1px" , width : "22px"}} />Check</Button>
                <Button variant='info' class='btn-choice' onClick={()=>{ setShow(prev=>{return{show:!prev.show , indx:e.id}}) }}><img src='/update.png' style={{width : "22px" , marginRight : "0.4rem" , marginTop :"-1px"}}/>Update</Button>
                {show.show&&show.indx==e.id ? 
                <form onSubmit={(ev)=>{ev.preventDefault() ; dispatch(UpdateTodo({id:e.id , description:newTodo}))}}>
                  {/* <input class="updatetodo"  onChange={(e)=>setNewTodo(e.target.value)} placeholder='update todo'  type='text'/> */}
                  <Form.Control type="text" id="inputPassword5" aria-describedby="passwordHelpBlock" placeholder='Update your Todo' onChange={(e)=>setNewTodo(e.target.value)}/>
                  </form  > : <></>}

              </div></center>
        ))}
        <div style={{display :"flex" , justifyContent :"center"} }>  
          <p>You Have  {todos.reduce((total , el)=>1+total, 0)} task to do </p>
          
        </div>
        
    </div>
  )
}
