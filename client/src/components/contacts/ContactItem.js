import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

export const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { setCurrent, clearCurrent, deleteContact } = contactContext;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  const { id, name, email, phone, type } = contact;
  return (
    <div className="bg-light card">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "工作" || type === "colleague"
              ? "badge-success"
              : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => {
            setCurrent(contact);
          }}
        >
          編輯
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          刪除
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
