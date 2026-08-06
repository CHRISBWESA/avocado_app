import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 md:p-16 text-center border-glow glow-green"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#9CCC65] flex items-center justify-center"
          >
            <Zap className="w-8 h-8 text-[#0a0f0d]" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Ready to Get Started?</span>
          </h2>
          <p className="text-[#a5d6a7] text-lg mb-8 max-w-lg mx-auto">
            Join thousands of users who trust Avocado AI for instant, accurate ripeness detection.
          </p>

          <motion.a
            href="#demo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-[#0a0f0d] font-bold text-lg hover:shadow-[0_0_40px_rgba(76,175,80,0.5)] transition-all duration-300"
          >
            Start Analyzing Free
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          <p className="text-[#81c784] text-sm mt-6">
            No account needed. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}