import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './Playlist.css';

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
        // Call the Spotify API to save the playlist
        setPlaylistName("");
        setPlaylist([]);
    }
    return (
        <div className='Playlist'>
            <form onSubmit={saveToSpotify}>
                <input type='text' placeholder='What shall we call this wonderful playlist?' value={playlistName} onChange={handleChange}/>
                <hr />
                <TrackList playlist={playlist} setPlaylist={setPlaylist} />
                <button type='submit'>SAVE TO SPOTIFY</button>
            </form>
        </div>
    )
}