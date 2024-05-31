import React from 'react';
import { Track } from '../Track/Track';

export function SearchResults({ filteredTracks, setPlaylist }) {
    return (
        <>
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
        </>
    )
}