import React, { useState, lazy, Suspense } from 'react';
import { LeadProvider } from './context/LeadContext';
import { AppShell } from './components/layout/AppShell';
import { Hero } from './components/marketing/Hero';
import { TrustStrip } from './components/marketing/TrustStrip';
import { ProblemSection } from './components/marketing/ProblemSection';
import { HowItWorks } from './components/marketing/HowItWorks';
import { ProductPreview } from './components/marketing/ProductPreview';
import { Features } from './components/marketing/Features';
import { UseCases } from './components/marketing/UseCases';
import { Pricing } from './components/marketing/Pricing';
import { FAQ } from './components/marketing/FAQ';
import { FinalCTA } from './components/marketing/FinalCTA';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';
import { Skeleton } from './components/ui/Skeleton';
import { ArrowRight } from 'lucide-react';

// Code splitting: Lazy-load dashboard to optimize initial landing page bundle
const DashboardMain = lazy(() =>
  import('./components/dashboard/DashboardMain').then((m) => ({
    default: m.DashboardMain,
  }))
);

export default function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'app'>('marketing');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const launchProductDemo = () => {
    setCurrentView('app');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSeeHowItWorks = () => {
    scrollToSection('how-it-works');
  };

  return (
    <LeadProvider>
      {currentView === 'app' ? (
        <Suspense
          fallback={
            <div className="min-h-screen bg-zinc-50 flex flex-col p-6 space-y-6 animate-pulse">
              <div className="h-14 bg-white border border-zinc-200 rounded-lg flex items-center justify-between px-6" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
              </div>
              <Skeleton className="h-96 w-full" />
            </div>
          }
        >
          <DashboardMain onExitToWebsite={() => setCurrentView('marketing')} />
        </Suspense>
      ) : (
        <AppShell
          onSignInClick={launchProductDemo}
          onGetStartedClick={launchProductDemo}
        >
          {/* 1. Hero Section */}
          <Hero
            onStartFreeClick={launchProductDemo}
            onSeeHowItWorksClick={handleSeeHowItWorks}
          />

          {/* 2. Trust Strip */}
          <TrustStrip />

          {/* 3. Problem Section */}
          <ProblemSection />

          {/* 4. How It Works */}
          <HowItWorks />

          {/* 5. Large Product Showcase */}
          <ProductPreview />

          {/* 6. Features Grid */}
          <Features />

          {/* 7. Use Cases */}
          <UseCases />

          {/* 8. Pricing Section */}
          <Pricing onPlanSelect={() => launchProductDemo()} />

          {/* 9. FAQ Section */}
          <FAQ />

          {/* 10. Final Call To Action */}
          <FinalCTA
            onStartFreeClick={launchProductDemo}
            onSeeHowItWorksClick={handleSeeHowItWorks}
          />

          {/* Sign In Placeholder Dialog */}
          <Modal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            title="FlowDesk Account Access"
            description="Phase 3 Working Product Demo"
            footer={
              <Button
                variant="primary"
                size="sm"
                onClick={launchProductDemo}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Launch Demo Workspace
              </Button>
            }
          >
            <div className="space-y-3">
              <p className="text-xs text-zinc-600 leading-relaxed">
                Welcome to the <strong>Phase 3 Working Product Demo</strong> for FlowDesk. You can test the complete lead capture, AI intent analysis, and follow-up generation workflow without creating a production account.
              </p>
              <div className="p-3 bg-zinc-50 rounded border border-zinc-200 text-xs text-zinc-700 space-y-1.5">
                <span className="font-semibold text-zinc-950 block">What you can test:</span>
                <ul className="list-disc list-inside space-y-1 text-zinc-600">
                  <li>Clicking leads and inspecting original client messages</li>
                  <li>Running AI lead analysis and intent scoring</li>
                  <li>Generating tailored follow-up messages</li>
                  <li>Editing, copying, and regenerating responses</li>
                  <li>Simulating live send and watching pipeline metrics update</li>
                </ul>
              </div>
            </div>
          </Modal>
        </AppShell>
      )}
    </LeadProvider>
  );
}
