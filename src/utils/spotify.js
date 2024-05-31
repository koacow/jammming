
const endpoint = 'https://66591f11de346625136b60be.mockapi.io/api/v1/tracks'

export async function getApiData() {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error fetching data');
        }
    } catch (error) {
        console.error(error);
    }
}