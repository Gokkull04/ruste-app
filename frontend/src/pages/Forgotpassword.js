import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NotesPage = () => {
  const [eventName, setEventName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Name:', eventName);
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
    setAlertMessage('Event details submitted successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Notes Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white bg-opacity-10 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">
            Add Event
          </h2>

          {alertMessage && (
            <div className="mb-4 p-3 text-center text-white bg-green-500 rounded-lg">
              {alertMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="event-name">
                Event Name
              </label>
              <input
                type="text"
                id="event-name"
                placeholder="Enter the event name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Time
              </label>
              <input
                type="time"
                id="event-time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
                step="1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none hover:bg-purple-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} RustE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NotesPage;
