import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <div className="navbar">
            <FontAwesomeIcon icon={faBoxArchive} className='logo-icon'/>
            <h3 className='navbar-logo'>Memo Drop</h3>
        </div>
    );
};

export default Navbar