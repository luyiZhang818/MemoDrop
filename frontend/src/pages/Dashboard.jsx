import React, { useState } from 'react';
import NoteInput from '../components/NoteInput';
import NotesList from '../components/NotesList';
import Navbar from '../components/Navbar';

const Dashboard = ({ notes, handleAddNote }) => {
    return (
        <div className="dashboard-page">
            <Navbar />
            <NoteInput handleAddNote={handleAddNote} />
            <NotesList notes={notes} />
        </div>
    );
};

export default Dashboard;