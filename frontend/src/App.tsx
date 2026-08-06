import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import MaturityStages from './components/MaturityStages';
import LiveDemo from './components/LiveDemo';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8f5e9]">
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <MaturityStages />
      <LiveDemo />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;