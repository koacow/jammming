import React from "react";

export function SearchBar({ handleSubmit, searchTerm, setSearchTerm }) {

    const handleChange = ({target}) => {
        setSearchTerm(target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Let's look for some jams" value={searchTerm} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
        </>
    )
}