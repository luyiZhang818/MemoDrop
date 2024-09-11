import React, { useState } from 'react';

const NoteInput = ({ handleAddNote }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // append text and file to formData
        const formData = new FormData();
        if (text) {
            formData.append('text', text);
        }
        if (file) {
            formData.append('file', file);
        }

        await handleAddNote(formData);

        // clear input fields after note added
        setText('');
        setFile(null);
        setFileName('No file chosen');
        document.getElementById('file-upload').value = '';

    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }

    }
    return (
        <div className="note-input">
        <form onSubmit={handleSubmit}>
            <textarea
            placeholder="Input text or paste images here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            />

            {/* custom style file selection */}
            <span id="file-chosen">{fileName}</span>
            <div className="file-upload">
                <label htmlFor="file-upload" className='custom-file-upload'>
                    Upload
                </label>
                <input type="file" id="file-upload" onChange={handleFileUpload} style={{ display: 'none' }}/>
                <button type="submit">Drop</button>
            </div>

        </form>
        </div>
    );
};

export default NoteInput;