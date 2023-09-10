import { ADD_TODO, REMOVE_TODO ,UPDATE_TODO , CHECK_TODO  } from "./ActionTypes";

export const AddTodo=(payload)=>{
  return {
    type :ADD_TODO ,
    payload : payload
  }
}
export const RemoveTodo=(payload)=>{
  return {
    type :REMOVE_TODO ,
    payload : payload
  }
}
export const UpdateTodo=(payload)=>{
  return {
    type :UPDATE_TODO ,
    payload : payload
  }
}
export const CheckTodo=(payload)=>{
  return {
    type :CHECK_TODO ,
    payload : payload
  }
}
// export const ChangeDate=(payload)=>{
//   return {
//     type : CHANGE_DATE ,
//     payload : payload
//   }
// }