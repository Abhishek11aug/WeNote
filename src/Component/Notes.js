import React, { useContext, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import noteContext from "../Context/Notes/NotesContext";
 
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addNote, deleteNote, updateNote } = context;
  const ref = useRef();

  const emptyNote = {
    title: "",
    description: "",
    tag: "",
  }
  // Note state corresponding to form input
  const [note, setNote] = useState(emptyNote);

  // Form for adding note
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Add
  const handleAdd = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote(emptyNote);
    
  };

  // Delete
  const handleDelete = (id) => {
    deleteNote(id);
  };

  // Update
  const handleUpdate = (el) => {
    setNote(el);
    ref.current.click();
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    updateNote(note._id, note.title, note.description, note.tag);
    setNote(emptyNote);
  };

  return (
    <div>
      {/* Adding Notes */}
      <h3>Add a note</h3>
      <div className="my-4">
        <form className="w-75 m-auto">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
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
              id="tag"
              aria-describedby="emailHelp"
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
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleAdd}
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Updating Note */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form className="w-75 m-auto">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
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
                    aria-describedby="emailHelp"
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={()=>setNote(emptyNote)}
                >
                Close
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleUpdateNote}
                data-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Viewing Notes */}
      <h3 className="m-6">Your Notes</h3>
      <div className="row my-4">
        {notes.length>0 && notes.map((element) => (
          <div className="col-md-3" key={element._id}>
            <div className="card m-2" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title fw-bolder">{element.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary fw-normal">
                  {element.tag}
                </h6>
                <p className="card-text fw-medium">{element.description}</p>
                <h6 className="card-subtitle mb-2 text-body">
                  {element.timestamp}
                </h6>
                <span className="d-flex justify-content-between">
                  {/* Update Functionality */}
                  <FontAwesomeIcon
                    className="icon"
                    icon={faPencil}
                    shake={false}
                    style={{ color: "#12c6f3" }}
                    onClick={() => handleUpdate(element)}
                  />
                  {/* Delete Functionality */}
                  <FontAwesomeIcon
                    className="icon"
                    icon={faTrash}
                    shake={false}
                    style={{ color: "#e4213e" }}
                    onClick={() => handleDelete(element._id)}
                  />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
