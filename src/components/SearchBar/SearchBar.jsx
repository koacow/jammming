import React from "react";

export function SearchBar({ setSearchTerm }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Let's look for some jams" />
                <button type="submit">Search</button>
            </form>
        </>
    )
}