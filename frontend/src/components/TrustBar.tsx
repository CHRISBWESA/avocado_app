import { motion } from 'framer-motion';

export default function TrustBar() {
  const trustItems = [
    'ISO 27001 Certified',
    'GDPR Compliant',
    'SOC 2 Type II',
    '256-bit Encryption',
    '99.9% Uptime SLA',
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-6 border-y border-[rgba(76,175,80,0.1)] bg-[#0d1a14]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm text-[#81c784]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}