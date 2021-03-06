import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
    const { logout, currentUser} = useAuth();
    const [error, setError] = useState('');

    const handleLogout = async () => {
        setError('');
        try {
            await logout();            
        } catch {
            setError('Failed to log out!');
        }
    }
    return ( 
        <nav className="navbar">            
            <h1>SanaGram</h1>
            <div className="links">
                <a href="/">Home</a>
                {currentUser && <a onClick={handleLogout}>Log Out</a>}
            </div>            
        </nav>
     );
}
 
export default Navbar;