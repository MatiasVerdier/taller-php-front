import Home from './components/Home';
import Explore from './components/Explore';
import Authenticate from './components/Authenticate';
import Dashboard from './components/dashboard/Dashboard';
import ResourceList from './components/dashboard/resources/ResourceList';
import ResourceCreate from './components/dashboard/resources/ResourceCreate';
import ResourceShow from './components/dashboard/resources/ResourceShow';

const routes = [
  { path: '/', name: 'home', component: Home, meta: { onlyGuest: true } },
  { path: '/explore', name: 'explore', component: Explore },
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
        path: 'resources', name: 'resource-list', component: ResourceList,
      },
      {
        path: 'create/:type', component: ResourceCreate,
      },
      {
        path: 'show/:id', name: 'show', component: ResourceShow, props: true,
      },
    ],
  },
];

export default routes;
