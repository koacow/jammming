import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRedirectToSpotifyAuthorize, getAccessToken } from './auth';
import Cookies from 'js-cookie';
import './LogIn.css';

export function LogIn(){
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    const redirectToSpotifyAuthorize = getRedirectToSpotifyAuthorize();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            console.log(code)
            getAccessToken(code).then((access_token) => {
                Cookies.set('access_token', access_token);
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