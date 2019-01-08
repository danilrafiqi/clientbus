// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// import ContentPaste from "@material-ui/icons/ContentPaste";

// core components/views
import DashboardPage from 'views/ManagerPo/Dashboard.jsx';

const dashboardRoutes = [
  {
    path: '/manager-po/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    redirect: true,
    path: '/manager-po',
    to: '/manager-po/dashboard',
    navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
