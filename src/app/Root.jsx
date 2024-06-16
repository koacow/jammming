import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResults } from "../components/SearchResults/SearchResults";
import { Playlist } from "../components/Playlist/Playlist";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { fetchSongs } from "../utils/spotify.js";
import { AUTH } from "../utils/auth";
import './Root.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Root(){
    const [filteredTracks, setFilteredTracks ] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const access_token = AUTH.getAccessToken();
        const expiry_time = AUTH.getExpiry();
        const currentTime = new Date().getTime();
        if (!access_token || currentTime > expiry_time) {
            AUTH.clearLocalStorage();
            navigate("/login");
        }

    }, [navigate]);


    const searchForTracks = async (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            return;
        }
        try{
            const data = await fetchSongs(searchTerm);
            const tracks = data.tracks.items.map(track => {
                return {
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    id: track.id,
                    uri: track.uri,
                    images: track.album.images
                }
            });
            setFilteredTracks(tracks);
            setSearchTerm("");
        } catch (error) {
            alert(`${error} - Please try again later.`);
        }
    }

    const logOut = () => {
        AUTH.clearLocalStorage();
        navigate("/login");
    }
    

    return (
        <div className="Root">
            <div className="title">
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
            </div>
            <button className="logout" onClick={logOut}>
                Log out
                <FontAwesomeIcon className="logout-icon" icon={faSignOutAlt} />
            </button>
            <SearchBar searchForTracks={searchForTracks} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main className="container">
                <SearchResults filteredTracks={filteredTracks} setFilteredTracks={setFilteredTracks} setPlaylist={setPlaylist}/>
                <Playlist playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} />
            </main>
        </div>
    )
}

export { Root };