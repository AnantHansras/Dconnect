import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        
        <div>
          <h3 className="font-semibold text-base mb-2 border-b-2 border-[#4A90E2] inline-block pb-1">DConnect</h3>
          <ul className="space-y-2 mt-2">
            <li>&copy; {new Date().getFullYear()} DConnect</li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#terms" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2 border-b-2 border-[#4A90E2] inline-block pb-1">Support</h3>
          <ul className="space-y-2 mt-2">
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
            <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            <li><a href="mailto:contact@dconnect.com" className="hover:underline">Email Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2 border-b-2 border-[#4A90E2] inline-block pb-1">Resources</h3>
          <ul className="space-y-2 mt-2">
            <li><a href="#docs" className="hover:underline">Documentation</a></li>
            <li><a href="#api" className="hover:underline">API Reference</a></li>
            <li><a href="#community" className="hover:underline">Community</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-2 border-b-2 border-[#4A90E2] inline-block pb-1">Follow Us</h3>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-[#4A90E2] hover:scale-110"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#4A90E2] hover:scale-110"><FaTwitter /></a>
            <a href="#" className="hover:text-[#4A90E2] hover:scale-110"><FaInstagram /></a>
            <a href="#" className="hover:text-[#4A90E2] hover:scale-110"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
