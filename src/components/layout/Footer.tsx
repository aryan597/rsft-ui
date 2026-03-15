import { Link } from 'react-router-dom';
import { SocialLinks } from './SocialLinks';
import { FooterLinks } from './FooterLinks';
import { Copyright } from './Copyright';

export default function Footer() {
  return (
    <footer className="border-t-4 border-black dark:border-white bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="space-y-4 md:col-span-1">
            <Link to="/rsft-ui/" className="flex items-center space-x-2">
              <img src='./logo.svg' alt="Re-Sift" className="h-10" />
            </Link>
            <p className="font-mono text-sm">
              AI agents that help recruiters find, evaluate, and hire the best candidates faster.
            </p>
          </div>
          
          <FooterLinks
            title="PRODUCT"
            links={[
              { href: '/rsft-ui/features', text: 'Features' },
              { href: '/rsft-ui/pricing', text: 'Pricing' },
              { href: '/rsft-ui/roadmap', text: 'Roadmap' }
            ]}
          />
          
          <FooterLinks
            title="COMPANY"
            links={[
              { href: '/rsft-ui/company', text: 'Company' },
              { href: '/rsft-ui/about', text: 'About' },
              { href: '/rsft-ui/blog', text: 'Blog' },
              { href: '/rsft-ui/careers', text: 'Careers' }
            ]}
          />

          <FooterLinks
            title="LEGAL"
            links={[
              { href: '/rsft-ui/privacy', text: 'Privacy Policy' },
              { href: '/rsft-ui/terms', text: 'Terms of Service' },
              { href: '/rsft-ui/cookies', text: 'Cookie Policy' }
            ]}
          />
          
          <div>
            <h3 className="font-mono font-bold mb-4">CONNECT</h3>
            <SocialLinks />
          </div>
        </div>
        
        <Copyright />
      </div>
    </footer>
  );
}