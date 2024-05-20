"use client";

import React from "react";

const SongList = ({ songs }) => {
  return (
    <div className="w-full max-w-5xl">
      <h2 className="text-2xl mb-4">Top Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id} className="p-2 border-b">
            {song.name} by {song.artist} - Votes: {song.votes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
