import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import RevenueManagement from "./pages/RevenueManagement";
import Services from "./pages/Services";
import Openings from "./pages/Openings";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import Audit from "./pages/Audit";
import TechStack from "./pages/TechStack";

// Lazy-loaded so the marketing bundle does not carry the ad landing pages or
// the private dashboard. Each becomes its own chunk, fetched only on its route.
const RevenueManagementLP = lazy(() => import("./pages/lp/RevenueManagementLP"));
const HotelOpeningConsultantLP = lazy(() => import("./pages/lp/HotelOpeningConsultantLP"));
const BoutiqueHotelConsultingLP = lazy(() => import("./pages/lp/BoutiqueHotelConsultingLP"));
const HotelAssetManagementLP = lazy(() => import("./pages/lp/HotelAssetManagementLP"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

function RouteFallback() {
  return <div className="min-h-screen bg-background" aria-busy="true" />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/revenue-management" component={RevenueManagement} />
      <Route path="/services" component={Services} />
      <Route path="/openings" component={Openings} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/about" component={About} />
      <Route path="/insights" component={Insights} />
      <Route path="/contact" component={Contact} />
      <Route path="/audit" component={Audit} />
      <Route path="/tech-stack" component={TechStack} />
      <Route path="/lp/revenue-management">
        <Suspense fallback={<RouteFallback />}>
          <RevenueManagementLP />
        </Suspense>
      </Route>
      <Route path="/lp/hotel-opening-consultant">
        <Suspense fallback={<RouteFallback />}>
          <HotelOpeningConsultantLP />
        </Suspense>
      </Route>
      <Route path="/lp/boutique-hotel-consulting">
        <Suspense fallback={<RouteFallback />}>
          <BoutiqueHotelConsultingLP />
        </Suspense>
      </Route>
      <Route path="/lp/hotel-asset-management">
        <Suspense fallback={<RouteFallback />}>
          <HotelAssetManagementLP />
        </Suspense>
      </Route>
      {/* "/dashboard/*?" matches /dashboard and anything beneath it */}
      <Route path="/dashboard/*?">
        <Suspense fallback={<RouteFallback />}>
          <Dashboard />
        </Suspense>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
