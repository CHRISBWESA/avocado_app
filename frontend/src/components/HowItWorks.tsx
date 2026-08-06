import { motion } from 'framer-motion';
import { Camera, Scan, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    number: '01',
    title: 'Upload Photo',
    desc: 'Take or upload a clear photo of your avocado from any angle.',
  },
  {
    icon: Scan,
    number: '02',
    title: 'AI Analysis',
    desc: 'Our deep learning model scans color, texture, and shape indicators in real-time.',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Get Results',
    desc: 'Receive a detailed ripeness score, freshness rating, and usage recommendations.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
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
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-gradient">Three Simple Steps</span>
          </h2>
          <p className="text-[#a5d6a7] max-w-xl mx-auto">
            From photo to prediction in seconds — no expertise required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-[#4CAF50] to-transparent opacity-30" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#103B2F] to-[#1a5c3f] border border-[rgba(76,175,80,0.3)] flex items-center justify-center glow-green-subtle">
                <step.icon className="w-9 h-9 text-[#4CAF50]" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 md:hidden">
                <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-[#0a0f0d] font-bold text-sm flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <span className="hidden md:block text-6xl font-bold text-[rgba(76,175,80,0.15)] mb-4">
                {step.number}
              </span>
              <h3 className="text-xl font-bold mb-3 text-[#e8f5e9]">
                {step.title}
              </h3>
              <p className="text-[#a5d6a7] text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}