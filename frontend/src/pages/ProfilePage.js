import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ email }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
  });
  const [editNote, setEditNote] = useState(null);

  // Fetch notes for the logged-in user
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/profile/notes",
          { params: { email } }
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [email]);

  // Add a new note
  const addNote = async () => {
    try {
      console.log("Attempting to add note with data:", { email, ...newNote }); // Log the data before sending
      const response = await axios.post("http://localhost:5000/profile/notes", {
        email,
        ...newNote,
      });
      setNotes([...notes, { ...newNote, createdAt: new Date().toISOString() }]);
      setNewNote({ eventName: "", eventDate: "", eventTime: "" });
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response ? error.response.data : error.message
      );
    }
  };


  // Update an existing note
  const updateNote = async (noteId) => {
    try {
      await axios.put(`http://localhost:5000/profile/notes/${noteId}`, {
        email,
        ...editNote,
      });
      setNotes(
        notes.map((note) =>
          note._id === noteId
            ? { ...note, ...editNote, updatedAt: new Date().toISOString() }
            : note
        )
      );
      setEditNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/profile/notes/${noteId}`, {
        data: { email },
      });
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>

      {/* Display list of notes */}
      <div>
        {notes.map((note) => (
          <div key={note._id} className="border p-4 mb-2 rounded">
            {editNote && editNote._id === note._id ? (
              <>
                <input
                  type="text"
                  value={editNote.eventName}
                  onChange={(e) =>
                    setEditNote({ ...editNote, eventName: e.target.value })
                  }
                  placeholder="Event Name"
                  className="border p-1 mb-2 w-full"
                />
                <input
                  type="date"
                  value={editNote.eventDate}
                  onChange={(e) =>
                    setEditNote({ ...editNote, eventDate: e.target.value })
                  }
                  className="border p-1 mb-2 w-full"
                />
                <input
                  type="time"
                  value={editNote.eventTime}
                  onChange={(e) =>
                    setEditNote({ ...editNote, eventTime: e.target.value })
                  }
                  className="border p-1 mb-2 w-full"
                />
                <button
                  onClick={() => updateNote(note._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditNote(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="font-semibold">{note.eventName}</h3>
                <p>
                  {new Date(note.eventDate).toLocaleDateString()} at{" "}
                  {note.eventTime}
                </p>
                <button
                  onClick={() => setEditNote(note)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Form to add a new note */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Add a New Note</h3>
        <input
          type="text"
          value={newNote.eventName}
          onChange={(e) =>
            setNewNote({ ...newNote, eventName: e.target.value })
          }
          placeholder="Event Name"
          className="border p-1 mb-2 w-full"
        />
        <input
          type="date"
          value={newNote.eventDate}
          onChange={(e) =>
            setNewNote({ ...newNote, eventDate: e.target.value })
          }
          className="border p-1 mb-2 w-full"
        />
        <input
          type="time"
          value={newNote.eventTime}
          onChange={(e) =>
            setNewNote({ ...newNote, eventTime: e.target.value })
          }
          className="border p-1 mb-2 w-full"
        />
        <button
          onClick={addNote}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default Profile;
