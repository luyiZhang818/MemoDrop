import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FaFileCsv, FaFilePdf, FaFileAlt, FaFileImage, FaFile } from 'react-icons/fa'; 


const NoteSnippet = ({ note }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyText = () => {
        if (note.text) {
            navigator.clipboard.writeText(note.text)
                .then(() => {
                    setCopied(true);
                    // reset after 2 seconds
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((error) => {
                    console.error('Failed to copy test: ', error);
                })
        };
    };

    const getFileIcon = (fileUrl) => {
        const fileExtension = fileUrl.split('.').pop().toLowerCase();
        switch (fileExtension) {
            case 'csv':
                return <FaFileCsv style={{ fontSize: '7rem', color: 'green' }} />;
            case 'pdf':
                return <FaFilePdf style={{ fontSize: '2rem', color: 'red' }} />;
            case 'txt':
                return <FaFileAlt style={{ fontSize: '2rem', color: 'blue' }} />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <img src={fileUrl} alt="Uploaded image"/>;
            default:
                return <FaFile style={{ fontSize: '2rem', color: 'gray' }} />;
        };
    };

    const getFileName = (fileUrl) => {
        return fileUrl.split('/').pop()
    };

    return (
        <div className="note-snippet">
        <p className='timestamp'>{note.createdAt}</p>
        {/* display text if text is available */}
        {note.text && (
            <div className='text-snippet'>
                <p>{note.text}</p>
                <button onClick={handleCopyText}><FontAwesomeIcon icon={faCopy} /></button>
                {/* display copied when copying text */}
                {copied && <div className="text-copied">Copied</div>}
            </div>
        )}

        {/* check if file exsits */}
        {note.fileUrl && (
            <div className='file-snippet'>
                {getFileIcon(note.fileUrl)}
                <span>{getFileName(note.fileUrl)}</span>
                <a href={note.fileUrl} download>
                    <FontAwesomeIcon icon={faDownload} />
                </a>
            </div>
        )}
        </div>
    );
};

export default NoteSnippet;