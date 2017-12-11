// @flow
import { fromJS } from "immutable";
import type { Store, Action } from "redux";

import FORM from '../constants/form';

export const initialState = fromJS({
  form: {
    a: [],
    b: "",
    text: "",
    c: ""
  },
  error: null,
});

export const getSubmitError = (state: Store) => state.get('error');

export default (state: Store = initialState, action: Action) => {
  switch (action.type) {
    case FORM.SUBMIT_FAIL: {
      return state.set('error', action.payload.error.message);
    }
    case FORM.SUBMIT_SUCCEED: {
      const newState = state.set('error', null);
      return newState.set('form', fromJS(action.payload.data));
    }
    default: {
      return state;
    }
  }
};
