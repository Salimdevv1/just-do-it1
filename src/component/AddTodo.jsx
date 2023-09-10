import React, { useState } from 'react'
import { AddTodo } from '../Redux/Actions'
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export default function Add() {
    const dispatch=useDispatch()
    const [newTodo , setNewTodo]=useState({

    }) ; 
    const [description ,setDescription]=useState("") ; 
    var input =  document.getElementById('inputPassword5');
    var inputdate= document.getElementById('input-date')

    const handleSubmit=(event)=>{
        event.preventDefault();
        JSON.stringify(newTodo) === '{}' ? alert('Test') : dispatch(AddTodo(newTodo))  
        console.log(x)
        input.value = ""
        inputdate.value = ""
  }
  return (
    <div style={{marginTop : "1.5rem" , display :"flex", justifyContent:"center" , maxWidth : 1200}}>
        <div style={{display :"flex" , alignItems:"center" , justifyContent:"center" }} id='salim'>
      <Form.Control
        type="text"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        placeholder='Enter your new Todo'
        onChange={(e)=>setNewTodo({id:Date.now() , description:e.target.value , checked:false})} 
        style={{width :300 , marginRight : "1rem"}}/>
            <Form.Control
        type="date"
        id="input-date"
        aria-describedby="passwordHelpBlock"
        onChange={(e)=>setNewTodo((prev)=>{return {...prev , date:e.target.value}})}
        style={{width :300 , marginRight : "1rem"}}/>
      <Button variant="primary"   onClick={(event)=>handleSubmit(event)}><img src='/plus.svg'style={{marginRight : "0.1rem" , marginTop :"-1px" , width : "22px"}} />Add</Button>
</div>  
    </div>
  )
}

