import React from 'react';


//Styles
import './hero.scss';


interface HeroProps {
  image?: string;
  title?: string;
  message?: string;
}

const Hero = (props: HeroProps) => {
  return (
    <div className="hero">
      <div className="hero-info">
        <span className="title">
          {props.title}
        </span>
        <p>
          {props.message}
        </p>
      </div>
      <img src={props.image} alt="Welcome to Haud Systems"/>
    </div>
  )
}

export default Hero;