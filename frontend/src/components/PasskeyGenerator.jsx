import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faBackward, faSpinner } from '@fortawesome/free-solid-svg-icons'



const PasskeyGenerator = ({ handleBackToLogin }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [passkey, setPasskey] = useState(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    const generatePasskey = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/create-user`);
            setPasskey(response.data.passkey);
            setLoading(false);
        } catch (error) {
            console.error('Failed to generate passkey', error);
            setLoading(false);
        }
    };

    const handleCopyText = () => {
        if (passkey) {
            navigator.clipboard.writeText(passkey)
                .then(() => {
                    setCopied(true);
                    // reset after 2 seconds
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((error) => {
                    console.error('Failed to copy test: ', error);
                });
        }
    };

    // generate only at first mount
    useEffect(() => {
        generatePasskey();
    }, []);

    return (
        <div className="passkey-generator">
        {loading ? (
           <FontAwesomeIcon icon={faSpinner} size='3x'/> 
        ) : (
        passkey && (
            <>
                <h1 className='logo-passkey'>Memo Drop</h1>
                <div className='note'>Please keep your passkeep safe! </div>
                <p className='reminder'> You will need it to access your space </p>
                <div className="passkey-display">
                    <p>{passkey}</p>
                <button className="copy-passkey" onClick={handleCopyText}><FontAwesomeIcon icon={faCopy} /></button>
                {copied && <div className="passkey-copied">Copied</div>}
                </div>
                <button className='back' onClick={handleBackToLogin}><FontAwesomeIcon icon={faBackward} /></button>
            </>
        ))
        }
        </div>
    );
};

export default PasskeyGenerator;