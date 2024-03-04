// Code for List all the books in the library
// with the option to view, update and delete  a book

import { useState, useEffect } from "react";
import axios from "axios";

import PopupForm from "./PopupForm";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({ id: "", title: "", author: "" });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState([]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleFormSubmit = (data) => {
    if (data.id) {
      // Update existing data
      setFormData(formData.map(item => item.id === data.id ? data : item));
    } else {
      // Add new data with a unique id
      setFormData([...formData, { ...data, id: Date.now() }]);
    }
    console.log(formData); // You can replace this with any action
    handleClosePopup();
  };

  useEffect(() => {
    axios
      .get("https://node58166-env-pt.proen.app.ruk-com.cloud/books/")
      .then((response) => {
        setBooks(response.data);
      });
  }, []);

  const viewBook = (id) => {
    axios
      .get(`https://node58166-env-pt.proen.app.ruk-com.cloud/books/${id}`)
      .then((response) => {
        setBook(response.data);
      });
    alert("Book Title: " + book.title + "\n" + "Book Author: " + book.author);
  };

  const updateBook = (book) => {
    console.log("upDFunc: ", book);
    console.log("upDFunc: ", editingData);
    // axios
    //   .put(`https://node41091-noderest.proen.app.ruk-com.cloud/books/${id}`)
    //   .then((response) => {
    //     setBook(response.data);
    //   });
  };

  const deleteBook = (id) => {
    axios
      .delete(`https://node58166-env-pt.proen.app.ruk-com.cloud/books/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      });
  };

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => viewBook(book.id)}>View</button>
                <button onClick={() => updateBook(book)}>Update</button>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleOpenPopup}>Add Author and Title</button>
        <PopupForm
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
        />
        {/* Render submitted data or other components here */}
      </div>
    </div>
  );
}
