import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRedirectToSpotifyAuthorize, getAccessToken } from './auth';
import './LogIn.css';

export function LogIn(){
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    const redirectToSpotifyAuthorize = getRedirectToSpotifyAuthorize();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");
        console.log(`code: ${code}`);
        console.log(`state: ${state}`);

        if (code) {
            getAccessToken(code).then((access_token) => {
                console.log(access_token)
                localStorage.setItem('access_token', access_token);
                setIsLoggedin(true);
            });
        }
    }, []);

    useEffect(() => {
        if (isLoggedin) {
            navigate("/");
        }
    }, [isLoggedin, navigate]);

        return (
            <div className='LogIn'>
                <h1>Ja<span className='highlight'>mmm</span>ing</h1>
                <section>
                    <h2>Log in to start Jammming!</h2>
                    <Link className='redirect' to={redirectToSpotifyAuthorize}>Log in with Spotify</Link>
                </section>
            </div>
        )
}