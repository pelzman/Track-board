import { Button } from "../button/Buttton"
import { useLocation, Link } from "react-router-dom"
interface HeaderType {
  title?: string
  onAdd: () => void;
  showTask: boolean
  onLogout: () => void

}
const color = {
  backgroundColor: "red"
}
const Header: React.FC<HeaderType> = ({ title, onAdd, showTask, onLogout }) => {


  const location = useLocation()
  return (
    <header className="header">
      {<h1 className="text-[24px] font-bold">{title}</h1>}


      {location.pathname === '/home' && (<Button className={`${showTask ? color : " "}  btn`}
        text={showTask ? "Add" : "Close"}
        backgroundColor={showTask ? "green" : "red"}
        onClick={() => onAdd()} />)}

      <Link to="/"><Button onClick={onLogout} text="Logout" className="bg-red-500 text-white" /></Link>
    </header>




  )
}
Header.defaultProps = {
  title: "Task Tracker"

}


export default Header