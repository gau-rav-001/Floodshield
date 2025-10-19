// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import axios from "axios";
import { useEffect } from "react";

// ✅ Create QueryClient instance
const queryClient = new QueryClient();

// ✅ Setup base URL for backend using environment variable
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ✅ Optional: Check backend connection once on load
function ConnectionCheck() {
  useEffect(() => {
    axios.get("/")
      .then(res => console.log("✅ Backend Connected:", res.data))
      .catch(err => console.warn("⚠️ Backend not reachable:", err.message));
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* ✅ Toast + Notification Components */}
      <Toaster />
      <Sonner />

      {/* ✅ Check backend connection once */}
      <ConnectionCheck />

      {/* ✅ Router Configuration */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/predict" element={<Index />} />
          {/* Catch-all route for invalid URLs */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
