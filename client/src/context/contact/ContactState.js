import React, { useReducer } from "react";
import * as uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      { id: 1, name: "J11", email: "11@11.com", phone: "11111", type: "個人" },
      { id: 2, name: "22", email: "22@22.com", phone: "22222", type: "個人" },
      { id: 3, name: "33", email: "33@33.com", phone: "33333", type: "工作" },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // add contact
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // delete contact
  // update contact
  // filter contacts
  // clear filter
  // set current contact
  // clear current contact

  return (
    <ContactContext.Provider
      // anything to be accessed from other component
      value={{
        contacts: state.contacts,
        addContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
