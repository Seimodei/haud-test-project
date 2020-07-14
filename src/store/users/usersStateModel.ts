export interface SingleUserModel {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  town?: string;
  region?: string;
  country?: string;
  postCode?: string;
  contactNumber?: string;
  userId?: string;
  dateCreated?: string;
}

export interface UsersStateModel {
  allUsers?: SingleUserModel[];
  filteredUsers?: SingleUserModel[];
  allUsersError?: boolean;
  singleUser?: SingleUserModel;
  singleUserError?: boolean;
  loadingAllUsers?: boolean;
  loadingSingleUser?: boolean;
  addingNewUser?: boolean;
  updatingUser?: boolean;
  deletingUser?: boolean;
  userAdded?: boolean;
  userUpdated?: boolean;
  userDeleted?: boolean;
}