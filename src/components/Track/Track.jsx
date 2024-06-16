import React from 'react';
import './Track.css';

export function Track({ name, artist, album, id, setPlaylist, uri, src }){

    const handleClick = () => {
        setPlaylist((prev) => {
            if (prev.some((track) => track.id === id)) {
                return prev.filter((track) => track.id !== id);
            } else{
                return [...prev, {name, artist, album, id, uri, src}];
            }
        });


    }
    return (
        <div className='Track' onClick={handleClick}>
            <img src={src ? src : "https://via.placeholder.com/150"} alt={`${name} album cover`} />
            <h2>{name}</h2>
            <p>{artist} | {album}</p>
        </div>
    )
}