import {reducer} from "./reducer";
import { createStore, applyMiddleware ,compose} from "redux";

// custom middleware

const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  return next(action);
};


const store = createStore(
  reducer,
  compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);




export {store};