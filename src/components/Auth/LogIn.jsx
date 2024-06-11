import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from './auth';
import './LogIn.css';

export function LogIn(){
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        console.log(params);
        const access_token = params.get('access_token');
        const expires_in = params.get('expires_in');
        if (access_token) {
            AUTH.setAccessToken(access_token);
            AUTH.setExpiry(expires_in);
            setIsLoggedin(true);
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
                    <Link className='redirect' to={AUTH.getRedirectToSpotifyAuthorize()}>Log in with Spotify</Link>
                </section>
            </div>
        )
}