import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import { ContactItem } from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const Contacts = () => {
  // bring in all states and methods associate with contact context
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>暫無聯絡人</h4>;
  }

  const displayItems = (contact) => {
    return (
      <CSSTransition
        key={contact.id ? contact.id : contact._id}
        timeout={700}
        classNames="item"
      >
        <ContactItem contact={contact} />
      </CSSTransition>
    );
  };

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => displayItems(contact))
          : contacts.map((contact) => displayItems(contact))}
      </TransitionGroup>
    </Fragment>
  );
};
