// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SongRanking {
    struct Song {
        string name;
        string artist;
        uint256 streams;
        uint256 score;
    }

    Song[] public songs;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function addSong(string memory name, string memory artist, uint256 streams) public onlyOwner {
        uint256 score = calculateScore(streams);
        songs.push(Song(name, artist, streams, score));
    }

    function calculateScore(uint256 streams) internal pure returns (uint256) {
        return streams * 10; // Example scoring system
    }

    function getTopSongs() public view returns (Song[] memory) {
        Song[] memory topSongs = new Song[](songs.length);
        for (uint i = 0; i < songs.length; i++) {
            topSongs[i] = songs[i];
        }
        // Sort the array based on score
        for (uint i = 0; i < songs.length; i++) {
            for (uint j = i + 1; j < songs.length; j++) {
                if (topSongs[i].score < topSongs[j].score) {
                    Song memory temp = topSongs[i];
                    topSongs[i] = topSongs[j];
                    topSongs[j] = temp;
                }
            }
        }
        return topSongs;
    }
}
