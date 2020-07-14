import * as actionTypes from './usersActionTypes';
import { mergeUpdateObj } from '../../utilities/utilities';
import { UsersStateModel } from './usersStateModel';


export const initialAuthState: UsersStateModel = {};


const usersReducer = (state: UsersStateModel = initialAuthState, action) => {
  switch(action.type) {
    case actionTypes.GET_ALL_USERS_SUCCESS:
      return mergeUpdateObj(state, { allUsers: action.payload });
    case actionTypes.GET_ALL_USERS_FAILURE:
      return mergeUpdateObj(state, { allUsers: action.payload });
    case actionTypes.GET_SINGLE_USER_SUCCESS:
      return mergeUpdateObj(state, { singleUser: action.payload });
    case actionTypes.GET_SINGLE_USER_FAILURE:
      return mergeUpdateObj(state, { singleUser: action.payload });
    case actionTypes.ADD_NEW_USER_SUCCESS:
      return mergeUpdateObj(state, { userAdded: action.payload });
    case actionTypes.ADD_NEW_USER_FAILURE:
      return mergeUpdateObj(state, { userAdded: action.payload });
    case actionTypes.UPDATE_USER_SUCCESS:
      return mergeUpdateObj(state, { userUpdated: action.payload });
    case actionTypes.UPDATE_USER_FAILURE:
      return mergeUpdateObj(state, { userUpdated: action.payload });
    case actionTypes.DELETE_USER_SUCCESS:
      return mergeUpdateObj(state, { userDeleted: action.payload });
    case actionTypes.DELETE_USER_FAILURE:
      return mergeUpdateObj(state, { userDeleted: action.payload });
    case actionTypes.LOADING_ALL_USERS:
      return mergeUpdateObj(state, { loadingAllUsers: action.payload });
    case actionTypes.LOADING_SINGLE_USER:
      return mergeUpdateObj(state, { loadingSingleUser: action.payload });
    case actionTypes.ADDING_NEW_USER:
      return mergeUpdateObj(state, { addingNewUser: action.payload });
    case actionTypes.UPDATING_USER:
      return mergeUpdateObj(state, { updatingUser: action.payload });
    case actionTypes.DELETING_USER:
      return mergeUpdateObj(state, { deletingUser: action.payload });
    case actionTypes.SET_FILTERED_USERS:
      return mergeUpdateObj(state, { filteredUsers: action.payload });
  }

  return state;
}

export default usersReducer;