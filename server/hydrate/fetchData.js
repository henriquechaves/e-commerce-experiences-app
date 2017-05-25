/*
Utility function to fetch required data for component to render in server side.
This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
*/
import { matchPath } from 'react-router-dom';
import sequence from './promiseUtils';

export default function fetchComponentData(store, routes, location, params) {
  const components = getComponents(routes, location);

  const needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);

  return sequence(needs, need => store.dispatch(need(params, store.getState())));
}

function getComponents(routes, location) {
  const components = [];

  routes[0].routes.some(route => {
    const match = matchPath(location, route);
    if (match) {
      components.push(route.component);
    }
    return match;
  });
  
  return components;
}
