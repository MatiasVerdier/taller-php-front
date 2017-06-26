export const isAuthenticated = state => state.isAuthenticated;

export const currentUser = state => state.currentUser;
export const currentUserFollowing = (state) => { // eslint-disable-line
  return state.currentUser.following ? state.currentUser.following.map(item => item.id) : [];
};

export const resources = state => state.resources;

export const myResources = state => state.myResources;

export const currentResource = state => state.currentResource;

export const isLoading = state => state.loading;

export const loginError = state => state.loginError;

export const lookingUser = state => state.lookingUserInfo;
