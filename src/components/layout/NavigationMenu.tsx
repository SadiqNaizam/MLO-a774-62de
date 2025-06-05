import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Search, Library, Settings, PlayCircle } from 'lucide-react'; // Example icons

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, currentPath }) => {
  const isActive = currentPath === to || (currentPath.startsWith(to) && to !== "/");
  console.log(`NavItem: ${label}, to: ${to}, currentPath: ${currentPath}, isActive: ${isActive}`);
  return (
    <Link to={to}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          "w-full justify-start text-sm",
          isActive ? "font-semibold" : "font-normal"
        )}
      >
        <Icon className="mr-3 h-5 w-5" />
        {label}
      </Button>
    </Link>
  );
};

const NavigationMenu: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log("Rendering NavigationMenu (Sidebar), current path:", currentPath);

  const navLinks = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/library', icon: Library, label: 'Library' },
    // Example: Add more links as needed
    // { to: '/playlists/some-id', icon: PlayCircle, label: 'My Playlist' },
  ];

  return (
    <aside className="w-60 h-screen bg-background border-r p-4 flex flex-col fixed top-0 left-0 z-40">
      <div className="mb-6 px-2">
        {/* Placeholder for App Logo/Name */}
        <Link to="/" className="flex items-center space-x-2">
          <PlayCircle className="h-8 w-8 text-blue-500" />
          <span className="font-bold text-xl">MusicApp</span>
        </Link>
      </div>
      <nav className="flex-grow space-y-1">
        {navLinks.map((link) => (
          <NavItem
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            currentPath={currentPath}
          />
        ))}
      </nav>
      <div className="mt-auto space-y-1">
        {/* Settings Link */}
        <NavItem
            to="/settings"
            icon={Settings}
            label="Settings"
            currentPath={currentPath}
        />
      </div>
    </aside>
  );
};

export default NavigationMenu;