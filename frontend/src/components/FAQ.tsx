import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: 'How accurate is the ripeness detection?',
    a: 'Our AI model achieves 99.2% accuracy in controlled tests, trained on thousands of avocado samples across multiple varieties.',
  },
  {
    q: 'Is my photo data stored or shared?',
    a: 'No. Your images are processed in real-time and never stored on our servers. We do not share any data with third parties.',
  },
  {
    q: 'Which avocado varieties does it support?',
    a: 'It supports Hass, Fuerte, Bacon, Reed, Pinkerton, and most common commercial varieties.',
  },
  {
    q: 'Can I use it on my phone?',
    a: 'Absolutely! Our PWA works on any device — mobile, tablet, or desktop. Just open the URL in your browser.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes! The core ripeness detection is completely free with no limits on usage.',
  },
  {
    q: 'How fast are the results?',
    a: 'Results are delivered in under 2 seconds on average, depending on your internet connection.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#4CAF50] font-semibold text-sm tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-gradient">Common Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-[#e8f5e9] pr-4">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(76,175,80,0.15)] flex items-center justify-center text-[#4CAF50]">
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[#a5d6a7] text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}