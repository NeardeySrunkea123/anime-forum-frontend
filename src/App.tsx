import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import AnimeList from "./pages/AnimeList";
import Forum from "./pages/Forum";
import NotFound from "./pages/NotFound";
import AnimeListPage from "@/pages/AnimeList";
import AnimeDetailPage from "@/pages/AnimeDetail";
import CreateThread from "@/components/CreateThread";
import ThreadDetailPage from "@/pages/ThreadDetailPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/anime" element={<AnimeList />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/anime" element={<AnimeListPage />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
          <Route path="/threads/create" element={<CreateThread />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
