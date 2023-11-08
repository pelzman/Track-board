import Header from "../component/header/Header"
import Task from "../component/task/Tasks"
import axios from '../api/httpservice'
import { useState, useEffect } from 'react'
import AddTask from "../component/addTask/AddTask"
import Footer from "../component/footer/Footer"

export interface TaskProp {
    id: string
    text: string
    day: string
    reminder: boolean
}

const Home = () => {

    const [tasks, setTasks] = useState<TaskProp[]>([])

    const onLogout = () => {
        localStorage.clear()
    }
    //fetching data from backend
    useEffect(() => {
        try {
            const getTask = async () => {
                const res = await axios.get("/tasks")

                setTasks(res.data.allTasks)
                localStorage.setItem("taskid", JSON.stringify(res.data.allTasks.id))
            }
            getTask()

        } catch (error) {
            console.log(error)
        }

    }, [])

    const fetchTask = async (id: string) => {
        const res = await axios(`/tasks/${id}`)
        const data = res.data
        console.log("single", data)
        return data
    }
    //Add Task
    const [showAddTask, setAddTask] = useState(false)

    const addTask = async (task: { text: string; day: string; reminder: boolean }) => {
        try {
            const newTask: TaskProp = {
                id: "",
                text: task.text,
                day: task.day,
                reminder: task.reminder,
            };

            // Update the state with the new task
            setTasks([newTask, ...tasks]);

            await axios.post("/tasks", newTask)
            setTasks([newTask, ...tasks])
            // Check if the POST request was successful (status code 201 typically indicates "Created")

        } catch (error) {
            console.log(error)
        }


    }


    const deleteTask = (id: string) => {

        setTasks(() => tasks.filter((task) => task.id !== id))

        axios.delete(`tasks/${id}`)
    }


    const onToggle = async (id: string) => {
        try {
            const toggleFromServer = await fetchTask(id);
            console.log("arasco", toggleFromServer)

            const updated = { ...toggleFromServer, reminder: !toggleFromServer.reminder };

            // Update the state with the new task data
            setTasks(tasks.map((task) => (task.id === id ? updated : task)));



        } catch (error) {
            console.error("Error updating task:", error);
            // Handle the error, e.g., display an error message to the user
        }
    };

    return (
        <div className="container">
            <Header onAdd={() => setAddTask(!showAddTask)} showTask={showAddTask} onLogout={onLogout} />
            <>
                {!showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                    <Task tasks={tasks} onDelete={deleteTask} onToggle={onToggle} />) :
                    "No Task to show"
                }
                {/* <About/> */}
                <Footer />
            </>





        </div>



    )
}

export default Home