import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import { ContactItem } from "./ContactItem";

export const Contacts = () => {
  // bring in all states and methods associate with contact context
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>暫無聯絡人</h4>;
  }

  const displayItems = (contact) => {
    return <ContactItem key={contact.id} contact={contact} />;
  };

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => displayItems(contact))
        : contacts.map((contact) => displayItems(contact))}
    </Fragment>
  );
};
