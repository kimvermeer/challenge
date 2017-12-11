// @flow
import FORM from "../constants/form";

export const failSubmit = (error: Error) => ({
  type: FORM.SUBMIT_FAIL,
  payload: { error }
});

export const succeedSubmit = (data: Object) => ({
  type: FORM.SUBMIT_SUCCEED,
  payload: { data }
});
