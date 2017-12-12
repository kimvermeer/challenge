// @flow
import { fromJS } from "immutable";
import type { Store, Action } from "redux";

import FORM from "../constants/form";

export const initialState = fromJS({
  form: {
    a: [],
    b: "",
    text: "",
    c: ""
  },
  validation: null
});

export const getSubmitValidation = (state: Store) => state.get("validation");

export default (state: Store = initialState, action: Action) => {
  switch (action.type) {
    case FORM.SUBMIT_FAIL: {
      return state.set("validation", action.payload.error.message);
    }
    case FORM.SUBMIT_SUCCEED: {
      return state
        .set("validation", "Success!")
        .set("form", state.get("form").mergeDeep(fromJS(action.payload.data)));
    }
    default: {
      return state;
    }
  }
};
