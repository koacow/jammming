import React from 'react';
import { Track } from '../Track/Track';

export function SearchResults({ filteredTracks, setPlaylist }) {
    return (
        <div className='SearchResults'>
            <h2>Results</h2>
            <hr />
            {
                filteredTracks &&  filteredTracks.map((track, index) => {
                    return (
                        <Track setPlaylist={setPlaylist}
                        key={index}
                        name={track.name}
                        artist={track.artist}
                        album={track.album}
                        id={track.id}
                        uri={track.uri} />
                    )
                })
            }
        </div>
    )
}