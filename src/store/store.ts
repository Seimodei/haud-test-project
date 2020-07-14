import { combineReducers } from 'redux';

import usersReducer from './users/usersReducers';
import notificationReducer from './notifications/notificationReducers'; 

import { usersActionTriggers } from './users';
import { notificationActionTriggers } from './notifications/notificationActions';

import { UsersStateModel } from './users/usersStateModel';
import { NotificationStateModel } from './notifications/notificationStateModel';


export const reducers = combineReducers({
  usersState: usersReducer,
  notificationState: notificationReducer
});

export const actions = {
  users: {
    ...usersActionTriggers
  },
  notifications: {
    ...notificationActionTriggers
  }
};

export interface StateModel {
  usersState: UsersStateModel,
  notificationState: NotificationStateModel
};
