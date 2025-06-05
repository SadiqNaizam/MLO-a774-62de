import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // To potentially use collectionId
import NavigationMenu from '@/components/layout/NavigationMenu';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import InteractiveTrackRow from '@/components/InteractiveTrackRow';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlayCircle, ListMusic } from 'lucide-react';

const collectionTracks = [
  { id: 'ct1', title: 'Opening Theme (Movie Edit)', artist: 'Doraemon Movie Band', album: 'Doraemon The Movie OST', duration: '3:30', albumArtUrl: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=TM1&font=sans', isPlaying: false, isLiked: false },
  { id: 'ct2', title: 'Adventure Awaits', artist: 'Doraemon Movie Band', album: 'Doraemon The Movie OST', duration: '4:15', albumArtUrl: 'https://placehold.co/100x100/FBBF24/000000?text=TM2&font=sans', isPlaying: false, isLiked: true },
  { id: 'ct3', title: 'Friendship Power Theme', artist: 'Doraemon Movie Band', album: 'Doraemon The Movie OST', duration: '3:50', albumArtUrl: 'https://placehold.co/100x100/10B981/FFFFFF?text=TM3&font=sans', isPlaying: false, isLiked: false },
  { id: 'ct4', title: 'Gadget March', artist: 'Doraemon Movie Band', album: 'Doraemon The Movie OST', duration: '2:55', albumArtUrl: 'https://placehold.co/100x100/EC4899/FFFFFF?text=TM4&font=sans', isPlaying: false, isLiked: false },
  { id: 'ct5', title: 'Time Machine Journey', artist: 'Doraemon Movie Band', album: 'Doraemon The Movie OST', duration: '5:00', albumArtUrl: 'https://placehold.co/100x100/8B5CF6/FFFFFF?text=TM5&font=sans', isPlaying: false, isLiked: true },
];

const defaultPlayerTrack = {
  id: 'playerDetail',
  title: 'Doraemon The Movie OST',
  artist: 'Doraemon Movie Band',
  albumArtUrl: 'https://placehold.co/100x100/EF4444/FFFFFF?text=OST&font=sans',
  audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
};

const PlaylistAlbumDetailPage = () => {
  const { id: collectionId } = useParams(); // Example: /collection/doraemon-movie-ost
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  console.log(`PlaylistAlbumDetailPage loaded for ID: ${collectionId}`);

  // Mock data for the collection header
  const collectionDetails = {
    title: collectionId ? `Collection: ${collectionId.replace(/-/g, ' ')}` : 'Doraemon The Movie OST',
    creator: 'Doraemon Movie Productions',
    description: 'Epic scores from the beloved Doraemon adventures. Perfect for any fan!',
    artworkUrl: 'https://placehold.co/400x400/3B82F6/FFFFFF?text=Doraemon+Movie+OST&font=sans',
    type: 'Album' // Or 'Playlist'
  };

  const handlePlayTrack = (trackId: string) => {
    console.log(`Play track from DetailPage: ${trackId}`);
    setPlayingTrackId(trackId);
  };
  const handlePauseTrack = (trackId: string) => {
    console.log(`Pause track from DetailPage: ${trackId}`);
    setPlayingTrackId(null);
  };
  const handlePlayAll = () => {
    if (collectionTracks.length > 0) {
        handlePlayTrack(collectionTracks[0].id);
        console.log("Playing all tracks starting with the first one.");
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <NavigationMenu />
      <main className="ml-60 pt-6 pb-28 px-6">
        <ScrollArea className="h-[calc(100vh-theme(spacing.6)-theme(spacing.28)-theme(spacing.1))]">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8 p-6 bg-gradient-to-b from-blue-500/30 to-background rounded-lg shadow-lg">
            <div className="w-48 h-48 md:w-60 md:h-60 flex-shrink-0 rounded-md overflow-hidden shadow-2xl">
              <AspectRatio ratio={1}>
                <img src={collectionDetails.artworkUrl} alt={collectionDetails.title} className="object-cover w-full h-full" />
              </AspectRatio>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-1">{collectionDetails.type}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{collectionDetails.title}</h1>
              <p className="text-muted-foreground text-sm mb-1">{collectionDetails.creator}</p>
              <p className="text-muted-foreground text-sm mb-4 max-w-prose">{collectionDetails.description}</p>
              <Button size="lg" onClick={handlePlayAll} className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold">
                <PlayCircle className="mr-2 h-6 w-6" /> Play All
              </Button>
            </div>
          </div>

          {/* Track List Section */}
          <div className="space-y-1">
            {collectionTracks.map((track, index) => (
              <InteractiveTrackRow
                key={track.id}
                track={{...track, isPlaying: playingTrackId === track.id}}
                onPlayClick={handlePlayTrack}
                onPauseClick={handlePauseTrack}
                // Other handlers as needed
              />
            ))}
          </div>
        </ScrollArea>
      </main>
      <MusicPlayerBar theme="doraemon" initialTrack={playingTrackId ? collectionTracks.find(t => t.id === playingTrackId) || defaultPlayerTrack : defaultPlayerTrack} />
    </div>
  );
};

export default PlaylistAlbumDetailPage;