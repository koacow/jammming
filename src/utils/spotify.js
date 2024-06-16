
import { AUTH } from "./auth"

const fetchSongsEndpoint = (query) => `https://api.spotify.com/v1/search?type=track&q=${query}`
const createPlaylistEndpoint = (userId) => `https://api.spotify.com/v1/users/${userId}/playlists`
const addToPlaylistEndpoint = (playlistId) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
const access_token = AUTH.getAccessToken();

export async function fetchSongs(queryString) {
    const response = await fetch(fetchSongsEndpoint(queryString), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Error fetching songs: ${response.status}`);
        throw new Error(`Error fetching songs: ${response.status}`);
    }
}

export async function createSpotifyPlaylist(playlistName, userId) {
    const response = await fetch(createPlaylistEndpoint(userId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({
            name: playlistName,
            description: 'Your playlist made by Jamming with \u2764',
            public: false
        })
    });
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Error creating a playlist: ${response.status}`);
        throw new Error(`Error creating a playlist: ${response.status}`);
    }
}

export async function addToSpotifyPlaylist(playlistId, tracks) {
    const response = await fetch(addToPlaylistEndpoint(playlistId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({
            uris: tracks.map(track => track.uri)
        })
    });
    if (response.ok) {
        return response.json();
    } else {
        console.error(`Error adding tracks to playlist: ${response.status}`);
        throw new Error(`Error adding tracks to playlist: ${response.status}`);
    }
}

export async function getUserId() {
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });
    if (response.ok) {
        const json = await response.json();
        return json.id.toString();
    } else {
        console.error(`Error fetching user: ${response.status}`);
        throw new Error(`Error fetching user: ${response.status}`);
    }
}