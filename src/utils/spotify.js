const endpoint = 'https://66591f11de346625136b60be.mockapi.io/api/v1/tracks'

export async function getApiData(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const json = await response.json();
            console.log(json)
            return json;
        } else {
            throw new Error('Error fetching data');
        }
    } catch (error) {
        console.error(error);
    }
}