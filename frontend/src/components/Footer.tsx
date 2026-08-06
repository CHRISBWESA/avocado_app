import { motion } from 'framer-motion';
import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const links = {
    Product: ['Features', 'How It Works', 'Pricing', 'API'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Support', 'Status', 'Changelog'],
  };

  return (
    <footer className="border-t border-[rgba(76,175,80,0.1)] bg-[#0d1a14]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#9CCC65] flex items-center justify-center">
                <Leaf className="w-6 h-6 text-[#0a0f0d]" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gradient">Avocado</span>
                <span className="text-[#9CCC65]">AI</span>
              </span>
            </a>
            <p className="text-[#81c784] text-sm leading-relaxed max-w-sm">
              AI-powered ripeness detection for the modern world. Fast, accurate, and privacy-first.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Mail, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#81c784] hover:text-[#4CAF50] hover:border-[rgba(76,175,80,0.4)] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items], i) => (
            <div key={i}>
              <h4 className="font-semibold text-[#e8f5e9] mb-4 text-sm">
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-[#81c784] text-sm hover:text-[#4CAF50] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(76,175,80,0.1)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#81c784] text-sm">
            © 2026 Avocado Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#81c784] text-sm hover:text-[#4CAF50] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#81c784] text-sm hover:text-[#4CAF50] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}