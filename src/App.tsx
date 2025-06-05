import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // shadcn/ui uses 'sonner' for its non-default toaster
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import new pages
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import PlaylistAlbumDetailPage from "./pages/PlaylistAlbumDetailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          {/* Using :id for dynamic segment, e.g., /collection/doraemon-hits or /collection/album-123 */}
          <Route path="/collection/:id" element={<PlaylistAlbumDetailPage />} /> 
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
      <Toaster /> {/* For shadcn/ui default toast */}
      <Sonner /> {/* For shadcn/ui sonner (another toast style) */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;