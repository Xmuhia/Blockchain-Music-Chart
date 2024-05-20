"use client"; 

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import SongList from "../components/SongList";
import mockSongs from "../mockData";

// Define the Song type
type Song = {
  id: number;
  name: string;
  artist: string;
  votes: number;
};

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]); // Use Song[] as the type for the state

  useEffect(() => {
    // Set the mock data as the initial state
    setSongs(mockSongs);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-6">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-8">Kenyan Billboard Music Chart</h1>

        {/* Song List Component */}
        <SongList songs={songs} />
      </div>

      {/* Footer */}
      <footer className="w-full py-4 border-t mt-8">
        <div className="text-center">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Powered by{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              className="dark:invert"
            />
          </a>
        </div>
      </footer>
    </main>
  );
}
