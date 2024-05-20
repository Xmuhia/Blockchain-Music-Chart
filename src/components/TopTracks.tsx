
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopTracks = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        axios.get('/api/top-tracks')
            .then(response => setTracks(response.data))
            .catch(error => console.error('Error fetching top tracks:', error));
    }, []);

    return (
        <div>
            <h1>Top Tracks in Kenya</h1>
            <ul>
                {tracks.map((track, index) => (
                    <li key={index}>{track.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TopTracks;
