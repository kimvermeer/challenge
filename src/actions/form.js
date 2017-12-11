// @flow
import FORM from "../constants/form";
import type { FormModel } from '../Form';

export const failSubmit = (error: Error) => ({
  type: FORM.SUBMIT_FAIL,
  payload: { error }
});

export const succeedSubmit = (data: FormModel) => ({
  type: FORM.SUBMIT_SUCCEED,
  payload: { data }
});
