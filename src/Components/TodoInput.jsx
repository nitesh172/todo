import React, { useState } from 'react';
import axios from 'axios'

function TodoInput({checkPost}) {
    const [input1,setInput1]=useState("");
    const [input2,setInput2]=useState("");
    const clearText=()=>{
        setInput1("")
        setInput2("")
    }
    const addTodo=(input1,input2)=>{
        //console.log(input1,input2);
        const data={
            name:input1,
            des:input2,
            id:Date.now()+Math.floor(Math.random()*1000),
            status:false
        }
        if(input1=="" && input2==""){
            clearText()
        }else{
        axios.post("https://still-fortress-28637.herokuapp.com/tasks", data)
        checkPost()
          }
        // let newTask=[...tasks,data]
        // console.log(newTask);
        // setTasks(newTask)
    }

  return (
  <div>
      <input type="text" placeholder='Name' value={input1} onChange={(e)=>setInput1(e.target.value)} />
      <input type="text" placeholder='Description' className='des' value={input2} onChange={(e)=>setInput2(e.target.value)} />
      <button className='btn' onClick={()=>{addTodo(input1,input2) 
       clearText()}}>Add</button>
  </div>
  ) 
}

export default TodoInput;
