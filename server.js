const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

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

async function getTopTracks(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  const playlists = data.playlists.items;

  const trackDataPromises = playlists.map(async (playlist) => {
    const playlistResponse = await fetch(playlist.tracks.href, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    const playlistData = await playlistResponse.json();
    return playlistData.items;
  });

  const trackData = await Promise.all(trackDataPromises);
  return trackData.flat();
}

function extractTrackData(tracks) {
  return tracks.map((track) => ({
    id: track.track.id,
    title: track.track.name,
    artist: track.track.artists[0].name,
    album: track.track.album.name,
    imageUrl: track.track.album.images[0].url
  }));
}

app.prepare().then(() => {
  const server = express();

  server.get('/api/top-tracks', async (req, res) => {
    try {
      const accessToken = await getAccessToken();
      const topTracks = await getTopTracks(accessToken);
      const formattedData = extractTrackData(topTracks);

      res.json(formattedData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from Spotify API' });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}).catch(err => {
  console.error(err);
  process.exit(1);
});