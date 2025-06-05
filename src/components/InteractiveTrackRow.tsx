import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, Pause, MoreHorizontal, Heart, CheckCircle } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface TrackData {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  albumArtUrl?: string;
  isPlaying?: boolean; // To show pause icon if this track is the one playing
  isLiked?: boolean;
}

interface InteractiveTrackRowProps {
  track: TrackData;
  onPlayClick: (trackId: string) => void;
  onPauseClick?: (trackId: string) => void; // Optional if player handles pause globally
  onLikeClick?: (trackId: string) => void;
  onAddToQueueClick?: (trackId: string) => void;
  onOptionsClick?: (trackId: string, event: React.MouseEvent) => void; // For context menu
  className?: string;
  highlightPlaying?: boolean; // If true, highlights if track.isPlaying is true
}

const InteractiveTrackRow: React.FC<InteractiveTrackRowProps> = ({
  track,
  onPlayClick,
  onPauseClick,
  onLikeClick,
  onAddToQueueClick, // Not used in this basic example but good for future
  onOptionsClick,
  className,
  highlightPlaying = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log("Rendering InteractiveTrackRow for track:", track.title, "isPlaying:", track.isPlaying);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click if play button is clicked
    onPlayClick(track.id);
  };
  
  const handlePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPauseClick) onPauseClick(track.id);
    // Else, global player might handle pause, and onPlayClick might toggle
  };

  const handleRowClick = () => {
    // If track is already playing, clicking row might pause or do nothing.
    // If not playing, clicking row should play.
    if (track.isPlaying && onPauseClick) {
      onPauseClick(track.id);
    } else if (!track.isPlaying) {
      onPlayClick(track.id);
    }
  };

  const isCurrentlyPlaying = track.isPlaying && highlightPlaying;

  return (
    <div
      className={cn(
        "flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors group cursor-pointer",
        isCurrentlyPlaying ? "bg-muted text-primary" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleRowClick}
    >
      {/* Play/Pause button or Track Number */}
      <div className="w-10 flex items-center justify-center mr-3">
        {isCurrentlyPlaying ? (
           <button onClick={handlePause} className="text-primary">
            <Pause className="h-5 w-5" />
          </button>
        ) : isHovered ? (
          <button onClick={handlePlay}>
            <Play className="h-5 w-5" />
          </button>
        ) : (
          // Placeholder for track number if needed
          <span className="text-xs text-muted-foreground">{/* e.g., track number */}</span>
        )}
      </div>

      {/* Album Art (optional) */}
      {track.albumArtUrl && (
        <div className="w-10 h-10 mr-3 flex-shrink-0">
          <AspectRatio ratio={1} className="bg-muted rounded-sm overflow-hidden">
            <img src={track.albumArtUrl} alt={track.album || track.title} className="object-cover w-full h-full" />
          </AspectRatio>
        </div>
      )}

      {/* Title and Artist */}
      <div className="flex-grow truncate">
        <p className={cn("font-medium truncate", isCurrentlyPlaying ? "text-primary" : "text-foreground")}>{track.title}</p>
        <p className={cn("text-xs truncate", isCurrentlyPlaying ? "text-primary/80" : "text-muted-foreground")}>{track.artist}</p>
      </div>

      {/* Album (optional, shown on wider screens) */}
      {track.album && <p className="hidden md:block w-1/4 truncate text-sm text-muted-foreground mx-4">{track.album}</p>}
      
      {/* Actions: Like, More */}
      <div className="flex items-center space-x-2 ml-auto pl-2 flex-shrink-0">
        {onLikeClick && (
           <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); onLikeClick(track.id); }}
            className={cn("opacity-0 group-hover:opacity-100 focus:opacity-100", track.isLiked ? "text-primary" : "")}
            aria-label={track.isLiked ? "Unlike" : "Like"}
          >
            <Heart className={cn("h-4 w-4", track.isLiked ? "fill-current" : "")} />
          </Button>
        )}
        <span className={cn("text-sm text-muted-foreground w-10 text-right", (isHovered || isCurrentlyPlaying) ? "opacity-0 group-hover:opacity-0" : "opacity-100")}>
            {track.duration}
        </span>
        {onOptionsClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); onOptionsClick(track.id, e); }}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="More options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default InteractiveTrackRow;