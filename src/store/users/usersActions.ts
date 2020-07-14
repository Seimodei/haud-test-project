import axios from 'axios';

import * as actionTypes from './usersActionTypes';
import { actions } from '../store';
import { SingleUserModel } from './usersStateModel';

import { mapFirebaseResponseToState } from '../../utilities/utilities';
import history from '../../history';


//Defaults
export const loadingAllUsers = (loadingAllUsers: boolean) => {
  return {
    type: actionTypes.LOADING_ALL_USERS,
    payload: loadingAllUsers
  }
}

export const loadingSingleUser = (loadingSingleUser: boolean) => {
  return {
    type: actionTypes.LOADING_SINGLE_USER,
    payload: loadingSingleUser
  }
}

export const addingNewUser = (addingNewUser: boolean) => {
  return {
    type: actionTypes.ADDING_NEW_USER,
    payload: addingNewUser
  }
}

export const updatingUser = (updatingUser: boolean) => {
  return {
    type: actionTypes.UPDATING_USER,
    payload: updatingUser
  }
}

export const deletingUser = (deletingUser: boolean) => {
  return {
    type: actionTypes.DELETING_USER,
    payload: deletingUser
  }
}


//Success Cases
export const setFilteredUsers = (filteredUsers: SingleUserModel[]) => {
  return {
    type: actionTypes.SET_FILTERED_USERS,
    payload: filteredUsers
  }
}

export const getAllUsersSuccess = (allUsers: SingleUserModel[]) => {
  return {
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    payload: allUsers
  }
}

export const getSingleUserSuccess = (singleUser: SingleUserModel) => {
  return {
    type: actionTypes.GET_SINGLE_USER_SUCCESS,
    payload: singleUser
  }
}

export const addNewUserSuccess = (userAdded: boolean) => {
  return {
    type: actionTypes.ADD_NEW_USER_SUCCESS,
    payload: userAdded
  }
}

export const updateUserSuccess = (userUpdated: boolean) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: userUpdated
  }
}

export const deleteUserSuccess = (userDeleted: boolean) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    payload: userDeleted
  }
}

//Failure Cases
export const getAllUsersFailure = (allUsersError: boolean) => {
  return {
    type: actionTypes.GET_ALL_USERS_FAILURE,
    payload: allUsersError
  }
}

export const getSingleUserFailure = (singleUserError: boolean) => {
  return {
    type: actionTypes.GET_SINGLE_USER_FAILURE,
    payload: singleUserError
  }
}

export const addNewUserFailure = (userAdded: boolean) => {
  return {
    type: actionTypes.ADD_NEW_USER_FAILURE,
    payload: userAdded
  }
}

export const updateUserFailure = (userUpdated: boolean) => {
  return {
    type: actionTypes.UPDATE_USER_FAILURE,
    payload: userUpdated
  }
}

export const deleteUserFailure = (userDeleted: boolean) => {
  return {
    type: actionTypes.DELETE_USER_FAILURE,
    payload: userDeleted
  }
}


//Triggers
//Create a new user
export const createNewUserAsync = (newUser) => {
  return (dispatch) => {
    dispatch(addingNewUser(true));

    axios.post("/users", newUser)
    .then(res => {
      dispatch(addingNewUser(false));
      dispatch(addNewUserSuccess(true));

      dispatch(actions.notifications.alertNotification({
        status: true,
        message: 'User account has been added successfully!!',
        type: 'success'
      }))

      history.push('/');
    })
    .catch(err => {
      dispatch(addingNewUser(false));
      dispatch(addNewUserFailure(true));

      dispatch(actions.notifications.alertNotification({
        status: true,
        message: 'Something went wrong when adding user account. Please try again and if the problem persists, refresh the page',
        type: 'error'
      }))
    })
  }
}

//Get all users
export const getAllUsersAsync = () => {
  return (dispatch) => {
    dispatch(loadingAllUsers(true));

    axios.get('/users')
      .then(res => {
        const resArr = res.data.documents;

        dispatch(loadingAllUsers(false));
        dispatch(getAllUsersSuccess(mapFirebaseResponseToState(resArr)));
        dispatch(setFilteredUsers(mapFirebaseResponseToState(resArr)));
      })
      .catch(err => {
        dispatch(loadingAllUsers(false));
        dispatch(getAllUsersFailure(true));
      })
  }
}

//Get a single user
export const getSingleUserAsync = (userId: string) => {
  return (dispatch) => {
    dispatch(loadingSingleUser(true));

    axios.get(`/users/${userId}`)
      .then(res => {
        const resObj = res.data.fields;

        const newFields = Object.keys(resObj).reduce((acc, val) => {
          acc[val] = resObj[val].stringValue;
          return acc;
        }, {});

        dispatch(loadingSingleUser(false));
        dispatch(getSingleUserSuccess(newFields));
      })
      .catch(err => {
        dispatch(loadingSingleUser(false));
        dispatch(getSingleUserFailure(true));
      })
  }
}

//Update a single user details
export const updateUserDetailsAsync = (url: string, updateObj: {}) => {
  return (dispatch) => {
    dispatch(updatingUser(true));

    axios.patch(url, updateObj)
      .then(res => {
        dispatch(updatingUser(false));
        dispatch(updateUserSuccess(true));
        dispatch(actions.notifications.alertNotification({
          status: true,
          message: 'User account has been updated successfully!!',
          type: 'success'
        }))
        history.push('/');
      })
      .catch(err => {
        dispatch(updatingUser(false));
        dispatch(updateUserFailure(true));

        dispatch(actions.notifications.alertNotification({
          status: true,
          message: 'Something went wrong when updating user account. Please try again and if the problem persists, refresh the page',
          type: 'error'
        }))
      })
  }
}

//Delete a user
export const deleteUserAsync = (userId: string) => {
  return (dispatch) => {
    dispatch(deletingUser(true));

    axios.delete(`/users/${userId}`)
      .then(res => {
        dispatch(deletingUser(false));
        dispatch(deleteUserSuccess(true));
        dispatch(actions.notifications.alertNotification({
          status: true,
          message: 'User account has been deleted successfully!!',
          type: 'success'
        }))
      })
      .catch(err => {
        dispatch(deletingUser(false));
        dispatch(deleteUserFailure(true));
        dispatch(actions.notifications.alertNotification({
          status: true,
          message: 'Something went wrong when deleting user account. Please try again and if the problem persists, refresh the page',
          type: 'error'
        }))
      })
  }
}

//Filter all users
export const filterAllUsersAsync = (searchTerm: string) => {
  return (dispatch, getState) => {
    const { allUsers } = getState().usersState;

    let filteredUsers = allUsers.filter(
      user =>
       (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
     );

    dispatch(setFilteredUsers(filteredUsers));
  }
}