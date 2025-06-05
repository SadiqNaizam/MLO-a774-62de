import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import ThemedContentCard from '@/components/ThemedContentCard';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button'; // For potential actions on cards

const featuredPlaylists = [
  { id: 'fp1', title: 'Doraemon\'s Pocket Hits', description: 'Gadgets and Grooves!', imageUrl: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Doraemon+Playlist&font=sans', theme: 'doraemon' },
  { id: 'fp2', title: 'Nobita\'s Study Beats', description: 'Focus music for homework.', imageUrl: 'https://placehold.co/600x400/FBBF24/000000?text=Nobita+Focus&font=sans', theme: 'default' },
  { id: 'fp3', title: 'Future Funk Fun', description: 'Upbeat tracks for a good mood.', imageUrl: 'https://placehold.co/600x400/10B981/FFFFFF?text=Future+Funk&font=sans', theme: 'default' },
];
const newReleases = [
  { id: 'nr1', title: 'Gian\'s Concert Live', description: 'A powerful performance.', imageUrl: 'https://placehold.co/600x400/EC4899/FFFFFF?text=Gian+Live&font=sans', theme: 'default' },
  { id: 'nr2', title: 'Shizuka\'s Violin Serenade', description: 'Elegant and beautiful.', imageUrl: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=Shizuka+Violin&font=sans', theme: 'default' },
];

const defaultPlayerTrack = {
  id: 'playerHome',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  albumArtUrl: 'https://placehold.co/100x100/0EA5E9/FFFFFF?text=Doraemon&font=sans',
  audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="relative min-h-screen bg-background">
      <NavigationMenu />
      <main className="ml-60 pt-6 pb-28 px-6"> {/* Adjusted padding for fixed Nav and Player */}
        <ScrollArea className="h-[calc(100vh-theme(spacing.6)-theme(spacing.28)-theme(spacing.1))]"> {/* Adjust height based on outer padding */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Featured Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredPlaylists.map((playlist) => (
                <ThemedContentCard
                  key={playlist.id}
                  title={playlist.title}
                  description={playlist.description}
                  imageUrl={playlist.imageUrl}
                  theme={playlist.theme}
                  onClick={() => console.log(`Navigate to playlist: ${playlist.title}`)}
                  footerContent={<Button variant="ghost" size="sm" className={playlist.theme === 'doraemon' ? 'text-yellow-300 hover:text-yellow-200' : ''}>Explore</Button>}
                />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">New Releases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newReleases.map((release) => (
                <ThemedContentCard
                  key={release.id}
                  title={release.title}
                  description={release.description}
                  imageUrl={release.imageUrl}
                  theme={release.theme}
                  onClick={() => console.log(`Navigate to release: ${release.title}`)}
                />
              ))}
            </div>
          </section>
          
          {/* Add more sections like 'Recently Played' or 'Recommended for you' as needed */}
        </ScrollArea>
      </main>
      <MusicPlayerBar theme="doraemon" initialTrack={defaultPlayerTrack} />
    </div>
  );
};

export default HomePage;