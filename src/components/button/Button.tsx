import React from 'react';

//Styles
import './button.scss';


interface ButtonProps {
  text?: string;
  type?: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <div className={`button ${props.type}`} onClick={props.onClick}>
      <span>{props.text}</span>
    </div>
  )
}

export default Button;