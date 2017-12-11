import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./index.css";
import Form from "./Form";
import formReducer from './reducers/formReducer';
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(formReducer);

ReactDOM.render(
  <Provider store={store}>
    <Form />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
