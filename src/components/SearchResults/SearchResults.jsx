import React from 'react';
import { Track } from '../Track/Track';

export function SearchResults({ filteredTracks, setFilteredTracks, setPlaylist }) {
    return (
        <div className='SearchResults'>
            <h2>Results</h2>
            <hr />
            {
                filteredTracks && filteredTracks.map((track, index) => {
                    return (
                        <Track
                        setFilteredTracks={setFilteredTracks} 
                        setPlaylist={setPlaylist}
                        key={index}
                        name={track.name}
                        artist={track.artist}
                        album={track.album}
                        id={track.id}
                        uri={track.uri}
                        src={track.images[1].url}
                         />
                    )
                })
            }
        </div>
    )
}