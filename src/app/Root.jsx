import React, { useEffect, useState } from "react";
import { SearchResults } from "../components/SearchResults/SearchResults";
import { Playlist } from "../components/Playlist/Playlist";
import { SearchBar } from "../components/SearchBar/SearchBar";
import {songs} from "../utils/spotify";

function Root(){
    const [filteredSongs, setFilteredSongs ] = useState(songs);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSongs, setSelectedSongs] = useState([]);

    useEffect(() => {
        setFilteredSongs(prev => prev.filter(song => {
            const searchTermLower = searchTerm.toLowerCase();
            const songNameLower = song['name'].toLowerCase();
            const artistNameLower = song.artist.toLowerCase();
            const albumNameLower = song.album.toLowerCase();
            return songNameLower.includes(searchTermLower) || artistNameLower.includes(searchTermLower) || albumNameLower.includes(searchTermLower);
        }));
    }, [searchTerm])

    return (
        <>
            <SearchBar setSearchTerm={setSearchTerm} />
            <SearchResults filteredSongs={filteredSongs}/>
            <Playlist selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs}/>
        </>
    )
}

export { Root };