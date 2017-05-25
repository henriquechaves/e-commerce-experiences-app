import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { StaticRouter, matchPath } from 'react-router';
import { renderToString } from 'react-dom/server';
import expressValidator from 'express-validator';
import { Provider } from 'react-redux';
import compression from 'compression';
import bodyParser from 'body-parser';
import Helmet from 'react-helmet';
import mongoose from 'mongoose';
import Express from 'express';
import webpack from 'webpack';
import React from 'react';
import path from 'path';

import fetchComponentData from './hydrate/fetchData';
import configureStore from '../client/store';
import config from '../webpack.config.dev';

import { routes } from '../client/routes';
import products from './routes/product.routes';
import carts from './routes/cart.routes';
import charge from './routes/charge.routes';
import dummyData from './dummyData';

import serverConfig, { apiProd, apiCart, apiCharge } from './config';
import App from '../client/App';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  } else dummyData();
});


// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        <link type="image/png" rel="shortcut icon" href="/client/assets/img/favicon.png" />
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>

      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production'
          ? `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = (err) => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production'
    ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(expressValidator());
app.use(`/${apiProd}`, products);
app.use(`/${apiCart}`, carts);
app.use(`/${apiCharge}`, charge);

let cuid = 0;
app.get('/detail/:cuid', (req, res, next) => {
  cuid = req.params.cuid;
  next();
});
app.get('/edit/:cuid', (req, res, next) => {
  cuid = req.params.cuid;
  next();
});

app.use('/', (req, res, next) => {
    if(req.url === '/favicon.ico') return res.send('./client/assets/img/favicon.ico');

    const params = { cuid: cuid };
    const context = {};
    const store = configureStore();

    return fetchComponentData(store, routes, req.url, params)
      .then(() => {
        const initialView = renderToString(
              <Provider store={store}>
                <StaticRouter context={context} location={req.url}>
                  <App store={store} />
                </StaticRouter>
              </Provider>
        );
        const finalState = store.getState();
        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch(error => next(error));
});

// Start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Vendedor is running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});

export default app;
