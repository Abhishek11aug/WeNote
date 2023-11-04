import React, { useEffect, useState, useContext } from "react";
import notesContext from "./NotesContext";
import alertContext from "./AlertContext";

const NotesState = (props) => {
  const host = "https://we-note-backend.vercel.app/";
  const alertcontext = useContext(alertContext);
  const { setAlert } = alertcontext;
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if(localStorage.Token){

        try {
          const response = await fetch(`${host}notes/getNote`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token:localStorage.getItem('Token'),
          },
        });
        const jsonData = await response.json();
        setNotes(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
  }
    fetchData();
  }, []);

  const addNote = async (title, description, tag) => {
    const note = {
      title: title,
      description: description,
      tag: tag,
    };

    try {
      const response = await fetch(`${host}notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token:localStorage.getItem('Token'),
        },
        body: JSON.stringify(note),
      });
      const jsonData = await response.json();
      await setNotes((prevNotes) => [...prevNotes, jsonData.Note]);
      setAlert({ type: "success", msg: "Note added successfully" });
      setTimeout(() => {
        setAlert({});
      }, 2000);
    } catch (error) {
      setAlert({ type: "danger", msg: "System Failure" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Token:localStorage.getItem('Token'),
        },
      });
      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== id)
        );
        setAlert({ type: "success", msg: "Note deleted Successfully" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
      } else {
        setAlert({ type: "danger", msg: "System Failure" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
      }
    } catch (error) {
      setAlert({ type: "danger", msg: "System Failure" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
    }
  };

  const updateNote = async (id,title, description, tag) => {
    const note = {
      title: title,
      description: description,
      tag: tag,
    };
    try {
      const response = await fetch(`${host}notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Token:localStorage.getItem('Token'),
        },
        body: JSON.stringify(note),
      });
      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((prevNote) => {
            if (prevNote._id === id) {
              setAlert({ type: "success", msg: "Notes updated Successfully" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
              return {
                ...prevNote,
                title: note.title,
                description: note.description,
                tag: note.tag,
              };
              
            } else {
              setAlert({ type: "danger", msg: "No Notes Found" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
              return prevNote;
            }
          })
        );
      } else {
        setAlert({ type: "danger", msg: "System Failure" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
      }
    } catch (error) {
      setAlert({ type: "danger", msg: "System Failure" });
        setTimeout(() => {
          setAlert({});
        }, 2000);
    }
  };
  
  return (
    <notesContext.Provider value={{ notes, addNote, deleteNote,updateNote}}>
      {props.children}
    </notesContext.Provider>
  );
};

export default NotesState;