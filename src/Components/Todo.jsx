import axios from 'axios';
import React from 'react';
import './Todo.css'
import TodoInput from './TodoInput';
// import TodoList from './TodoList';

function Todo() {
  const [tasks,setTasks]=React.useState([])
  const [isLoading,setisLoading]=React.useState(true)
  const [isError,setisError]=React.useState(false)
  const [checkAdd,setcheckAdd]=React.useState(false)
  const [page,setpage]=React.useState(0)

  const checkPost=()=>{
    setcheckAdd(!checkAdd)
  }
  const gettodo=()=>{
    setisLoading(true)
    axios
      .get(
        `https://still-fortress-28637.herokuapp.com/tasks?_page=${page}&_limit=3`
      )
      .then((json) => setTasks(json.data))
    setisLoading(false)
  }
  React.useEffect( () => {
    gettodo()
},[checkAdd, page])

  return isLoading ?(<div>...Loading</div>) :isError ?(<div>Something went wrong</div>): (
  <div className='TodoApp'>
      <h1>Todo Application</h1>
      <TodoInput checkPost={checkPost}/>
      <div className="container">
        {
          tasks.map((item)=>{
            return (
              <div className='todolist' key={item.id}>
              <span>Name:{item.name}</span>
              <br />
              <span className='dist'>Description:{item.des}</span>
              <hr />
              </div>
            )
          })
        }
        <button className='prev' disabled={ page===1?true:false} onClick={()=>setpage(page-1)}>Prev</button>
        <button className='next' disabled={ tasks.length===0?true:false} onClick={()=>setpage(page+1)}>Next</button>
      </div>

  </div>
  ) 
}

export default Todo;
