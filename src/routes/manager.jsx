// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
// import ContentPaste from "@material-ui/icons/ContentPaste";

// core components/views
import DashboardPage from 'views/Manager/Dashboard.jsx';
import UserProfile from 'views/Dashboard/UserProfile.jsx';
import Person from '@material-ui/icons/Person';

const dashboardRoutes = [
  {
    path: '/manager/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/manager/profile',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile
  },
  {
    redirect: true,
    path: '/manager',
    to: '/manager/dashboard',
    navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
