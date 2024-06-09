import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResults } from "../components/SearchResults/SearchResults";
import { Playlist } from "../components/Playlist/Playlist";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { fetchSongs } from "../utils/spotify.js";
import { currentToken } from "../components/Auth/auth";
import Cookies from "js-cookie";
import './Root.css';

function Root(){
    const [filteredTracks, setFilteredTracks ] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (access_token === null || access_token === undefined) {
            navigate("/login");
        }

    }, [navigate]);


    const searchForTracks = async (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            return;
        }
        const data = await fetchSongs(searchTerm);
        const tracks = data.tracks.items.map(track => {
            return {
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                id: track.id,
                uri: track.uri
            }
        });
        setFilteredTracks(tracks);
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