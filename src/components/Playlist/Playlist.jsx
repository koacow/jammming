import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import { createSpotifyPlaylist, addToSpotifyPlaylist, getUserId } from '../../utils/spotify';
import './Playlist.css';

export function Playlist({ playlist, setPlaylist, playlistName, setPlaylistName }) {
    const handleChange = (e) => {
        setPlaylistName(e.target.value);
    }

    const saveToSpotify = async (e) => {
        e.preventDefault();
        // Call the Spotify API to save the playlist
        if (!playlistName) {return alert('At least give it a name!');}
        if (!playlist.length) {return alert('Add some tracks first!');}

        try {
            const userId = getUserId();
            const createSpotifyPlaylistResponse = await createSpotifyPlaylist(playlistName, userId);
            const playlistId = createSpotifyPlaylistResponse.id;
            await addToSpotifyPlaylist(playlistId, playlist);
            setPlaylistName("");
            setPlaylist([]);
        } catch (error) {
            alert(`${error} - Please try again later.`);
        }
    }
    
    return (
        <div className='Playlist'>
            <form onSubmit={saveToSpotify}>
                <input type='text' placeholder='Give it a name?' value={playlistName} onChange={handleChange} required />
                <hr />
                <TrackList playlist={playlist} setPlaylist={setPlaylist} />
                <button type='submit'>SAVE TO SPOTIFY</button>
            </form>
        </div>
    )
}