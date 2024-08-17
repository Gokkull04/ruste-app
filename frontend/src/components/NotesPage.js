import React, { useState } from 'react';

const NotesPage = () => {
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement note saving logic here
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ event, date, time })
      });

      const data = await response.json();

      if (data.success) {
        alert('Note added successfully');
      } else {
        alert('Failed to add note');
      }
    } catch (error) {
      alert('Error adding note');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Event</label>
          <input type="text" className="w-full p-2 border" value={event} onChange={(e) => setEvent(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input type="date" className="w-full p-2 border" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Time</label>
          <input type="time" className="w-full p-2 border" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Add Note</button>
      </form>
    </div>
  );
};

export default NotesPage;
