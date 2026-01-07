import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import EcosystemNavigation from "@/components/EcosystemNavigation";
import EnhancedIndex from "./pages/EnhancedIndex";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import EcosystemDashboard from "./pages/EcosystemDashboard";
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
import ProjectRegistration from "./pages/ProjectRegistration";
import ProjectVerification from "./pages/ProjectVerification";
import RealTimeMonitoring from "./pages/RealTimeMonitoring";
import EthicalGovernance from "./pages/EthicalGovernance";
import SmartContractIssuance from "./pages/SmartContractIssuance";
import ValueExchangeInvestment from "./pages/ValueExchangeInvestment";
import ContinuousImpactMeasurement from "./pages/ContinuousImpactMeasurement";
import PurposeGovernedDesign from "./pages/PurposeGovernedDesign";
import RegenerativeValueExchange from "./pages/RegenerativeValueExchange";
import RealityLinkedIntelligence from "./pages/RealityLinkedIntelligence";
import StoriesToSystems from "./pages/StoriesToSystems";
import RegenerativeAgriculture from "./pages/RegenerativeAgriculture";
import BlueEconomy from "./pages/BlueEconomy";
import HumanHealth from "./pages/HumanHealth";
import CircularBioeconomy from "./pages/CircularBioeconomy";
import ImpactMarketplaces from "./pages/ImpactMarketplaces";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <EcosystemNavigation />
          <Routes>
            <Route path="/" element={<EnhancedIndex />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ecosystem" element={<EcosystemDashboard />} />
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
            <Route path="/register-project" element={<ProjectRegistration />} />
            <Route path="/verify-projects" element={<ProjectVerification />} />
            <Route path="/monitoring" element={<RealTimeMonitoring />} />
            <Route path="/governance" element={<EthicalGovernance />} />
            <Route path="/contracts" element={<SmartContractIssuance />} />
            <Route path="/marketplace" element={<ValueExchangeInvestment />} />
            <Route path="/impact" element={<ContinuousImpactMeasurement />} />
            <Route path="/purpose" element={<PurposeGovernedDesign />} />
            <Route path="/exchange" element={<RegenerativeValueExchange />} />
            <Route path="/intelligence" element={<RealityLinkedIntelligence />} />
            <Route path="/knowledge" element={<StoriesToSystems />} />
            <Route path="/agriculture" element={<RegenerativeAgriculture />} />
            <Route path="/ocean" element={<BlueEconomy />} />
            <Route path="/health" element={<HumanHealth />} />
            <Route path="/circular" element={<CircularBioeconomy />} />
            <Route path="/invest" element={<ImpactMarketplaces />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
