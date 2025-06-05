import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import ThemedContentCard from '@/components/ThemedContentCard';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import InteractiveTrackRow from '@/components/InteractiveTrackRow';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SearchIcon } from 'lucide-react';

const initialSearchTracks = [
  { id: 'st1', title: 'Yume wo Kanaete Doraemon', artist: 'Mao', album: 'Doraemon TV Soundtrack', duration: '4:05', albumArtUrl: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=Track1&font=sans', isPlaying: false, isLiked: false },
  { id: 'st2', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', album: 'Classic Doraemon', duration: '2:50', albumArtUrl: 'https://placehold.co/100x100/FBBF24/000000?text=Track2&font=sans', isPlaying: false, isLiked: true },
  { id: 'st3', title: 'Doraemon Ekaki Uta', artist: 'Young Fresh', album: 'Doraemon Songs', duration: '1:55', albumArtUrl: 'https://placehold.co/100x100/10B981/FFFFFF?text=Track3&font=sans', isPlaying: false, isLiked: false },
];

const initialSearchArtists = [
  { id: 'sa1', title: 'Doraemon Singers', description: 'All your favorite theme artists.', imageUrl: 'https://placehold.co/300x200/3B82F6/FFFFFF?text=Doraemon+Singers&font=sans', theme: 'doraemon' },
  { id: 'sa2', title: 'Mao', description: 'Singer of "Yume wo Kanaete Doraemon"', imageUrl: 'https://placehold.co/300x200/FBBF24/000000?text=Mao&font=sans' },
];

const initialSearchAlbums = [
   { id: 'sal1', title: 'Doraemon Movie Themes', description: 'Soundtracks from the movies.', imageUrl: 'https://placehold.co/300x200/EC4899/FFFFFF?text=Movie+Themes&font=sans', theme: 'default'},
];

const defaultPlayerTrack = {
  id: 'playerSearch',
  title: 'Ready to Discover?',
  artist: 'Search Master',
  albumArtUrl: 'https://placehold.co/100x100/7C3AED/FFFFFF?text=Search&font=sans',
  audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  console.log('SearchPage loaded');

  const handlePlayTrack = (trackId: string) => {
    console.log(`Play track on SearchPage: ${trackId}`);
    setPlayingTrackId(trackId);
    // Here you would typically update a global state for the MusicPlayerBar
  };
  const handlePauseTrack = (trackId: string) => {
    console.log(`Pause track on SearchPage: ${trackId}`);
    setPlayingTrackId(null);
  };
  const handleLikeTrack = (trackId: string) => console.log(`Like track: ${trackId}`);
  const handleAddToQueue = (trackId: string) => console.log(`Add to queue: ${trackId}`);
  const handleOptions = (trackId: string, event: React.MouseEvent) => console.log(`Options for track: ${trackId}`, event.currentTarget);

  // Filtered results (basic example)
  const filteredTracks = initialSearchTracks.filter(track => 
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    track.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredArtists = initialSearchArtists.filter(artist => 
    artist.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
   const filteredAlbums = initialSearchAlbums.filter(album => 
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-background">
      <NavigationMenu />
      <main className="ml-60 pt-6 pb-28 px-6 flex flex-col">
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for songs, artists, albums..."
            className="pl-10 w-full md:w-1/2 lg:w-1/3 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="songs" className="flex-grow flex flex-col">
          <TabsList className="mb-4 self-start">
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            {/* <TabsTrigger value="playlists">Playlists</TabsTrigger> */}
          </TabsList>
          <ScrollArea className="flex-grow h-[calc(100vh-theme(spacing.6)-theme(spacing.28)-theme(spacing.28))]"> {/* Approx height */}
            <TabsContent value="songs">
              {filteredTracks.length > 0 ? (
                <div className="space-y-1">
                  {filteredTracks.map((track) => (
                    <InteractiveTrackRow
                      key={track.id}
                      track={{...track, isPlaying: playingTrackId === track.id}}
                      onPlayClick={handlePlayTrack}
                      onPauseClick={handlePauseTrack}
                      onLikeClick={handleLikeTrack}
                      onAddToQueueClick={handleAddToQueue}
                      onOptionsClick={handleOptions}
                    />
                  ))}
                </div>
              ) : <p className="text-muted-foreground">No songs found for "{searchTerm}".</p>}
            </TabsContent>
            <TabsContent value="artists">
              {filteredArtists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredArtists.map((artist) => (
                    <ThemedContentCard
                      key={artist.id}
                      title={artist.title}
                      description={artist.description}
                      imageUrl={artist.imageUrl}
                      theme={(artist.theme as 'doraemon' | 'default' | undefined) || 'default'}
                      onClick={() => console.log(`View artist: ${artist.title}`)}
                    />
                  ))}
                </div>
               ) : <p className="text-muted-foreground">No artists found for "{searchTerm}".</p>}
            </TabsContent>
            <TabsContent value="albums">
                {filteredAlbums.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredAlbums.map((album) => (
                        <ThemedContentCard
                        key={album.id}
                        title={album.title}
                        description={album.description}
                        imageUrl={album.imageUrl}
                        theme={(album.theme as 'doraemon' | 'default' | undefined) || 'default'}
                        onClick={() => console.log(`View album: ${album.title}`)}
                        />
                    ))}
                    </div>
                ) : <p className="text-muted-foreground">No albums found for "{searchTerm}".</p>}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </main>
      <MusicPlayerBar theme="doraemon" initialTrack={defaultPlayerTrack} />
    </div>
  );
};

export default SearchPage;