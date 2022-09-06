import React, { useState, useRef, useEffect } from "react";
import AudioControls from "./AudioControls.jsx";

let api = "http://assets.breatheco.de/apis/sound/songs";

const AudioPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(null);

  let audioRef = useRef(null);
  let isReady = useRef(false);

  const setAudioRef = ({ id, src }) => {
    audioRef.current.id = id;
    audioRef.current.src = src;
  };


  useEffect(() => {
    getSongs(api);
  }, []);

  // Fetching data from API
  const getSongs = (url) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Setting data obtained from API to the songs state
        setSongs(data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // Play/Pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle setup
  useEffect(() => {
    audioRef.current.pause();

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      isReady.current = true;
    }
  }, [current]);

  /*Prev Track Function*/
  const PrevTrack = () => {
    let currSong = songs[current - 1];
    if (current - 1 < 0) {
      setCurrent(songs.length - 1);
      // By the above logic Set the audio src to the current song
      setAudioRef({
        src: `https://assets.breatheco.de/apis/sound/${
          songs[songs.length - 1].url
        }`,
      });
    } else {
      setCurrent(current - 1);
      // By the above logic Set the audio src to the current song
      setAudioRef({
        src: `https://assets.breatheco.de/apis/sound/${currSong.url}`,
      });
    }
  };

  /*Next Track Function*/
  const NextTrack = () => {
    let currSong = songs[current + 1];
    if (current < songs.length - 1) {
      setCurrent(current + 1);
      // By the above logic Set the audio src to the current song
      setAudioRef({
        src: `https://assets.breatheco.de/apis/sound/${currSong.url}`,
      });
    } else {
      setCurrent(0);
      // By the above logic Set the audio src to the current song
      setAudioRef({
        src: `https://assets.breatheco.de/apis/sound/${songs[0].url}`,
      });
    }
  };

  /*
    Change isPlaying state value to its opossite everytime the play/pause button is clicked,
    an onClick is set on it with this funct on the AudioControls.jsx
  */
  const playOrPause = () => {
    setIsPlaying(!isPlaying);
  };

  // On click of li element, change the audioRef so it can be played
  const handleClick = (url) => {
    // playOrPause();
    setAudioRef({ src: `https://assets.breatheco.de/apis/sound/${url}` });
  };

  // On click of li element set the current state to the current index

  const toggleClass = (index) => {
    setCurrent(index);
  };

  return (
    <div className="playlist-container">
      <ul className="list-group text-light bg-dark">
        {!!songs &&
          songs.length > 0 &&
          songs.map((song, index) => {
            return (
              <>
                <li
                  key={index}
                  className={
                    /* If current state equals the li index being clicked, toggle the class, 
                       in this case apply a lighter bg-color*/
                    current === index
                      ? `list-item d-flex flex-row fw-semibold px-4 selected`
                      : `list-item d-flex flex-row fw-semibold px-4`
                  }
                  onClick={() => {
                    playOrPause();
                    // When li elem clicked, set the current state value to the li clicked
                    setCurrent(index);
                    // When li elem clicked, set the audioRef to the current li song url
                    handleClick(`${song.url}`);
                    // When li elem clicked, change the current state to the li elem clicked index
                    toggleClass(index);
                  }}
                >
                  <span className="song-id">{song.id}</span>
                  {song.name}
                </li>
              </>
            );
          })}
      </ul>
      {/* Use the audioRef value to play the current song */}
      <audio src={audioRef} ref={audioRef}></audio>
      <AudioControls
        isPlaying={isPlaying}
        PrevTrack={PrevTrack}
        playOrPause={playOrPause}
        NextTrack={NextTrack}
      />
    </div>

  );
};

export default AudioPlayer;
