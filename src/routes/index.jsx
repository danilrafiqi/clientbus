import Superadmin from 'layouts/Dashboard/Dashboard.Superadmin.jsx';
import Admin from 'layouts/Dashboard/Dashboard.Admin.jsx';
import Petugas from 'layouts/Dashboard/Dashboard.Petugas.jsx';

const indexRoutes = [
  { path: '/superadmin/', component: Superadmin },
  { path: '/admin/', component: Admin },
  { path: '/petugas/', component: Petugas }
];

export default indexRoutes;
