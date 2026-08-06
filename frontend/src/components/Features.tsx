import { motion } from 'framer-motion';
import { Camera, Brain, Shield, Zap, TrendingUp, Globe } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Smart Image Analysis',
    desc: 'Advanced computer vision examines color, texture, and firmness indicators from a single photo.',
  },
  {
    icon: Brain,
    title: 'Deep Learning AI',
    desc: 'Trained on thousands of avocado samples to deliver 99.2% accuracy in ripeness classification.',
  },
  {
    icon: Shield,
    title: 'Privacy Protected',
    desc: 'Your images are processed in real-time and never stored on our servers or shared with third parties.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'Get your ripeness score and recommendations in under 2 seconds — no waiting, no delays.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Recommendations',
    desc: 'Receive personalized tips on storage, consumption timing, and optimal usage based on ripeness.',
  },
  {
    icon: Globe,
    title: 'Multi-Variety Support',
    desc: 'Works with Hass, Fuerte, Bacon, Reed, and other popular avocado varieties worldwide.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
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
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-gradient">Everything You Need</span>
          </h2>
          <p className="text-[#a5d6a7] max-w-xl mx-auto">
            Our AI-powered platform gives you everything needed to assess avocado quality instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass rounded-3xl p-8 hover:border-[rgba(76,175,80,0.4)] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#103B2F] flex items-center justify-center mb-6 group-hover:shadow-[0_0_25px_rgba(76,175,80,0.3)] transition-shadow duration-300">
                <feature.icon className="w-7 h-7 text-[#4CAF50]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#e8f5e9]">
                {feature.title}
              </h3>
              <p className="text-[#a5d6a7] leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}