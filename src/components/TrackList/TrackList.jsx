import React from "react";
import { Track } from "../Track/Track";
import "./TrackList.css";

export function TrackList({ playlist, setPlaylist }) {
    return (
        <div className="TrackList">
            {
                playlist && playlist.map((track, index) => {
                    return (
                        <Track
                        setPlaylist={setPlaylist}
                        key={index}
                        name={track.name}
                        artist={track.artist}
                        album={track.album}
                        id={track.id}
                        uri={track.uri}
                        src={track.src} />
                    )
                })
                
            }
        </div>
    )
}