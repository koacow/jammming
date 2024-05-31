import React from "react";

export function SearchBar({ searchForTracks, searchTerm, setSearchTerm }) {

    const handleChange = ({target}) => {
        setSearchTerm(target.value);
    }

    return (
        <>
            <form onSubmit={searchForTracks}>
                <input type="text" placeholder="Let's look for some jams" value={searchTerm} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
        </>
    )
}