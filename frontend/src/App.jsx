import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import axios from 'axios'
import './index.css';

const App = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [notes, setNotes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = async(passkey) => {
    try {
      // make post request using passkey to login
      const response = await axios.post(`${API_BASE_URL}/login`, {passkey: passkey});
      // if token is generated from successful login
      if (response.data.token) {
        // save token
        setToken(response.data.token);
        // set logged in to true
        setLoggedIn(true);
        // fetch all ontes upon successful login
        fetchNotes(response.data.token)
      }
    } catch (error) {
        console.error('Login failed: ', error);
        alert('Login failed. Please check your passkey.')
      }
    };


  const fetchNotes = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notes`, {
        // pass in header for backend method to decode
        headers: { Authorization: `Bearer ${token}`}
      });
      // set notes to response fetched
      setNotes(response.data);
    } catch (error) {
        console.error('Failed to fetch notes', error);
    }
  };

  const handleAddNote = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/notes`, formData, {
        headers: { 
          // pass in header for backend method to decode
          Authorization: `Bearer ${token}`,
          // specifies form data is multipart request
          'Content-Type': 'multipart/form-data'
        }
      });
      // add the returned new note to the state
      setNotes([ response.data, ...notes]);
    } catch (error) {
        console.error('Failed to add note', error);
    }
  };

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard notes={notes} handleAddNote={handleAddNote} token={token} />
      ) : (
        <Home handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;