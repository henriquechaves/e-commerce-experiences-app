/* eslint-disable global-require */
import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './components/Home';
import ItemDetail from './components/ItemDetail';
import ItemInsert from './components/ItemInsert';
import ItemEdit from './components/ItemEdit';

export const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      }, {
        path: '/detail/:cuid',
        component: ItemDetail,
        params: {},
      }, {
        path: '/edit/:cuid',
        component: ItemEdit,
        params: {},
      }, {
        path: '/insert',
        component: ItemInsert,
      }
    ],
    children: Object,
  }
];
