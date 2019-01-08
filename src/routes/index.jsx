import Superadmin from 'layouts/Dashboard/Dashboard.Superadmin.jsx';
import Admin from 'layouts/Dashboard/Dashboard.Admin.jsx';
import Petugas from 'layouts/Dashboard/Dashboard.Petugas.jsx';
import Manager from 'layouts/Dashboard/Dashboard.Manager.jsx';
import ManagerPo from 'layouts/Dashboard/Dashboard.ManagerPo.jsx';

const indexRoutes = [
  { path: '/superadmin/', component: Superadmin },
  { path: '/admin/', component: Admin },
  { path: '/petugas/', component: Petugas },
  { path: '/manager/', component: Manager },
  { path: '/manager-po/', component: ManagerPo }
];

export default indexRoutes;
