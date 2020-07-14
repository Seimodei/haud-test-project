import React from 'react';

//Styles
import './input.scss';
import SearchImage from '../../assets/search.svg';


interface InputProps {
  isIcon?: boolean;
  error?: boolean;
  inputValue?: string | number;
  inputPlaceHolder?: string;
  inputOnChange?: (e) => void;
  inputOnFocus?: () => void;
}


const Input = (props: InputProps) => {
  const { 
    isIcon, 
    inputValue, 
    inputPlaceHolder, 
    inputOnChange,
    inputOnFocus,
    error 
  } = props;


  return (
    <div className={`input ${isIcon ? '' : 'isNotIcon'} ${error ? 'error' : ''}`}>
      <div className="icon">
        <img src={SearchImage} alt="Search Haud Systems database"/>
      </div>
      <input 
        type='text'
        placeholder={inputPlaceHolder} 
        value={inputValue}
        onChange={inputOnChange}
        onFocus={inputOnFocus}
      />
    </div>
  )
}

export default Input;