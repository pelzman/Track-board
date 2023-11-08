import { useState } from 'react'
import Input from '../input/Input';

export interface AddProps {

  onAdd: (task: { text: string, day: string, reminder: boolean }) => void
}

const AddTask: React.FC<AddProps> = ({ onAdd }) => {
  const [text, setText] = useState("")
  const [day, setDay] = useState("")
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onAdd({ text, day, reminder })

    //clear field after submission
    setText("")
    setDay("")
    setReminder(false)
  }

  return (
    <>

      <form role="form" className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Task</label>

          <Input type="text"
            placeholder="Add Task"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
        </div>
        <div className='form-control'>
          <label htmlFor='task'>Day & Time</label>

          <Input  type="text" placeholder="Add Time and Day"
            value={day}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDay(e.target.value)}
          />
        </div>
        <div className='form-control form-control-check'>
          <label>Set Reminder</label>

          <Input type="checkBox" value={reminder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReminder(e.currentTarget.checked)}
            checked={reminder}
          />
        </div>
        <Input type="submit" value="save Task" className='btn btn-block' />

      </form>


    </>
  )
}

export default AddTask;