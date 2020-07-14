import {
  createNewUserAsync,
  getAllUsersAsync,
  getSingleUserAsync,
  getSingleUserSuccess,
  updateUserDetailsAsync,
  deleteUserAsync,
  filterAllUsersAsync
} from './usersActions';
import { SingleUserModel } from './usersStateModel';

export const usersActionTriggers = {
  createNewUserAsync: (newUser) => createNewUserAsync(newUser),
  getAllUsersAsync: () => getAllUsersAsync(),
  getSingleUserAsync: (userId: string) => getSingleUserAsync(userId),
  getSingleUserSuccess: (singleUser: SingleUserModel) => getSingleUserSuccess(singleUser),
  updateUserDetailsAsync: (url: string, updateObj: {}) => updateUserDetailsAsync(url, updateObj),
  deleteUserAsync: (userId: string) => deleteUserAsync(userId),
  filterAllUsersAsync: (searchTerm: string) => filterAllUsersAsync(searchTerm)
}