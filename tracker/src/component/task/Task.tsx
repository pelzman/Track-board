import React from 'react'
import { FaTimes } from "react-icons/fa"

interface Props {
  task: {
    id: string
    text: string
    day: string
    reminder: boolean
  }

  onDelete: (id: string) => void
  onToggle: (id: string) => void



}

const Task: React.FC<Props> = ({ task, onDelete }) => {
  console.log("taskprps", task)
  return (
  
      <div className={`task  ${task.reminder ? "reminder" : "task "} w-full`} >
        <div className=''>
          <h3>
            {task.text}

            <FaTimes style={{ color: "red", cursor: "pointer" }}


              onClick={() => onDelete(task.id)} />
          </h3>
          <p>
            {task.day}
          </p>
        </div>

      </div>
      
  
  )
}

export default Task