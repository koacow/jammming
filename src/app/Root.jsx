import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResults } from "../components/SearchResults/SearchResults";
import { Playlist } from "../components/Playlist/Playlist";
import { SearchBar } from "../components/SearchBar/SearchBar";
import {getApiData} from "../utils/spotify.js";
import { currentToken } from "../components/Auth/auth";
import Cookies from "js-cookie";

function Root(){
    const [filteredTracks, setFilteredTracks ] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        if (!accessToken) {
        navigate("/login");
        }

    }, [navigate]);


    const searchForTracks = async (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            return;
        }
        console.log(currentToken.access_token)
        const queryString = searchTerm.split(" ").join("+");
        const data = await getApiData(queryString);
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