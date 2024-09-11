import React, { useState } from 'react';
import Logo from '../components/Logo';
import Login from '../components/Login';
import PasskeyGenerator from '../components/PasskeyGenerator';

const Home = ({ handleLogin }) => {
    const [isGeneratingPasskey, setIsGeneratingPasskey] = useState(false);

    return (
        <div className="home-page">
        {!isGeneratingPasskey && <Logo />}
        {!isGeneratingPasskey ? (
            <div className='home-page-container'>
                <Login handleLogin={handleLogin} />
                <p className="firstTime">First time user?</p>
                <button className='generate-passkey-button' onClick={() => setIsGeneratingPasskey(true)}>
                    Generate Passkey
                </button>
            </div>
        ) : (
            <PasskeyGenerator handleBackToLogin={() => setIsGeneratingPasskey(false)} />
        )}
        </div>
    );
};

export default Home;