import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import 'assets/css/material-dashboard-react.css?v=1.5.0';

import indexRoutes from 'routes/index.jsx';
import Home from 'views/Web/Home';
import CariJadwal from 'views/Web/CariJadwal';
import Booking from 'views/Web/Booking';
import Konfirmasi from 'views/Web/Konfirmasi';
import CekTiket from 'views/Web/CekTiket';
import SignIn from 'views/Auth/SignIn';
import NotFound from 'components/Web/NotFound/NotFound.js';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
      <Route path="/cari/jadwal" component={CariJadwal} />
      <Route path="/booking/:id/:tanggal/:plat" component={Booking} />
      <Route path="/konfirmasi" component={Konfirmasi} />
      <Route path="/cektiket" component={CekTiket} />
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/" component={Home} exact />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
