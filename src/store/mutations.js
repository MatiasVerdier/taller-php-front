import Vue from 'vue';
import * as types from './mutation-types';

const mutations = {
  [types.LOGIN](state) {
    Vue.set(state, 'loading', true);
  },
  [types.LOGIN_SUCCESS](state) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'isAuthenticated', true);
  },
  [types.LOGOUT](state) {
    Vue.set(state, 'isAuthenticated', false);
    Vue.set(state, 'currentUser', null);
  },
  [types.LOGIN_FAILURE](state, { data }) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'loginError', data);
  },
  [types.GET_USER](state) {
    Vue.set(state, 'loading', true);
  },
  [types.GET_USER_SUCCESS](state, { user }) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'currentUser', user);
  },

  [types.ADD_RESOURCE](state) {
    Vue.set(state, 'loading', true);
  },

  [types.ADD_RESOURCE_SUCCESS](state, resource) {
    state.resources.push(resource);
    Vue.set(state, 'loading', false);
  },

  [types.ADD_RESOURCE_FAILURE](state, { data }) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'resourceError', data);
  },

  [types.GET_RESOURCES](state) {
    Vue.set(state, 'loading', true);
  },

  [types.GET_RESOURCES_SUCCESS](state, resources) {
    Vue.set(state, 'resources', resources);
    Vue.set(state, 'loading', false);
  },

  [types.GET_RESOURCES_FAILURE](state, error) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'error', error);
  },

  [types.GET_MY_RESOURCES](state) {
    Vue.set(state, 'loading', true);
  },

  [types.GET_MY_RESOURCES_SUCCESS](state, resources) {
    Vue.set(state, 'myResources', resources);
    Vue.set(state, 'loading', false);
  },

  [types.GET_MY_RESOURCES_FAILURE](state, error) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'error', error);
  },

  [types.GET_RESOURCE](state) {
    Vue.set(state, 'loading', true);
  },

  [types.GET_RESOURCE_SUCCESS](state, resource) {
    Vue.set(state, 'currentResource', resource);
    Vue.set(state, 'loading', false);
  },

  [types.GET_RESOURCE_FAILURE](state, error) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'error', error);
  },

  [types.UNAUTHENTICATED](state) {
    Vue.set(state, 'isAuthenticated', false);
    Vue.set(state, 'currentUser', null);
  },

  [types.GET_LINK_METADATA](state) {
    Vue.set(state, 'loading', true);
  },

  [types.GET_LINK_METADATA_SUCCESS](state, data) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'metadata', data);
  },

  [types.GET_LINK_METADATA_FAILURE](state, error) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'error', error);
  },

  [types.UPDATE_RESOURCE_METADATA](state, payload) {
    Vue.set(state, 'currentResource', payload);
  },

  [types.GET_USER_PROFILE](state) {
    Vue.set(state, 'loading', true);
  },

  [types.GET_USER_PROFILE_SUCCESS](state, payload) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'currentUserProfile', payload);
  },

  [types.GET_USER_PROFILE_FAILURE](state, error) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'error', error);
  },

  [types.GET_USER_PUBLIC_INFO](state) {
    Vue.set(state, 'lookingUserInfo', {});
    Vue.set(state, 'loading', true);
  },

  [types.GET_USER_PUBLIC_INFO_SUCCESS](state, payload) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'lookingUserInfo', payload);
  },

  [types.GET_USER_PUBLIC_INFO_FAILURE](state, error) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'error', error);
  },

  [types.FOLLOWING_CHANGE](state) {
    Vue.set(state, 'loading', true);
  },

  [types.FOLLOWING_CHANGE_SUCCESS](state, payload) {
    Vue.set(state, 'loading', false);
    Vue.set(state.currentUser, 'following', payload);
  },

  [types.FOLLOWING_CHANGE_FAILURE](state, error) {
    Vue.set(state, 'loading', false);
    Vue.set(state, 'error', error);
  },
};

export default mutations;
