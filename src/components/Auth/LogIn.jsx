import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getToken, getUserData, getRedirectToSpotifyAuthorize, currentToken } from './auth';

export function LogIn(){
    // On page load, try to fetch auth code from current browser search URL
    const args = new URLSearchParams(window.location.search);
    const code = args.get('code');
    
    // If we find a code, we're in a callback, do a token exchange
    if (code) {
        const token = getToken(code);
        currentToken.save(token);
    
        // Remove code from URL so we can refresh correctly.
        const url = new URL(window.location.href);
        url.searchParams.delete("code");
    
        const updatedUrl = url.search ? url.href : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);
    }
    
    // If we have a token, we're logged in, so fetch user data and render logged in template
    if (currentToken.access_token) {
        const userData = getUserData();
        console.log(userData)
        return <Navigate to="/" />;
    }
    
    // Otherwise we're not logged in, so render the login template
    else {
        const redirectToSpotifyAuthorize =  getRedirectToSpotifyAuthorize();
        return (
            <>
                <h2>Log In</h2>
                <Link to={redirectToSpotifyAuthorize}>Log in with Spotify</Link>
            </>
        )
    }
}