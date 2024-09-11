import React from 'react';
import NoteSnippet from './NoteSnippet';

const NotesList = ({ notes }) => {
    return (
        <div className="notes-list">
        {notes.map((note, index) => (
            <NoteSnippet key={index} note={note} />
        ))}
        </div>
    );
};

export default NotesList;