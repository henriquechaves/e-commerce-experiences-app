import * as actions from '../actions/ActionCreators';

// Initial State
export const initialState = {
  activePage: 1,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.CHANGE_PAGE :
      return Object.assign({}, state, { activePage: action.activePage });

    default:
      return state;

  }
};

export const getActivePage = state => state.app.activePage;

export default AppReducer;
