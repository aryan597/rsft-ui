import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a href="https://github.com/h3xlabs" target='_blank' rel="noopener noreferrer" className="hover:scale-110 transition-transform">
        <Github className="w-5 h-5" />
      </a>
      <a href="https://x.com/h3xlabs_ai" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
        <Twitter className="w-5 h-5" />
      </a>
      <a href="https://www.linkedin.com/in/h3x-labs/" target='_blank' rel='noopener noreferrer' className="hover:scale-110 transition-transform">
        <Linkedin className="w-5 h-5" />
      </a>
      <a href="#" className="hover:scale-110 transition-transform">
        <Mail className="w-5 h-5" />
      </a>
    </div>
  );
}