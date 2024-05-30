import React, { useEffect, useState } from "react";
import { SearchResults } from "../components/SearchResults/SearchResults";
import { Playlist } from "../components/Playlist/Playlist";
import { SearchBar } from "../components/SearchBar/SearchBar";
import {api} from "../utils/spotify.js";

function Root(){
    const [filteredSongs, setFilteredSongs ] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSongs, setSelectedSongs] = useState([]);

    const searchForSongs = (e) => {
        e.preventDefault();
    }

    const addToPlaylist = (song) => {
        setSelectedSongs([...selectedSongs, song]);
    }

    return (
        <>
            <SearchBar handleSubmit={searchForSongs} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SearchResults filteredSongs={filteredSongs}/>
            <Playlist selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs}/>
        </>
    )
}

export { Root };