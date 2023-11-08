
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
  id: string;
  text: string;
  day: string;
  reminder: boolean;

}

export interface Props {
  tasks: TaskProps[];
  onDelete: (id: string) => void; // Define the type for onDelete
  onToggle: (id: string) => void;


}


const Tasks: React.FC<Props> = ({ tasks, onDelete, onToggle }) => {

  return (
    <>
    <ul role="task">
    {tasks.map((task) => (

<Task   key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />))

}
    </ul>
     


    </>
  )
}

export default Tasks