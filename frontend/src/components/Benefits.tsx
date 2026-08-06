import { motion } from 'framer-motion';
import { Leaf, Clock, DollarSign, Zap, Shield, Star } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Reduce Waste',
    desc: 'Know exactly when your avocados are ready to eat, so nothing goes to waste.',
  },
  {
    icon: Clock,
    title: 'Save Time',
    desc: 'No more guessing or squeezing — get instant, reliable results.',
  },
  {
    icon: DollarSign,
    title: 'Buy Smarter',
    desc: 'Choose the perfect avocado at the store and know exactly when it will be ready.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Results in under 2 seconds. No waiting, no complicated setup.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your photos are never stored. All processing happens in real-time.',
  },
  {
    icon: Star,
    title: 'Proven Accuracy',
    desc: '99.2% accuracy rate backed by thousands of real-world tests.',
  },
];

export default function Benefits() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#4CAF50] font-semibold text-sm tracking-widest uppercase">
            Benefits
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-gradient">Why Choose Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 glass rounded-2xl p-6 hover:border-[rgba(76,175,80,0.4)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#103B2F] flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#e8f5e9]">
                  {benefit.title}
                </h3>
                <p className="text-[#a5d6a7] text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}