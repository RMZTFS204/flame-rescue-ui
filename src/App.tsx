
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import LevelSelect from "./pages/LevelSelect";
import GameScreen from "./pages/GameScreen";
import HomePage from "./pages/magic-meet/HomePage";
import CharacterSchedule from "./pages/magic-meet/CharacterSchedule";
import ItineraryBuilder from "./pages/magic-meet/ItineraryBuilder";
import MapView from "./pages/magic-meet/MapView";
import FavoritesList from "./pages/magic-meet/FavoritesList";
import SuccessScreen from "./pages/magic-meet/SuccessScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/level-select" element={<LevelSelect />} />
          <Route path="/game/:levelId" element={<GameScreen />} />
          
          {/* MyMagicMeet Routes */}
          <Route path="/magic-meet" element={<HomePage />} />
          <Route path="/magic-meet/character/:id" element={<CharacterSchedule />} />
          <Route path="/magic-meet/itinerary" element={<ItineraryBuilder />} />
          <Route path="/magic-meet/map" element={<MapView />} />
          <Route path="/magic-meet/favorites" element={<FavoritesList />} />
          <Route path="/magic-meet/success" element={<SuccessScreen />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
