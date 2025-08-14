import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = () => {
  const playlist = [
    "/iwasneverthere.mp3",
    "/escapism.mp3",
    "/blue.mp3",
    "/YAD.mp3",
    "/stars.mp3",
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [infoText, setInfoText] = useState("Wanna play music while scrolling?");
  const audioRef = useRef(null);
  const lastTapTime = useRef(0);
  const clickTimeout = useRef(null);
  const isPlayingRef = useRef(false); // mirror of isPlaying to use inside callbacks

  // Keep ref in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Helper: reliably set src and optionally play
  const setSourceAndMaybePlay = (src, shouldPlay) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set source, force reload, apply volume
    audio.src = src;
    audio.load();

    // Always ensure not muted and reasonable volume
    audio.muted = false;
    if (audio.volume === 0) audio.volume = 0.5;

    if (!shouldPlay) return;

    // Wait for canplay before calling play to avoid errors
    const onCanPlay = () => {
      // Try play in the same user gesture frame if possible
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // If blocked, reflect paused state
          setIsPlaying(false);
          setInfoText("Wanna play music while scrolling?");
        });
      }
      audio.removeEventListener("canplay", onCanPlay);
    };
    audio.addEventListener("canplay", onCanPlay);
  };

  // Play a specific track (called by click gestures)
  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setInfoText("Double tap to change the music");
    setSourceAndMaybePlay(playlist[index], true);
  };

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
      setInfoText("Wanna play music while scrolling?");
    } else {
      // Ensure current src is set correctly before playing
      setSourceAndMaybePlay(playlist[currentTrackIndex], true);
      setIsPlaying(true);
      setInfoText("Double tap to change the music");
    }
  };

  // Shuffle to next random track, preserve play/pause state
  const shuffleNextTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlayingRef.current;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === currentTrackIndex && playlist.length > 1);

    setCurrentTrackIndex(nextIndex);

    // If paused, only switch source; if playing, switch and continue
    setSourceAndMaybePlay(playlist[nextIndex], wasPlaying);
  };

  // Auto shuffle on track end
  const handleTrackEnd = () => {
    shuffleNextTrack();
  };

  // Initial setup: volume, preload
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = "auto";
    audio.volume = 0.6;
    audio.muted = false;

    // Dev-time diagnostics (optional; remove in prod)
    const onError = () => {
      // eslint-disable-next-line no-console
      console.warn("Audio error loading/playing:", audio.error);
    };
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  // Volume with up/down keys (desktop)
  useEffect(() => {
    const handleVolumeKeys = (e) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        audio.volume = Math.min(1, Math.round((audio.volume + 0.05) * 100) / 100);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        audio.volume = Math.max(0, Math.round((audio.volume - 0.05) * 100) / 100);
      }
    };
    window.addEventListener("keydown", handleVolumeKeys, { passive: false });
    return () => window.removeEventListener("keydown", handleVolumeKeys);
  }, []);

  // Mobile double tap to change music
  const handleDoubleTapMobile = () => {
    const now = Date.now();
    if (now - lastTapTime.current < 400) {
      shuffleNextTrack();
    }
    lastTapTime.current = now;
  };

  // Unified single vs double click on desktop
  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      // Double click → change track, preserve play state
      shuffleNextTrack();
    } else {
      clickTimeout.current = setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 250);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
      <p className="text-xs text-gray-300 italic">{infoText}</p>

      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={handleTrackEnd}
        preload="auto"
      />

      <button
        onClick={handleClick}
        onTouchStart={handleDoubleTapMobile}
        className="p-4 rounded-full shadow-lg transition transform hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #00f0ff, #00ff80)",
          boxShadow: "0 0 15px #00f0ff, 0 0 25px #00ff80",
          color: "white",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
