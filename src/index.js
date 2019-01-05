import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import 'assets/css/material-dashboard-react.css?v=1.5.0';

import indexRoutes from 'routes/index.jsx';
import Home from 'views/Web/Home';
import Booking from 'views/Web/Booking';
import Konfirmasi from 'views/Web/Konfirmasi';

const hist = createBrowserHistory();

const NotFound = () => {
  return <div>not found</div>;
};

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
      <Route path="/cari/jadwal" component={Home} />
      <Route path="/booking/:id/:tanggal/:plat" component={Booking} />
      <Route path="/konfirmasi" component={Konfirmasi} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
