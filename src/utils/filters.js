import Vue from 'vue';

const capitalize = Vue.filter('capitalize', (value) => { // eslint-disable-line
  if (!value) return '';
  const newValue = value.toString().toLowerCase();
  return newValue.charAt(0).toUpperCase() + newValue.slice(1);
});

const upper = Vue.filter('upper', (value) => { // eslint-disable-line
  if (!value) return '';
  return value.toString().toUpperCase();
});
