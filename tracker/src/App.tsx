import Header from "./component/Header"
import Task from "./component/Tasks"
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import AddTask from "./component/AddTask"
import Footer from "./component/Footer"

import About from "./component/About"
interface TaskProp {
  id: number
  text: string
  day: string
  reminder: boolean
}

function App() {
  const [tasks, setTasks] = useState<TaskProp[]>([])
  //fetching data from backend
  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTask()
  }, [])

  //get All Task
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()

    return data
  }
  //get single Task
  const fetchTask = async (id: number) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }
  //Add Task
  const [showAddTask, setAddTask] = useState(false)
  const addTask = async (task: { text: string, day: string, reminder: boolean }) => {
    //generate id
    // const id = Math.floor(Math.random() * 1000) + 1;
    // console.log("random" , id)
    //       const newTask = { id, ...task };
    //       setTasks([...tasks, newTask]); 
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    console.log(data)
    setTasks([...tasks, data]);
  }
  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })

    setTasks(() => tasks.filter((task) => task.id !== id))
  }

  const onToggle = async (id: number) => {
    const toggleFromServer = await fetchTask(id)
    console.log("toggle", toggleFromServer)
    const upDate = { ...toggleFromServer, reminder: !toggleFromServer.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(upDate)

    })
    const data = await res.json()
    console.log("new", data)

    // console.log(upDate)
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))


  }
  return (
   
   <div className="container">
  <Header onAdd={() => setAddTask(!showAddTask)} showTask={showAddTask} />
        <Routes>
        
          <Route path="/"  element={(
            <>
          
        {showAddTask && <AddTask onAdd={addTask} />}
        { tasks.length >0 ?(
        <Task tasks={tasks} onDelete={deleteTask} onToggle={onToggle} />):
        "No Task to show"
} 
            </>
          )}>
    
          </Route>
        
     
 <Route path="/about" element={<About/>}></Route>

 </Routes>
        <Footer />
        
      </div>
      
   


    

  )
}

export default App


