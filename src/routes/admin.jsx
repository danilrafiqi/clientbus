// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Bus from 'views/Admin/Bus/BusList';
import Kelas from 'views/Admin/Kelas/KelasList';
import Rute from 'views/Admin/Rute/RuteList';
import Agen from 'views/Admin/Agen/AgenList';
import Tujuan from 'views/Admin/Tujuan/TujuanList';
import Jadwal from 'views/Admin/Jadwal/JadwalList';
import UserProfile from 'views/Dashboard/UserProfile.jsx';
import Person from '@material-ui/icons/Person';
import ChangePassword from 'views/Dashboard/ChangePassword';
import User from 'views/Admin/User/LoginList';
import Karyawan from 'views/Admin/Karyawan/KaryawanList';

const dashboardRoutes = [
  {
    path: '/admin/profile',
    sidebarName: 'Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile
  },
  {
    path: '/admin/kelas',
    sidebarName: 'Kelas',
    navbarName: 'Kelas',
    icon: Dashboard,
    component: Kelas
  },
  {
    path: '/admin/bus',
    sidebarName: 'Bus',
    navbarName: 'Bus',
    icon: Dashboard,
    component: Bus
  },
  {
    path: '/admin/agen',
    sidebarName: 'Agen',
    navbarName: 'Agen',
    icon: Dashboard,
    component: Agen
  },
  {
    path: '/admin/rute',
    sidebarName: 'Rute',
    navbarName: 'Rute',
    icon: Dashboard,
    component: Rute
  },
  {
    path: '/admin/tujuan',
    sidebarName: 'Tujuan',
    navbarName: 'Tujuan',
    icon: Dashboard,
    component: Tujuan
  },
  {
    path: '/admin/jadwal',
    sidebarName: 'Jadwal',
    navbarName: 'Jadwal',
    icon: Dashboard,
    component: Jadwal
  },
  {
    path: '/admin/changepassword',
    sidebarName: 'Change Password',
    navbarName: 'Change Password',
    icon: Dashboard,
    component: ChangePassword
  },
  {
    path: '/admin/user',
    sidebarName: 'User',
    navbarName: 'User',
    icon: Dashboard,
    component: User
  },
  {
    path: '/admin/karyawan',
    sidebarName: 'Karyawan',
    navbarName: 'Karyawan',
    icon: Dashboard,
    component: Karyawan
  },
  {
    redirect: true,
    path: '/admin',
    to: '/admin/profile',
    navbarName: 'Redirect'
  }
];

export default dashboardRoutes;
