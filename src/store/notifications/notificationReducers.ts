import * as actionTypes from './notificationActionTypes';
import { mergeUpdateObj } from '../../utilities/utilities';
import { NotificationStateModel } from './notificationStateModel';


export const initialProfileState: NotificationStateModel = {
  alertNotification: {
    status: false,
    message: '',
    type: ''
  }
};


const notificationReducer = (state: NotificationStateModel = initialProfileState, action) => {
  switch(action.type) {
    case actionTypes.SET_ALERT_NOTIFICATION:
      return mergeUpdateObj(state, { alertNotification: action.payload });
  }

  return state;
}

export default notificationReducer;