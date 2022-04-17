import {reducer} from "./reducer";
import { createStore, applyMiddleware } from "redux";

const store = createStore(
  reducer,
//   applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export {store};