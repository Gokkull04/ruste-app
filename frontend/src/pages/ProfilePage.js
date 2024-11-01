import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "", // Changed from eventName to title for consistency
    date: "", // Changed from eventDate to date for consistency
    time: "", // Changed from eventTime to time for consistency
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("userId:", userId); // Check if userId is being passed correctly
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/profile/notes/${userId}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setErrorMessage("Failed to fetch events");
      }
    };

    if (userId) fetchEvents();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/profile/notes", {
        title: newEvent.title, // Adjusted to match the backend schema
        date: newEvent.date, // Adjusted to match the backend schema
        time: newEvent.time, // Adjusted to match the backend schema
        userId, // Include userId to associate the event with the user
      });

      setEvents([...events, response.data]); // Add the new event to the list
      setNewEvent({ title: "", date: "", time: "" }); // Clear form fields
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding event:", error);
      setErrorMessage("Failed to add event");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Events</h1>

      {/* Add Event Form */}
      <form
        onSubmit={handleAddEvent}
        className="bg-white p-4 shadow-md rounded-md mb-4"
      >
        <h2 className="text-2xl font-semibold mb-3">Add New Event</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <input
          type="text"
          name="title"
          placeholder="Event Title" // Adjusted placeholder for clarity
          value={newEvent.title}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-3"
        />

        <input
          type="time"
          name="time"
          value={newEvent.time}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Event
        </button>
      </form>

      {/* Event List */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-3">Your Event List</h2>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event._id} className="border-b py-2">
                <h3 className="text-lg font-bold">{event.title}</h3>{" "}
                {/* Adjusted to title */}
                <p className="text-gray-600">
                  Date: {new Date(event.date).toLocaleDateString()}{" "}
                  {/* Adjusted to date */}
                </p>
                <p className="text-gray-600">Time: {event.time}</p>{" "}
                {/* Adjusted to time */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
