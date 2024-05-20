import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
}

const TopTracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    axios.get<Track[]>('/api/top-tracks')
      .then(response => setTracks(response.data))
      .catch(error => console.error('Error fetching top tracks:', error));
  }, []);

  return (
    <div>
      <h1>Top Tracks in Kenya</h1>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>{track.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;