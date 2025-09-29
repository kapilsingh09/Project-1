import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ReportWaste from "./pages/SubmitWaste/ReportWaste";
import Dashboard from "./pages/Dashboard/Dashboard";

import Tips from "./pages/Tips";
import About from "./pages/AboutPage/About";
import NotFound from "./Utils/NotFound";
import LoginPage from "./pages/Auth/Login";
import RegistrationPage from "./pages/Auth/RegistrationPage";
import AutoScrollTop from "./Utils/AutoScrollTop";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
            <AutoScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportWaste />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/tips" element={<Tips />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
