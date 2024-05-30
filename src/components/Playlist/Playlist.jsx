import React from 'react';
import {TrackList} from '../TrackList/TrackList';

export function Playlist() {
    return (
        <>
            <form>
                <input type='text' placeholder='What shall we call this wonderful playlist?'/>
                <TrackList/>
                <button type='submit'>Save to Spotify</button>
            </form>
        </>
    )
}