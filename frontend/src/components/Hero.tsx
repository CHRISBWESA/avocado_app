import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4CAF50] rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#9CCC65] rounded-full blur-[100px] opacity-8" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Zap className="w-4 h-4 text-[#4CAF50]" />
          <span className="text-sm font-medium text-[#c8e6c9]">
            AI-Powered Ripeness Detection
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
        >
          <span className="text-gradient">Know Your</span>
          <br />
          <span className="text-[#e8f5e9]">Avocado</span>{' '}
          <span className="text-gradient">Instantly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-xl text-[#a5d6a7] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Upload a photo and our AI analyzes ripeness, freshness, and quality
          in seconds — powered by cutting-edge computer vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#demo"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-[#0a0f0d] font-bold text-lg hover:shadow-[0_0_40px_rgba(76,175,80,0.5)] transition-all duration-300 flex items-center gap-2"
          >
            Start Analyzing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-4 rounded-full glass text-[#c8e6c9] font-semibold text-lg hover:border-[#4CAF50] transition-all duration-300"
          >
            See How It Works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {[
            { icon: Shield, text: 'Privacy First', sub: 'No data stored' },
            { icon: Zap, text: 'Under 2 Seconds', sub: 'Instant results' },
            { text: '99.2% Accuracy', sub: 'Proven model' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.icon && (
                <item.icon className="w-5 h-5 text-[#4CAF50]" />
              )}
              <div className="text-left">
                <div className="font-semibold text-[#e8f5e9] text-sm">
                  {item.text}
                </div>
                <div className="text-xs text-[#81c784]">{item.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#4CAF50] flex justify-center pt-2">
          <div className="w-1 h-3 bg-[#4CAF50] rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}