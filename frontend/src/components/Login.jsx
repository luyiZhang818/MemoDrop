import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
    const [passkey, setPasskey] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(passkey);
    };

    return (
        <div className="login">
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter your passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required
            />
            <button type="submit">Login</button>
        </form>
        </div>
    );
    };

export default Login;