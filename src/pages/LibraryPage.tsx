import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import ThemedContentCard from '@/components/ThemedContentCard';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import InteractiveTrackRow from '@/components/InteractiveTrackRow';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle } from 'lucide-react';

const libraryPlaylists = [
  { id: 'lp1', title: 'My Doraemon Chill Mix', description: 'Relaxing tunes from the future.', imageUrl: 'https://placehold.co/300x200/818CF8/FFFFFF?text=Chill+Mix&font=sans', theme: 'doraemon' },
  { id: 'lp2', title: 'Workout Power Hour', description: 'High-energy tracks.', imageUrl: 'https://placehold.co/300x200/F59E0B/FFFFFF?text=Workout&font=sans', theme: 'default' },
];
const libraryLikedSongs = [
  { id: 'st2', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', album: 'Classic Doraemon', duration: '2:50', albumArtUrl: 'https://placehold.co/100x100/FBBF24/000000?text=Track2&font=sans', isPlaying: false, isLiked: true },
  { id: 'st4', title: 'Happy Adventure', artist: 'The Explorers', album: 'Soundscapes', duration: '3:12', albumArtUrl: 'https://placehold.co/100x100/22C55E/FFFFFF?text=Adventure&font=sans', isPlaying: false, isLiked: true },
];
const librarySavedAlbums = [
  { id: 'sal1', title: 'Doraemon Movie Themes', description: 'Soundtracks from the movies.', imageUrl: 'https://placehold.co/300x200/EC4899/FFFFFF?text=Movie+Themes&font=sans', theme: 'default'},
  { id: 'sal2', title: 'Greatest Hits Vol. 1', description: 'By Various Artists', imageUrl: 'https://placehold.co/300x200/6366F1/FFFFFF?text=Greatest+Hits&font=sans', theme: 'default'},
];

const defaultPlayerTrack = {
  id: 'playerLibrary',
  title: 'Your Collection',
  artist: 'Curator You',
  albumArtUrl: 'https://placehold.co/100x100/A855F7/FFFFFF?text=Library&font=sans',
  audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
};

const LibraryPage = () => {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  console.log('LibraryPage loaded');

  const handlePlayTrack = (trackId: string) => {
    console.log(`Play track from Library: ${trackId}`);
    setPlayingTrackId(trackId);
  };
  const handlePauseTrack = (trackId: string) => {
    console.log(`Pause track from Library: ${trackId}`);
    setPlayingTrackId(null);
  };
  // Other handlers could be more specific to library actions
  const handleUnlikeTrack = (trackId: string) => console.log(`Unlike track: ${trackId}`);

  return (
    <div className="relative min-h-screen bg-background">
      <NavigationMenu />
      <main className="ml-60 pt-6 pb-28 px-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">My Library</h1>
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
          </Button>
        </div>

        <Tabs defaultValue="playlists" className="flex-grow flex flex-col">
          <TabsList className="mb-4 self-start">
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="songs">Liked Songs</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-grow h-[calc(100vh-theme(spacing.6)-theme(spacing.28)-theme(spacing.32))]"> {/* Adjust height */}
            <TabsContent value="playlists">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {libraryPlaylists.map((playlist) => (
                  <ThemedContentCard
                    key={playlist.id}
                    title={playlist.title}
                    description={playlist.description}
                    imageUrl={playlist.imageUrl}
                    theme={playlist.theme as 'doraemon' | 'default'}
                    onClick={() => console.log(`View playlist: ${playlist.title}`)}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-1">
                {libraryLikedSongs.map((track) => (
                  <InteractiveTrackRow
                    key={track.id}
                    track={{...track, isPlaying: playingTrackId === track.id}}
                    onPlayClick={handlePlayTrack}
                    onPauseClick={handlePauseTrack}
                    onLikeClick={handleUnlikeTrack} 
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {librarySavedAlbums.map((album) => (
                  <ThemedContentCard
                    key={album.id}
                    title={album.title}
                    description={album.description}
                    imageUrl={album.imageUrl}
                    theme={album.theme as 'doraemon' | 'default'}
                    onClick={() => console.log(`View album: ${album.title}`)}
                  />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </main>
      <MusicPlayerBar theme="doraemon" initialTrack={defaultPlayerTrack} />
    </div>
  );
};

export default LibraryPage;