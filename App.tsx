
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import Facilities from "./pages/Facilities";
import Equipment from "./pages/Equipment";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import HCPs from "./pages/HCPs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/hcps" element={<HCPs />} />
            <Route path="/settings" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
