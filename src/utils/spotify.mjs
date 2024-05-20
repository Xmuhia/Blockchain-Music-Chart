import 'dotenv/config';
import fetch from 'node-fetch';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

async function getTopTracks() {
    const accessToken = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });

    const data = await response.json();
    return data;
}

(async () => {
    try {
        const topTracks = await getTopTracks();
        console.log(topTracks);
    } catch (error) {
        console.error('Error fetching data from Spotify API:', error);
    }
})();
