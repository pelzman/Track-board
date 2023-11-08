import React from 'react'

interface InputProps{
    type? : string
    // eslint-disable-next-line
    value?:string | any 
    placeholder?:string
    className?: string
    checked? : boolean
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
    
}

const Input : React.FC<InputProps> = ({type, value, placeholder,onChange,checked, ...className}) => {
  return (
    <input style={inputStyle} type={type} placeholder={placeholder} 
    value={value} {...className} onChange={onChange} checked={checked} required/>  
  )
}
Input.defaultProps ={
placeholder:"placeholder here"
}
export default Input
const inputStyle ={
    // padding : "20px 60px",
    border : "1px solid ",
    borderRadius:"10px",
    outline:"none"
}