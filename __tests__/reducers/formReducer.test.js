import { failSubmit, succeedSubmit } from "../../src/actions/form";
import formReducer, {
  initialState,
  getSubmitValidation
} from "../../src/reducers/formReducer";

describe("Form reducer", () => {
  it("should get the initial state", () => {
    expect(formReducer(undefined, {})).toEqual(initialState);
  });

  let state = initialState;

  it("should fail submit", () => {
    expect(getSubmitValidation(state)).toBeNull();
    state = formReducer(initialState, failSubmit(new Error("Submit failed")));
    expect(getSubmitValidation(state)).toBe("Submit failed");
  });

  it("should succeed submit", () => {
    const data = {
      a: ["A1"],
      b: "B1",
      text: "@abcdef",
      c: "C1"
    };
    state = formReducer(initialState, succeedSubmit(data));
    expect(getSubmitValidation(state)).toBe("Success!");
  });
});
