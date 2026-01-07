import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import ProjectDetail from "./pages/ProjectDetail";
import AdminPanel from "./pages/AdminPanel";
import BusinessModel from "./pages/BusinessModel";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import StakeholderSelector from "./pages/StakeholderSelector";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import BuilderDashboard from "./pages/BuilderDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/business-model" element={<BusinessModel />} />
            <Route path="/pricing" element={<SubscriptionPlans />} />
            <Route path="/enterprise" element={<StakeholderSelector />} />
            <Route path="/practitioner" element={<PractitionerDashboard />} />
            <Route path="/investor" element={<InvestorDashboard />} />
            <Route path="/government" element={<GovernmentDashboard />} />
            <Route path="/builder" element={<BuilderDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
