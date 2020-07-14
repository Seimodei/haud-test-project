import React from 'react';

//Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

//Styles
import './iconButton.scss';


interface IconButtonProps {
  icon?: IconDefinition;
  onClick?: () => void;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <div className="icon-button" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
    </div>
  )
}

export default IconButton;