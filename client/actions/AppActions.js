import * as actions from './ActionCreators';
import config from '../../server/config';

export function changePage(activePage) {
  return {
    type: actions.CHANGE_PAGE,
    activePage,
  };
}
