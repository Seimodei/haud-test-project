import * as actionTypes from './notificationActionTypes';
import { AlertNotificationModel } from './notificationStateModel';



//Defaults
export const setAlertNotification = (alertNotification: AlertNotificationModel) => {
  return {
    type: actionTypes.SET_ALERT_NOTIFICATION,
    payload: alertNotification
  }
}


//Triggers
export const alertNotification = (alertNotification: AlertNotificationModel) => {
  return dispatch => {
    const alertObj: AlertNotificationModel = {
      status: false,
      message: '',
      type: ''
    }

    dispatch(setAlertNotification(alertNotification));

    setTimeout(() => {
      dispatch(setAlertNotification(alertObj));
    }, 5000);
  }
}


//Bundle and export all todo actions
export const notificationActionTriggers = {
  setAlertNotification: (alert: AlertNotificationModel) => setAlertNotification(alert),
  alertNotification: (alert: AlertNotificationModel) => alertNotification(alert)
};