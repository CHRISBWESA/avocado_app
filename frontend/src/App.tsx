import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import MaturityStages from './components/MaturityStages';
import LiveDemo from './components/LiveDemo';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8f5e9]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <MaturityStages />
      <LiveDemo />
      <Benefits />
      <FAQ />
      <CTASection />
    </div>
  );
}

export default App;