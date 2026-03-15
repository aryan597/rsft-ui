import React from 'react';

interface FooterLink {
  href: string;
  text: string;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
}

export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h3 className="font-mono font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="hover:underline font-mono text-sm"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}