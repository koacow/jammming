import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { SearchResults } from "../components/SearchResults/SearchResults";
import { Playlist } from "../components/Playlist/Playlist";
import { SearchBar } from "../components/SearchBar/SearchBar";
import {getApiData} from "../utils/spotify.js";

function Root({ isLoggedIn }){
    const [filteredTracks, setFilteredTracks ] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("");

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

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    
    return (
        <>
            <SearchBar searchForTracks={searchForTracks} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SearchResults filteredTracks={filteredTracks} setPlaylist={setPlaylist}/>
            <Playlist playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} />
        </>
    )
}

export { Root };