import React from 'react';

export function Track({ name, artist, album, id, setPlaylist }){

    const handleClick = () => {
        setPlaylist((prev) => {
            if (prev.some((track) => track.id === id)) {
                return prev.filter((track) => track.id !== id);
            } else{
                return [...prev, {name, artist, album, id}];
            }
        });
    }
    return (
        <div className='track' onClick={handleClick}>
            <h2>{name}</h2>
            <p>{artist} | {album}</p>
        </div>
    )
}