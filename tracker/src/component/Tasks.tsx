import Task from "./Task"

// interface Props{
//  tasks:{
//     id:number
//     text:string
//     day : string
//     remainder: boolean
//  } []
  


// }
interface TaskProps {
  id: number;
  text: string;
  day: string;
  reminder: boolean;
 
}

interface Props {
  tasks: TaskProps[];
  onDelete: (id: number) => void; // Define the type for onDelete
  onToggle: (id: number) => void; 
 
}


const Tasks:React.FC<Props> = ({tasks, onDelete, onToggle}) => {
  
  return (
    <>
    { tasks.map((task)=>(
    <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>))}
    
    </>
  )
}

export default Tasks