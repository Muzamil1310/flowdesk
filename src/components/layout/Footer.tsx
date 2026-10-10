import React from 'react';
import { Logo } from '../brand/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-zinc-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-zinc-100">
          {/* Brand info (2 cols on md) */}
          <div className="sm:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed">
              AI-powered lead follow-up platform for small businesses. Turn every inbound inquiry into a prompt, personalized conversation.
            </p>
            <div className="p-3 bg-zinc-50 rounded-md border border-zinc-200/80 max-w-sm text-xs text-zinc-500">
              FlowDesk is a fictional product concept created as a portfolio demonstration.
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <a href="#product" className="hover:text-zinc-950 transition-colors">Product Overview</a>
              </li>
              <li>
                <a href="#features" className="hover:text-zinc-950 transition-colors">Features</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-zinc-950 transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-zinc-950 transition-colors">How It Works</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <a href="#product" className="hover:text-zinc-950 transition-colors">About</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-zinc-950 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Legal */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-xs text-zinc-600">
                <li>
                  <a href="#faq" className="hover:text-zinc-950 transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-zinc-950 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-xs text-zinc-600">
                <li>
                  <span className="text-zinc-500 hover:text-zinc-800 cursor-pointer">Privacy</span>
                </li>
                <li>
                  <span className="text-zinc-500 hover:text-zinc-800 cursor-pointer">Terms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} FlowDesk. Built with production-grade B2B SaaS standards.</p>
          <p className="text-zinc-400">Turn every lead into a follow-up. Automatically.</p>
        </div>
      </div>
    </footer>
  );
};
