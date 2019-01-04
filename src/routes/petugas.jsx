// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Po from 'views/SuperAdmin/Po/PoList';
import Tiket from 'views/Petugas/Tiket/Tiket';

const dashboardRoutes = [
  {
    path: '/petugas/dashboard',
    sidebarName: 'Po',
    navbarName: 'Po',
    icon: Dashboard,
    component: Po
  },
  {
    path: '/petugas/tiket',
    sidebarName: 'Tiket',
    navbarName: 'Tiket',
    icon: Dashboard,
    component: Tiket
  },
  {
    redirect: true,
    path: '/petugas',
    to: '/petugas/dashboard',
    navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
