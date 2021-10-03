import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

export const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;

  // initializing useRef hook
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (event) => {
    if (text.current.value !== "") {
      filterContacts(event.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="篩選聯絡人"
        onChange={onChange}
      />
    </form>
  );
};
