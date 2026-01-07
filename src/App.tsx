import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ErrorBoundary from "@/components/ErrorBoundary";
import EcosystemNavigation from "@/components/EcosystemNavigation";
import NewsletterFloating from "@/components/NewsletterFloating";
import EnhancedIndex from "./pages/EnhancedIndex";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import EcosystemDashboard from "./pages/EcosystemDashboard";
import HowItWorks from "./pages/HowItWorks";
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
// User Flow Components
import ComprehensiveOnboarding from "./pages/ComprehensiveOnboarding";
import ProjectRegistrationFlow from "./pages/ProjectRegistrationFlow";
import InvestmentFlow from "./pages/InvestmentFlow";
import PractitionerDashboardFlow from "./pages/PractitionerDashboardFlow";
import InvestorDashboardFlow from "./pages/InvestorDashboardFlow";
// Enhanced Features
import AdvancedAnalytics from "./pages/AdvancedAnalytics";
import CarbonMarketplace from "./pages/CarbonMarketplace";
import APIMarketplace from "./pages/APIMarketplace";
import SystemMonitoring from "./pages/SystemMonitoring";
import NewsletterAdmin from "./pages/NewsletterAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Landing & Auth Routes */}
              <Route path="/" element={<EnhancedIndex />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* User Flow Routes */}
              <Route path="/onboarding" element={<ComprehensiveOnboarding />} />
              <Route path="/register-project-flow" element={<ProjectRegistrationFlow />} />
              <Route path="/investment-flow" element={<InvestmentFlow />} />
              <Route path="/practitioner-flow" element={<PractitionerDashboardFlow />} />
              <Route path="/investor-flow" element={<InvestorDashboardFlow />} />
              
              {/* Enhanced Features */}
              <Route path="/analytics" element={<AdvancedAnalytics />} />
              <Route path="/carbon-marketplace" element={<CarbonMarketplace />} />
              <Route path="/api-marketplace" element={<APIMarketplace />} />
              <Route path="/system-monitoring" element={<SystemMonitoring />} />
              <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
              
              {/* Main Application Routes */}
              <Route path="/dashboard" element={<><EcosystemNavigation /><div className="md:ml-80"><Dashboard /></div></>} />
              <Route path="/ecosystem" element={<EcosystemDashboard />} />
              <Route path="/how-it-works" element={<><EcosystemNavigation /><div className="md:ml-80"><HowItWorks /></div></>} />
              <Route path="/admin" element={<><EcosystemNavigation /><div className="md:ml-80"><AdminPanel /></div></>} />
              <Route path="/business-model" element={<><EcosystemNavigation /><div className="md:ml-80"><BusinessModel /></div></>} />
              <Route path="/pricing" element={<><EcosystemNavigation /><div className="md:ml-80"><SubscriptionPlans /></div></>} />
              <Route path="/enterprise" element={<><EcosystemNavigation /><div className="md:ml-80"><StakeholderSelector /></div></>} />
              <Route path="/practitioner" element={<><EcosystemNavigation /><div className="md:ml-80"><PractitionerDashboard /></div></>} />
              <Route path="/investor" element={<><EcosystemNavigation /><div className="md:ml-80"><InvestorDashboard /></div></>} />
              <Route path="/government" element={<><EcosystemNavigation /><div className="md:ml-80"><GovernmentDashboard /></div></>} />
              <Route path="/builder" element={<><EcosystemNavigation /><div className="md:ml-80"><BuilderDashboard /></div></>} />
              <Route path="/register-project" element={<><EcosystemNavigation /><div className="md:ml-80"><ProjectRegistration /></div></>} />
              <Route path="/verify-projects" element={<><EcosystemNavigation /><div className="md:ml-80"><ProjectVerification /></div></>} />
              <Route path="/monitoring" element={<><EcosystemNavigation /><div className="md:ml-80"><RealTimeMonitoring /></div></>} />
              <Route path="/governance" element={<><EcosystemNavigation /><div className="md:ml-80"><EthicalGovernance /></div></>} />
              <Route path="/contracts" element={<><EcosystemNavigation /><div className="md:ml-80"><SmartContractIssuance /></div></>} />
              <Route path="/marketplace" element={<><EcosystemNavigation /><div className="md:ml-80"><ValueExchangeInvestment /></div></>} />
              <Route path="/impact" element={<><EcosystemNavigation /><div className="md:ml-80"><ContinuousImpactMeasurement /></div></>} />
              <Route path="/purpose" element={<><EcosystemNavigation /><div className="md:ml-80"><PurposeGovernedDesign /></div></>} />
              <Route path="/exchange" element={<><EcosystemNavigation /><div className="md:ml-80"><RegenerativeValueExchange /></div></>} />
              <Route path="/intelligence" element={<><EcosystemNavigation /><div className="md:ml-80"><RealityLinkedIntelligence /></div></>} />
              <Route path="/knowledge" element={<><EcosystemNavigation /><div className="md:ml-80"><StoriesToSystems /></div></>} />
              <Route path="/agriculture" element={<RegenerativeAgriculture />} />
              <Route path="/ocean" element={<><EcosystemNavigation /><div className="md:ml-80"><BlueEconomy /></div></>} />
              <Route path="/health" element={<><EcosystemNavigation /><div className="md:ml-80"><HumanHealth /></div></>} />
              <Route path="/circular" element={<><EcosystemNavigation /><div className="md:ml-80"><CircularBioeconomy /></div></>} />
              <Route path="/invest" element={<ImpactMarketplaces />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <NewsletterFloating />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
