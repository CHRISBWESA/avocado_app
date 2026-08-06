import { motion } from 'framer-motion';
import { Menu, X, Leaf } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Stages', href: '#stages' },
    { label: 'Demo', href: '#demo' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#9CCC65] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] transition-shadow duration-300">
            <Leaf className="w-6 h-6 text-[#0a0f0d]" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-gradient">Avocado</span>
            <span className="text-[#9CCC65]">AI</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#c8e6c9] hover:text-[#4CAF50] transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#4CAF50] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#demo"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-[#0a0f0d] font-semibold text-sm hover:shadow-[0_0_25px_rgba(76,175,80,0.4)] transition-all duration-300"
          >
            Try It Free
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#e8f5e9] p-2"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-strong border-t border-[rgba(76,175,80,0.1)]"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[#c8e6c9] hover:text-[#4CAF50] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-[#0a0f0d] font-semibold text-sm text-center"
            >
              Try It Free
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}