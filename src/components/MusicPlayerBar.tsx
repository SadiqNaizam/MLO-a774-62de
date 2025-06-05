import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'; // Assuming Slider is from shadcn/ui
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  audioSrc: string; // URL to the audio file
}

interface MusicPlayerBarProps {
  initialTrack?: TrackInfo;
  // Add props for playlist controls if needed: onNext, onPrev, playlist
  theme?: 'doraemon' | 'default';
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({ initialTrack, theme = 'default' }) => {
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(initialTrack || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [volume, setVolume] = useState(50); // 0-100
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0); // in seconds
  const [currentTime, setCurrentTime] = useState(0); // in seconds

  const audioRef = useRef<HTMLAudioElement>(null);

  console.log("Rendering MusicPlayerBar, currentTrack:", currentTrack?.title, "isPlaying:", isPlaying);

  useEffect(() => {
    if (initialTrack) {
      setCurrentTrack(initialTrack);
      if (audioRef.current) {
        audioRef.current.src = initialTrack.audioSrc;
        // audioRef.current.load(); // Not always necessary, browser usually handles it
      }
    }
  }, [initialTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const setAudioDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Potentially call onNext track function here
      console.log("Track ended");
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    audio.addEventListener('ended', handleEnded);
    audio.volume = isMuted ? 0 : volume / 100;

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, isMuted, currentTrack]); // Re-attach if currentTrack changes causing audio.src to change

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current || !currentTrack) return;
    const newTime = (value[0] / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false); // Unmute if volume is adjusted
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume / 100;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Example: Simulating track change for SkipForward/SkipBack
  const handleSkipForward = () => console.log("Skip Forward clicked (implement track change logic)");
  const handleSkipBackward = () => console.log("Skip Backward clicked (implement track change logic)");

  const themeStyles = {
    default: {
      bg: 'bg-background',
      text: 'text-foreground',
      accent: 'bg-primary', // For slider track
      buttonVariant: 'ghost' as const,
    },
    doraemon: {
      bg: 'bg-blue-500', // Doraemon blue for bar
      text: 'text-white',
      accent: 'bg-yellow-400', // Doraemon yellow for slider track
      buttonVariant: 'ghost' as const, // or custom styling
      buttonIconColor: 'text-white hover:text-yellow-300'
    }
  };
  const currentTheme = themeStyles[theme] || themeStyles.default;

  if (!currentTrack) {
    // Potentially return a slimmed-down bar or null if no track is active/loaded
    return (
        <div className={cn("fixed bottom-0 left-0 right-0 h-20 border-t p-4 flex items-center justify-center z-50", currentTheme.bg, currentTheme.text)}>
            <p>No track selected.</p>
            <audio ref={audioRef} /> {/* Keep audio element for future track loading */}
        </div>
    );
  }

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 h-20 border-t p-4 flex items-center space-x-4 z-50", currentTheme.bg, currentTheme.text)}>
      <audio ref={audioRef} src={currentTrack.audioSrc} />
      
      {/* Album Art & Track Info */}
      <div className="flex items-center space-x-3 w-1/4">
        {currentTrack.albumArtUrl ? (
          <div className="w-12 h-12">
            <AspectRatio ratio={1} className="bg-muted rounded-sm overflow-hidden">
              <img src={currentTrack.albumArtUrl} alt={currentTrack.title} className="object-cover w-full h-full" />
            </AspectRatio>
          </div>
        ) : (
          <div className="w-12 h-12 bg-muted rounded-sm flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-muted-foreground" /> {/* Placeholder Icon */}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold truncate">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Playback Controls & Progress */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="flex items-center space-x-2 mb-1">
          <Button variant={currentTheme.buttonVariant} size="icon" onClick={handleSkipBackward} className={cn(currentTheme.buttonIconColor)}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant={currentTheme.buttonVariant} size="icon" onClick={togglePlayPause} className={cn(currentTheme.buttonIconColor, "w-10 h-10")}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant={currentTheme.buttonVariant} size="icon" onClick={handleSkipForward} className={cn(currentTheme.buttonIconColor)}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="w-full flex items-center space-x-2 text-xs">
          <span>{formatTime(currentTime)}</span>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            onValueChange={handleProgressChange}
            className="flex-1 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-primary"
            // Apply theme to slider track here if possible or via global CSS
            // style={{ '--slider-track-color': currentTheme.accent } as React.CSSProperties} // Example, may need tailwind plugin
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        <Button variant={currentTheme.buttonVariant} size="icon" onClick={toggleMute} className={cn(currentTheme.buttonIconColor)}>
          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&>span:first-child>span]:bg-primary"
          // style={{ '--slider-track-color': currentTheme.accent } as React.CSSProperties}
        />
        {/* Placeholder for other controls like Fullscreen, Queue, etc. */}
         <Button variant={currentTheme.buttonVariant} size="icon" onClick={() => console.log("Toggle Fullscreen Player")}  className={cn(currentTheme.buttonIconColor)}>
            <Maximize2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MusicPlayerBar;