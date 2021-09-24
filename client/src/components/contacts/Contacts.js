import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import { ContactItem } from "./ContactItem";

export const Contacts = () => {
  // bring in all states and methods associate with contact context
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};
