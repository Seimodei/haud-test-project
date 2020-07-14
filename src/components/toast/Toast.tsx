import React from 'react';

//Redux
import { StateModel, actions } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';

//Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

//Styles
import './toast.scss';


interface ToastProps {
  
}

const Toast = (props: ToastProps) => {
  const dispatch = useDispatch();

  //Selectors
  const notification = useSelector((state: StateModel) => state.notificationState.alertNotification);

  const closeNotification = () => {
    dispatch(actions.notifications.setAlertNotification({ status: false, message: '', type: '' }));
  }

  return (
    <>
      {notification.status ?
        <div className={`notification ${notification.type === 'error' ? 'err' : ''}`}>
          <div className="content">
            <div className="info">
              <span className="title">{notification.message}</span>
            </div>
            <div className="close">
              <FontAwesomeIcon icon={faTimes} onClick={closeNotification} />
            </div>
          </div>
        </div> : null
      }
    </>
  )
}

export default Toast;