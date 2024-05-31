import React, { useState } from "react";
import { SearchResults } from "../components/SearchResults/SearchResults";
import { Playlist } from "../components/Playlist/Playlist";
import { SearchBar } from "../components/SearchBar/SearchBar";
import {getApiData} from "../utils/spotify.js";

function Root(){
    const [filteredTracks, setFilteredTracks ] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("");

    const searchForTracks = async (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            return;
        }
        const data = await getApiData(searchTerm);
        console.log(data)
        setFilteredTracks(data);
        setSearchTerm("");
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