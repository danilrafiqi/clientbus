// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// import ContentPaste from "@material-ui/icons/ContentPaste";

import Unarchive from '@material-ui/icons/Unarchive';
// core components/views
import DashboardPage from 'views/Dashboard/Dashboard.jsx';
import UserProfile from 'views/Dashboard/UserProfile.jsx';
import Bank from 'views/SuperAdmin/Bank/BankList';
import Po from 'views/SuperAdmin/Po/PoList';
import Login from 'views/SuperAdmin/User/LoginList';
import Karyawan from 'views/SuperAdmin/Karyawan/KaryawanList';
import KaryawanPo from 'views/SuperAdmin/KaryawanPo/KaryawanPoList';
import ChangePassword from 'views/Dashboard/ChangePassword';

const dashboardRoutes = [
  {
    path: '/superadmin/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/superadmin/profile',
    sidebarName: 'Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile
  },
  {
    path: '/superadmin/bank',
    sidebarName: 'Bank',
    navbarName: 'Bank',
    icon: Unarchive,
    component: Bank
  },
  {
    path: '/superadmin/po',
    sidebarName: 'Po',
    navbarName: 'Po',
    icon: Unarchive,
    component: Po
  },
  {
    path: '/superadmin/changepassword',
    sidebarName: 'Change Password',
    navbarName: 'Change Password',
    icon: Unarchive,
    component: ChangePassword
  },
  {
    path: '/superadmin/user',
    sidebarName: 'User',
    navbarName: 'User',
    icon: Unarchive,
    component: Login
  },
  {
    path: '/superadmin/karyawan',
    sidebarName: 'Karyawan',
    navbarName: 'Karyawan',
    icon: Unarchive,
    component: Karyawan
  },
  {
    path: '/superadmin/kkaryawan-po',
    sidebarName: 'Karyawan Po',
    navbarName: 'Karyawan Po',
    icon: Unarchive,
    component: KaryawanPo
  },
  {
    redirect: true,
    path: '/superadmin',
    to: '/superadmin/dashboard',
    navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
