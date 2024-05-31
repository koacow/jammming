import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export function LogIn({ isLoggedIn, setIsLoggedIn }){
    if (isLoggedIn) {
        return <Navigate to='/' />
    }
    return (
        <>
            <h2>Log In</h2>
            <Link to='/'>Home</Link>
        </>
    )
}