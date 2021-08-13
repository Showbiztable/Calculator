import "./Button.css"
import React from "react"

const Button = (props) => {
    let classes = "button "
    classes += props.operation ? "operation" : ""
    classes += props.double ? "double" : ""
    classes += props.triple ? "triple" : ""

    return (
        <button className={classes} onClick={e => props.click(props.label)}>{props.label}</button>
    )
}

export default Button