export const isAuthenticated = state => state.isAuthenticated;

export const currentUser = state => state.currentUser;
export const currentUserFollowing = (state) => { // eslint-disable-line
  const user = state.currentUser;
  return user && user.following ? user.following.map(item => item.id) : [];
};

export const resources = state => state.resources;

export const myResources = state => state.myResources
  .filter(item => state.currentUser && state.currentUser.id === item.owner.id);

export const sharedWithMe = state => state.myResources
  .filter(item => state.currentUser && state.currentUser.id !== item.owner.id);

export const currentResource = state => state.currentResource;
export const currentEditingResource = state => Object.assign({}, state.currentResource);

export const isLoading = state => state.loading;

export const loginError = state => state.loginError;

export const lookingUser = state => state.lookingUserInfo;

export const currentError = state => state.error;
