import React from 'react';

export function SearchResults({ filteredSongs }) {
    return (
        <>
            {
                filteredSongs && filteredSongs.map((song, index) => {
                    return (
                        <h2 key={index}>{song.name} | {song.artist} | {song.playlist}</h2>
                    )
                })
            }
        </>
    )
}