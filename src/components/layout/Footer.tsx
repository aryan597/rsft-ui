import { SocialLinks } from './SocialLinks';
import { FooterLinks } from './FooterLinks';
import { Copyright } from './Copyright';
// import { ReactComponent as RIcon } from '../../../R.svg'

export default function Footer() {
  return (
    <footer className="border-t-4 border-black dark:border-white bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <img src='./logo.svg'/>
            </div>
            <p className="font-mono text-sm">
              AI agents that help recruiters find, evaluate, and hire the best candidates faster.
            </p>
          </div>
          
          <FooterLinks
            title="PRODUCT"
            links={[
              { href: '#features', text: 'Features' },
              { href: '#pricing', text: 'Pricing' },
              { href: '#roadmap', text: 'Roadmap' }
            ]}
          />
          
          <FooterLinks
            title="COMPANY"
            links={[
              { href: '#about', text: 'About' },
              { href: '#blog', text: 'Blog' },
              { href: '#careers', text: 'Careers' }
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