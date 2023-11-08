import React from 'react'

export interface ButtonType {
    text?: string
    className?: string
    onClick?: () => void
    color?: string
    backgroundColor?: string

}
const buttonStyle = {
    padding: "30px 60px",
    borderRadius: "10px ",
    cursor: "pointer",
    border: "none",

}
export const Button: React.FC<ButtonType> = ({ text, onClick, color, backgroundColor, ...className }) => {
    return <button style={{
        ...buttonStyle,
        padding: "10px 16px",
        backgroundColor,
        color
    }}
        {...className} onClick={onClick} >{text}
    </button>

}
Button.defaultProps = {
    text: "Click Me"
}




// eslint-disable-next-line react-refresh/only-export-components
export const Button_medium: React.FC<ButtonType> = ({ text, onClick, ...className }) => {
    return <button style={{
        ...buttonStyle,
    }}
        {...className}
        onClick={onClick} >{text}</button>

}
Button_medium.defaultProps = {
    text: "Click Me"

}


// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-unused-vars
export const Button_Large: React.FC<ButtonType> = ({ text, onClick, color, ...className }) => {
    return <button style={{
        ...buttonStyle,
        padding: "30px 100px",

    }} {...className} onClick={onClick}>{text}</button>

}
Button_Large.defaultProps = {
    text: "Click Me"
}

