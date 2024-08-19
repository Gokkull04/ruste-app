import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const NotesPage = () => {
  const [eventName, setEventName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [alertMessage, setAlertMessage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events on component mount
    axios.get('http://localhost:5000/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const eventDetails = {
      eventName,
      eventDate: selectedDate,
      eventTime: selectedTime,
    };
  
    console.log('Event details:', eventDetails); // Log the event details being sent
  
    axios.post('http://localhost:5000/events', eventDetails)
      .then(response => {
        setAlertMessage('Event details submitted successfully!');
        setEvents([...events, eventDetails]); // Update the events list with the new event
      })
      .catch(error => {
        console.error('Error submitting event details:', error.response.data); // Log the error details
        setAlertMessage('Failed to submit event details.');
      });
  
    // Clear form fields
    setEventName('');
    setSelectedDate(new Date());
    setSelectedTime('10:00');
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

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
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-bold text-center mb-4">Upcoming Events</h3>
            <ul>
              {events.map((event, index) => (
                <li key={index} className="mb-2">
                  <strong>{event.eventName}</strong> - {new Date(event.eventDate).toLocaleDateString()} at {event.eventTime}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
