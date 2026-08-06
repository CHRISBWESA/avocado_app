import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Home Cook',
    text: 'This app changed how I buy avocados! No more guessing — I get perfect ones every time.',
    rating: 5,
  },
  {
    name: 'James R.',
    role: 'Chef & Restaurateur',
    text: 'We use Avocado AI in our kitchen daily. The accuracy is incredible and saves us so much waste.',
    rating: 5,
  },
  {
    name: 'Emily L.',
    role: 'Health Coach',
    text: 'My clients love the recommendations. It helps them eat at the perfect ripeness for maximum nutrition.',
    rating: 5,
  },
];

export default function Testimonials() {
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
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-gradient">Loved by Thousands</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-8 relative"
            >
              <Quote className="w-8 h-8 text-[#4CAF50] opacity-30 mb-4" />
              <p className="text-[#c8e6c9] leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <div key={j} className="w-4 h-4 rounded-full bg-[#4CAF50]" />
                ))}
              </div>
              <div className="font-semibold text-[#e8f5e9]">{t.name}</div>
              <div className="text-sm text-[#81c784]">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}