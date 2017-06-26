import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/es';
import App from './App';
import store from './store';
import router from './router';
import './utils/filters';

// Global components
import Gravatar from './components/Gravatar';
import MarkdownEditor from './components/UI/MarkdownEditor';
import CodeEditor from './components/UI/CodeEditor';
import ResourceList from './components/UI/ResourceList';
import ResponsiveVideo from './components/UI/ResponsiveVideo';
import ResourceImage from './components/UI/ResourceImage';
import UserPopover from './components/UI/UserPopover';

Vue.component('gravatar', Gravatar);
Vue.component('markdown-editor', MarkdownEditor);
Vue.component('code-editor', CodeEditor);
Vue.component('resource-list', ResourceList);
Vue.component('responsive-video', ResponsiveVideo);
Vue.component('resource-image', ResourceImage);
Vue.component('user-popover', UserPopover);

// Plugins
Vue.use(ElementUI, { locale });
Vue.use(VueAxios, axios);

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
