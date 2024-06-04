import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResults } from "../components/SearchResults/SearchResults";
import { Playlist } from "../components/Playlist/Playlist";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { getApiData } from "../utils/spotify.js";
import { currentToken } from "../components/Auth/auth";
import Cookies from "js-cookie";
import './Root.css';

function Root(){
    const [filteredTracks, setFilteredTracks ] = useState([
        {name: 'Track 1', artist: 'Artist 1', album: 'Album 1', id: '1', uri: 'uri1'},
        {name: 'Track 2', artist: 'Artist 2', album: 'Album 2', id: '2', uri: 'uri2'},
        {name: 'Track 3', artist: 'Artist 3', album: 'Album 3', id: '3', uri: 'uri3'}
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        // const access_token = Cookies.get("access_token");
        // if (access_token === 'undefined') {
        //     navigate("/login");
        // }

    }, [navigate]);


    const searchForTracks = async (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            return;
        }
        const queryString = searchTerm.split(" ").join("+");
        const data = await getApiData(queryString);
        setFilteredTracks(data);
        setSearchTerm("");
    }
    

    return (
        <div className="Root">
            <div className="title">
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
            </div>
            <SearchBar searchForTracks={searchForTracks} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="container">
                <SearchResults filteredTracks={filteredTracks} setPlaylist={setPlaylist}/>
                <Playlist playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} />
            </div>
        </div>
    )
}

export { Root };