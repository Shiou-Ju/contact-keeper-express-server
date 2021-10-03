import React, { useReducer } from "react";
import * as uuid from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set alert
  const setAlert = (msg, type, timeout = 3500) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state, // the entire array
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
