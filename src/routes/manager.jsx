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
    path: '/manager/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/manager/user',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile
  },
  {
    path: '/manager/bank',
    sidebarName: 'Bank',
    navbarName: 'Bank',
    icon: Unarchive,
    component: Bank
  },
  {
    path: '/manager/po',
    sidebarName: 'Po',
    navbarName: 'Po',
    icon: Unarchive,
    component: Po
  },
  {
    redirect: true,
    path: '/manager',
    to: '/manager/dashboard',
    navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
