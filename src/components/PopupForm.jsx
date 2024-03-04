import PropsType from "prop-types";

import axios from "axios";
import { useState } from "react";

export default function PopupForm({ isOpen, onClose, onSubmit}) {
  const [author, setAuthor] = useState( "");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ author, title });
    onClose(); // Close the pop-up after submitting
    axios
      .post("https://node58166-env-pt.proen.app.ruk-com.cloud/books/", {
        author: author,
        title: title
      })
      .then((response) => {
        console.log(response);
      });

  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "gray",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

PopupForm.propTypes = {

  isOpen: PropsType.bool.isRequired,
  onClose: PropsType.func.isRequired,
  onSubmit: PropsType.func.isRequired,
  initialData: PropsType.object, // The initial data to be displayed in the form

};
