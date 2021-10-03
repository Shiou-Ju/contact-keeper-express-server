import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

export const ContactForm = () => {
  // method of adding contact is needed
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, clearCurrent, current, clearFilter } =
    contactContext;

  const defaultContact = {
    name: "",
    email: "",
    phone: "",
    type: "個人",
  };

  useEffect(
    () => {
      if (current !== null) {
        setContact(current);
      } else {
        setContact(defaultContact);
      }
    },
    // add dependency here: only contactContext, current changes will lead to the effect
    // eslint-disable-next-line
    [contactContext, current]
  );

  // set all contact info into single object
  const [contact, setContact] = useState(defaultContact);

  const { name, email, phone, type } = contact;

  const onChange = (event) =>
    setContact({ ...contact, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    if  (current  ===  null)  {
      addContact(contact);
    } else{
      updateContact(contact)
    }
    clearCurrent();
    clearFilter();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "變更內容" : "新增聯絡人"}</h2>
      <input
        type="text"
        placeholder="姓名"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="電話"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>聯絡人類別</h5>
      <input
        type="radio"
        name="type"
        value="個人"
        checked={type === "個人"}
        onChange={onChange}
      />
      個人{" "}
      <input
        type="radio"
        name="type"
        value="工作"
        checked={type === "工作"}
        onChange={onChange}
      />
      工作{" "}
      <div>
        <input
          type="submit"
          value={current ? "變更" : "新增"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            清除
          </button>
        </div>
      )}
    </form>
  );
};
