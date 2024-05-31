import React from 'react';

export function Track({ name, artist, album, id, setPlaylist }){
    const handleClick = () => {
        setPlaylist((prev) => [...prev, { name, artist, album, id }]);
    }
    return (
        <div className='track' onClick={handleClick}>
            <h2>{name}</h2>
            <p>{artist} | {album}</p>
        </div>
    )
}