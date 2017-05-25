import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import configureStore from './store';

const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

const renderApp = (App) => {
  render(
    <AppContainer>
      <BrowserRouter>
        <App store={store} />
      </BrowserRouter>
    </AppContainer>,
    mountApp
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => renderApp(App));
}
