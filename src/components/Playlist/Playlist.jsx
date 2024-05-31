import React from 'react';
import {TrackList} from '../TrackList/TrackList';

export function Playlist({ playlist, setPlaylist, playlistName, setPlaylistName }) {
    const handleChange = (e) => {
        setPlaylistName(e.target.value);
    }

    const saveToSpotify = (e) => {
        e.preventDefault();
        const playlistData = {
            name: playlistName,
            tracks: playlist
        }
        console.log(playlistData);
        // Call the Spotify API to save the playlist
        setPlaylistName("");
        setPlaylist([]);
    }
    return (
        <>
            <form onSubmit={saveToSpotify}>
                <input type='text' placeholder='What shall we call this wonderful playlist?' value={playlistName} onChange={handleChange}/>
                <TrackList playlist={playlist} setPlaylist={setPlaylist} />
                <button type='submit'>Save to Spotify</button>
            </form>
        </>
    )
}