import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import { createSpotifyPlaylist, addToSpotifyPlaylist, getUserId } from '../../utils/spotify';
import './Playlist.css';

export function Playlist({ playlist, setPlaylist, playlistName, setPlaylistName }) {
    const handleChange = (e) => {
        setPlaylistName(e.target.value);
    }

    const saveToSpotify = (e) => {
        e.preventDefault();
        // Call the Spotify API to save the playlist
        const userId = getUserId();
        const createSpotifyPlaylistResponse = createSpotifyPlaylist(playlistName, userId);
        const playlistId = createSpotifyPlaylistResponse.id;
        addToSpotifyPlaylist(playlistId, playlist);
        setPlaylistName("");
        setPlaylist([]);
    }
    
    return (
        <div className='Playlist'>
            <form onSubmit={saveToSpotify}>
                <input type='text' placeholder='Give it a name?' value={playlistName} onChange={handleChange}/>
                <hr />
                <TrackList playlist={playlist} setPlaylist={setPlaylist} />
                <button type='submit'>SAVE TO SPOTIFY</button>
            </form>
        </div>
    )
}