import React, { useState, useEffect } from 'react';

//Components
import RotatingBoxesLoader from 'react-loaders-kit/lib/rotatingBoxes/RotatingBoxesLoader';

//Styles
import './fullScreenLoader.scss';
import Color from '../../styles/variables.scss';


interface FullScreenLoaderProps {
  message?: string;
}


const FullScreenLoader = (props: FullScreenLoaderProps) => {
  const [exit, setExit] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setExit('exit');
    }, 5000);
  }, []);

  return (
    <div className={`full-screen-loader ${exit}`}>
      <RotatingBoxesLoader 
        loading={true} 
        colors={["#fff","#fff",Color.primary,Color.primary]} 
        size={35}
      />
      <div className="message">
        {props.message}
      </div>
    </div>
  )
}

export default FullScreenLoader;