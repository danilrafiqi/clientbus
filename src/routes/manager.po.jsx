// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
// import ContentPaste from "@material-ui/icons/ContentPaste";

// core components/views
import DashboardPage from 'views/ManagerPo/Dashboard.jsx';
import UserProfile from 'views/Dashboard/UserProfile.jsx';
import Person from '@material-ui/icons/Person';

const dashboardRoutes = [
  {
    path: '/manager-po/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/manager-po/profile',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile
  },
  {
    redirect: true,
    path: '/manager-po',
    to: '/manager-po/dashboard',
    navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
