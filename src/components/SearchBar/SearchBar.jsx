import React from "react";
import "./SearchBar.css";
import { faSearch }  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchBar({ searchForTracks, searchTerm, setSearchTerm }) {

    const handleChange = ({target}) => {
        setSearchTerm(target.value);
    }

    return (
        <div className="SearchBar">
            <form onSubmit={searchForTracks}>
                <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
                <FontAwesomeIcon className="search-icon" icon={faSearch} onClick={searchForTracks} />
            </form>
        </div>
    )
}