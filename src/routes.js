import Home from './components/Home';
import Explore from './components/Explore';
import Authenticate from './components/Authenticate';
import Dashboard from './components/dashboard/Dashboard';
import MyResources from './components/dashboard/resources/MyResources';
import ResourceCreate from './components/dashboard/resources/ResourceCreate';
import ResourceShow from './components/dashboard/resources/ResourceShow';
import Profile from './components/Profile';

const routes = [
  { path: '/', name: 'home', component: Home, meta: { onlyGuest: true } },
  { path: '/login', name: 'login', component: Authenticate, meta: { onlyGuest: true } },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    redirect: '/dashboard/resources',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: 'resources', name: 'my-resources', component: MyResources,
      },
      {
        path: 'create/:type', component: ResourceCreate,
      },
      {
        path: 'show/:id', name: 'show', component: ResourceShow, props: true,
      },
      {
        path: 'edit/:id', name: 'edit', component: ResourceShow, props: true,
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile,
      },
      { path: '/explore', name: 'explore', component: Explore },
    ],
  },
];

export default routes;
