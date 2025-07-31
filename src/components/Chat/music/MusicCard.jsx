import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { useAxios } from "@/providers/AxiosProvider";
import Image from "next/image";
import {
  FaForward,
  FaBackward,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
} from "react-icons/fa";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { useState, useEffect, useRef, useCallback } from "react";

export const MusicCard = ({ music, onFavoritesUpdate }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  
  const audioRef = useRef(null);
  const seekingRef = useRef(false);
  const lastUpdateTimeRef = useRef(0);
  
  const axios = useAxios();
  
  // Safe localStorage access for SSR
  const UserId = typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;

  const { playMusic, pauseMusic, isCurrentlyPlaying, currentPlayingId } =
    useMusicPlayer();
  const isPlaying = isCurrentlyPlaying(music.id);

  // Check if music is already in favorites when component mounts
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!UserId) return;

      try {
        const response = await axios.get(`/api/music/favorites/`);
        const favorites = response.data;
        if (favorites.length > 0 && favorites[0].music) {
          const favoriteMusics = favorites[0].music;
          const isAlreadyFavorite = favoriteMusics.some(
            (favMusic) => favMusic.id === music.id
          );
          setIsFavorite(isAlreadyFavorite);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
        setIsFavorite(false);
      }
    };

    checkIfFavorite();
  }, [music.id, UserId]);

  // Effect to handle when other music starts playing
  useEffect(() => {
    if (currentPlayingId !== music.id && audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
      // Don't reset currentTime here to maintain position
    }
  }, [currentPlayingId, music.id]);

  const handleAddToFavorites = async () => {
    if (!UserId || isAddingToFavorites) return;

    setIsAddingToFavorites(true);
    try {
      if (isFavorite) {
        console.log(`Removing ${music.title} from favorites...`);
        const response = await axios.delete(`/api/music/favorites/`, {
          data: { music_id: music.id },
        });

        if (response.status === 200 || response.status === 204) {
          setIsFavorite(false);
          console.log(`Successfully removed ${music.title} from favorites`);
          if (onFavoritesUpdate) onFavoritesUpdate();
        }
      } else {
        console.log(`Adding ${music.title} to favorites...`);
        const response = await axios.post(`/api/music/favorites/`, {
          music_id: music.id,
        });

        if (response.status === 200 || response.status === 201) {
          setIsFavorite(true);
          console.log(`Successfully added ${music.title} to favorites`);
          if (onFavoritesUpdate) onFavoritesUpdate();
        }
      }
    } catch (error) {
      console.error(`Error updating favorites for ${music.title}:`, error);
      if (error.response?.status === 400) {
        setIsFavorite(true);
      }
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  const handlePlayPause = async () => {
    if (!audioRef.current || !isMetadataLoaded) return;
    
    try {
      setIsLoading(true);
      if (isPlaying) {
        pauseMusic();
        audioRef.current.pause();
      } else {
        // Restore the current time before playing
        if (currentTime > 0) {
          audioRef.current.currentTime = currentTime;
        }
        playMusic(music.id, audioRef.current);
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Throttled time update to prevent excessive state updates
  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current || seekingRef.current) return;
    
    const now = Date.now();
    if (now - lastUpdateTimeRef.current < 100) return; // Throttle to 10fps
    
    const newTime = audioRef.current.currentTime;
    if (!isNaN(newTime) && Math.abs(newTime - currentTime) > 0.1) {
      setCurrentTime(newTime);
      lastUpdateTimeRef.current = now;
    }
  }, [currentTime]);

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      const audioDuration = audioRef.current.duration;
      console.log(`Metadata loaded for ${music.title}:`, { duration: audioDuration });
      
      setDuration(audioDuration);
      setIsMetadataLoaded(true);
      audioRef.current.volume = isMuted ? 0 : volume;
      
      // Restore saved position if exists
      if (currentTime > 0 && currentTime < audioDuration) {
        audioRef.current.currentTime = currentTime;
      }
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    console.error("Audio loading error for", music.title, ":", e);
    setIsLoading(false);
    setIsMetadataLoaded(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const handleVolumeClick = (e) => {
    const volumeBar = e.currentTarget;
    const rect = volumeBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newVolume = Math.max(0, Math.min(1, clickX / width));
    
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      const newVolume = volume === 0 ? 0.5 : volume;
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || duration <= 0) {
      console.log(`Progress click blocked for ${music.title}:`, {
        hasAudio: !!audioRef.current,
        metadataLoaded: isMetadataLoaded,
        duration
      });
      return;
    }
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = Math.max(0, Math.min(duration, (clickX / width) * duration));

    console.log(`Seeking to ${newTime.toFixed(2)}s for ${music.title}`);
    
    seekingRef.current = true;
    
    try {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      // Clear seeking flag after a short delay
      setTimeout(() => {
        seekingRef.current = false;
      }, 100);
    } catch (error) {
      console.error("Error seeking:", error);
      seekingRef.current = false;
    }
  };

  // FIXED: Skip backward function with proper state management
  const handleSkipBackward = () => {
    if (!audioRef.current ) {
      console.log(`Skip backward blocked for ${music.title}:`, {
        hasAudio: !!audioRef.current,
        metadataLoaded: isMetadataLoaded
      });
      return;
    }

    const currentAudioTime = audioRef.current.currentTime;
    const newTime = Math.max(0, currentAudioTime - 10);
    
    console.log(`Skipping backward for ${music.title}: ${currentAudioTime.toFixed(2)}s → ${newTime.toFixed(2)}s`);
    
    seekingRef.current = true;
    
    try {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      // Clear seeking flag after a short delay
      setTimeout(() => {
        seekingRef.current = false;
      }, 100);
    } catch (error) {
      console.error("Error skipping backward:", error);
      seekingRef.current = false;
    }
  };

  // FIXED: Skip forward function with proper state management
  const handleSkipForward = () => {
    if (!audioRef.current ) {
      console.log(`Skip forward blocked for ${music.title}:`, {
        hasAudio: !!audioRef.current,
        metadataLoaded: isMetadataLoaded
      });
      return;
    }

    const currentAudioTime = audioRef.current.currentTime;
    console.log(`Current time for ${music.title}: ${currentAudioTime.toFixed(2)}s`);
    const audioDuration = audioRef.current.duration;
    
    if (!audioDuration || audioDuration <= 0) {
      console.log(`Duration not available for ${music.title}`);
      return;
    }

    const newTime = Math.min(audioDuration - 0.1, currentAudioTime + 10); // Prevent seeking to exact end
    
    console.log(`Skipping forward for ${music.title}: ${currentAudioTime.toFixed(2)}s → ${newTime.toFixed(2)}s (duration: ${audioDuration.toFixed(2)}s)`);
    
    seekingRef.current = true;
    
    try {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      
      // Clear seeking flag after a short delay
      setTimeout(() => {
        seekingRef.current = false;
      }, 100);
    } catch (error) {
      console.error("Error skipping forward:", error);
      seekingRef.current = false;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const remainingTime = Math.max(0, duration - currentTime);

  return (
    <div className="relative group bg-white rounded-xl">
      <div className="pb-7">
        <Image
          className="rounded-xl w-11/12 mx-auto h-40 mt-3.5"
          alt="Music Banner"
          src={music.banner}
          width={500}
          height={300}
        />
        <div className="absolute top-6 right-6 group">
          <button
            onClick={handleAddToFavorites}
            disabled={isAddingToFavorites || !UserId}
            className={`p-1 rounded-full transition-all duration-300 ${
              isFavorite
                ? "text-primary"
                : "text-white hover:bg-[#005CFF] hover:text-white"
            } ${
              isAddingToFavorites
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {isFavorite ? <IoStar size={24} /> : <IoStarOutline size={24} />}
          </button>
        </div>
      </div>

      {/* Music Info */}
      <div className="flex justify-center gap relative">
        <div className="text-center">
          <h1 className="font-semibold text-lg text-[#001B4B]">
            {music.title}
          </h1>
          <p className="text-sm text-[#001B4B]/70">{music.artist}</p>
        </div>
        <div className="absolute bottom-4 right-9">
          {isPlaying && (
            <div className="flex items-end space-x-1 h-8">
              {/* Animated Music Bars */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-[#001B4B] rounded-full animate-music-bar-${i + 1}`}
                  style={{ height: `${12 + (i % 3) * 8}px` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Audio Player */}
      <div id="AudioPlayer" className="px-4 pb-4">
        <audio
          ref={audioRef}
          src={music.music_file}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onSeeking={() => {
            console.log(`Seeking started for ${music.title}`);
          }}
          onSeeked={() => {
            console.log(`Seeking completed for ${music.title}`);
            seekingRef.current = false;
          }}
          onEnded={() => {
            console.log(`Audio ended for ${music.title}`);
            pauseMusic();
            setCurrentTime(0);
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
            }
          }}
          preload="metadata"
        />

        {/* Debug Info (remove in production) */}
       

        <div className="flex items-center gap-3 mt-3">
          {/* Current Time */}
          <span className="text-sm font-medium text-[#001B4B] min-w-[35px]">
            {formatTime(currentTime)}
          </span>

          {/* Progress Bar */}
          <div
            className="flex-1 bg-[#001B4B] rounded-full h-1.5 cursor-pointer relative overflow-hidden hover:h-2 transition-all duration-200"
            onClick={handleProgressClick}
          >
            <div
              className="bg-[#005CFF] h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Progress indicator dot */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#005CFF] rounded-full shadow-lg border-2 border-white opacity-0 hover:opacity-100 transition-opacity duration-200"
              style={{ left: `calc(${progressPercentage}% - 6px)` }}
            />
          </div>

          {/* Remaining Time */}
          <span className="text-sm font-medium text-gray-700 min-w-[40px]">
            -{formatTime(remainingTime)}
          </span>
        </div>

        {/* Volume Control */}
        {isPlaying && (
          <div className="flex items-center gap-3 mt-3">
            {/* Volume Icon */}
            <button
              onClick={toggleMute}
              className="flex items-center justify-center w-8 h-8 text-[#001B4B] hover:text-[#005CFF] transition-colors duration-200"
            >
              {isMuted || volume === 0 ? (
                <FaVolumeMute size={16} />
              ) : volume < 0.5 ? (
                <FaVolumeDown size={16} />
              ) : (
                <FaVolumeUp size={16} />
              )}
            </button>

            {/* Volume Progress Bar */}
            <div
              className="flex-1 bg-[#001B4B] rounded-full h-1.5 cursor-pointer relative overflow-hidden max-w-[120px]"
              onClick={handleVolumeClick}
            >
              <div
                className="bg-[#005CFF] h-full transition-all duration-300 ease-out"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
            </div>

            {/* Volume Percentage */}
            <span className="text-xs font-medium text-[#001B4B] min-w-[35px]">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Play Controls */}
      <div id="PlayPause" className="flex justify-center items-center gap-6 py-4">
        {/* Backward 10s Button */}
        <button
          onClick={handleSkipBackward}
          className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
          disabled={!isMetadataLoaded || isLoading}
          title="Skip backward 10 seconds"
        >
          <FaBackward
            className={`transition-colors duration-200 ${
              (!isMetadataLoaded || isLoading)
                ? "text-gray-400"
                : "text-[#001B4B] group-hover:text-[#005CFF]"
            }`}
            size={20}
          />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="flex items-center justify-center w-16 h-16 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
          disabled={!isMetadataLoaded || isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#001B4B]" />
          ) : isPlaying ? (
            <FaPause
              className={`transition-colors duration-200 ${
                !isMetadataLoaded
                  ? "text-gray-400"
                  : "text-[#001B4B] group-hover:text-[#005CFF]"
              }`}
              size={28}
            />
          ) : (
            <FaPlay
              className={`transition-colors duration-200 ${
                !isMetadataLoaded
                  ? "text-gray-400"
                  : "text-[#001B4B] group-hover:text-[#005CFF]"
              }`}
              size={28}
            />
          )}
        </button>

        {/* Forward 10s Button */}
        <button
          onClick={handleSkipForward}
          className="flex items-center justify-center w-12 h-12 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
          disabled={!isMetadataLoaded || isLoading}
          title="Skip forward 10 seconds"
        >
          <FaForward
            className={`transition-colors duration-200 ${
              (!isMetadataLoaded || isLoading)
                ? "text-gray-400"
                : "text-[#001B4B] group-hover:text-[#005CFF]"
            }`}
            size={20}
          />
        </button>
      </div>
    </div>
  );
};