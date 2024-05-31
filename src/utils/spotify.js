
const fetchSongsEndpoint = (query) => `https://api.spotify.com/v1/search?type=track&q=${query}`
const createPlaylistEndpoint = (userId) => `https://api.spotify.com/v1/users/${userId}/playlists`
const addToPlaylistEndpoint = (playlistId) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
const accessToken = ''

export async function getApiData(queryString) {
    try {
        const response = await fetch(fetchSongsEndpoint(queryString));
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Request error: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function createSpotifyPlaylist(playlistName, userId) {
    try {
        const response = await fetch(createPlaylistEndpoint(userId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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
            throw new Error(`Request error: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function addToSpotifyPlaylist(playlistId, tracks) {
    try {
        const response = await fetch(addToPlaylistEndpoint(playlistId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                uris: tracks.map(track => track.uri)
            })
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Request error: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
}