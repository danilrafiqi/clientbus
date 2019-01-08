// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// import ContentPaste from "@material-ui/icons/ContentPaste";

import Unarchive from '@material-ui/icons/Unarchive';
// core components/views
import DashboardPage from 'views/Manager/Dashboard.jsx';
import UserProfile from 'views/UserProfile/UserProfile.jsx';
import Bank from 'views/SuperAdmin/Bank/BankList';
import Po from 'views/SuperAdmin/Po/PoList';

const dashboardRoutes = [
  {
    path: '/managerpo/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    redirect: true,
    path: '/managerpo',
    to: '/managerpo/dashboard',
    navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
