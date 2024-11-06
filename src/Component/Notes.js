import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import noteContext from "../Context/Notes/NotesContext";
import AlertContext from '../Context/Notes/AlertContext';
import LoginContext from '../Context/Notes/LoginContext'; // Make sure to import LoginContext
import "../CSS/Notes.css";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addNote, deleteNote, updateNote } = context;
  const context2 = useContext(AlertContext);
  const { setAlert } = context2;
  const context3 = useContext(LoginContext); // Use LoginContext for login state
  const { isLogged } = context3;

  const emptyNote = {
    title: "",
    description: "",
    tag: "",
    _id: null,
  };

  const [note, setNote] = useState(emptyNote);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!note.title) {
      setAlert({ type: "danger", msg: "Title can't be empty" });
      return;
    }
    if (!note.description) {
      setAlert({ type: "danger", msg: "Description can't be empty" });
      return;
    }
    addNote(note.title, note.description, note.tag);
    setNote(emptyNote);
  };

  const handleDelete = (id) => {
    deleteNote(id);
  };

  const handleUpdate = (el) => {
    setNote({ ...el });
    setModalVisible(true);
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    if (!note.title) {
      setAlert({ type: "danger", msg: "Title can't be empty" });
      return;
    }
    if (!note.description) {
      setAlert({ type: "danger", msg: "Description can't be empty" });
      return;
    }
    updateNote(note._id, note.title, note.description, note.tag);
    setModalVisible(false);
    setNote(emptyNote);
  };

  return (
    <div className="container">
      {isLogged ? ( // Check if the user is logged in
        <>
          <h3>Add a Note</h3>
          <form className="my-4 w-75 m-auto">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              name="title"
              value={note.title}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Description"
              name="description"
              value={note.description}
              onChange={handleChange}
            />
            <button className="btn btn-primary" onClick={handleAdd}>
              Add Note
            </button>
          </form>

          <div className="row my-4">
            {notes.length > 0 ? (
              notes.map((element) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={element._id}>
                  <div className="card shadow-sm rounded">
                    <div className="card-body">
                      <h5 className="card-title">{element.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{element.tag}</h6>
                      <p className="card-text">{element.description}</p>
                      <div className="d-flex justify-content-between">
                        <span>
                          <FontAwesomeIcon
                            icon={faPencil}
                            className="text-primary cursor-pointer m-2 icon-container"
                            onClick={() => handleUpdate(element)}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger cursor-pointer m-2 icon-container"
                            onClick={() => handleDelete(element._id)}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No notes available</p>
            )}
          </div>

          {/* Modal for Updating Notes */}
          {modalVisible && (
            <div
              className="modal fade show"
              style={{ display: "block" }} // Make modal visible
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Your Note</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => {
                        setModalVisible(false);
                        setNote(emptyNote);
                      }}
                    >
                      <span>&times;</span>
                    </button>
                  </div>

                  <div className="modal-body">
                    <form className="w-75 m-auto" onSubmit={handleUpdateNote}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="etitle"
                          name="title"
                          value={note.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                          Tag
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="etag"
                          name="tag"
                          value={note.tag}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="edescription"
                          name="description"
                          value={note.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setModalVisible(false);
                            setNote(emptyNote);
                          }}
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-warning" role="alert">
          Please log in to view your notes.
        </div>
      )}
    </div>
  );
};

export default Notes;