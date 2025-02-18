

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Schedule', href: '/schedule' },
{ name: 'Megahack', href: 'https://megahack.in', target: '_blank', rel: 'noopener noreferrer' }
    { name: 'Team', href: 'https://megahack.in' }
    { name: 'Contact Us', href: '#contactus' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo with Link */}
          <Link to="/" className="flex items-center">
            <img src="/megaleio-logo.webp" alt="Megaleio" className="h-14 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-12">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className="text-white hover:text-[#5FFF00] font-[Minecraft] text-base uppercase tracking-wider transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-white hover:text-[#5FFF00] font-[Minecraft] text-base uppercase tracking-wider transition-colors"
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/megaleio-logo.webp" alt="Megaleio" className="h-12 w-auto" />
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Full-Screen Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center z-50 transition-transform duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-white text-3xl"
            >
              ✖
            </button>

            {/* Menu Items */}
            <div className="flex flex-col space-y-6 items-center">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleNavClick}
                    className="text-white hover:text-[#5FFF00] font-[Minecraft] text-lg uppercase tracking-wider transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={handleNavClick}
                    className="text-white hover:text-[#5FFF00] font-[Minecraft] text-lg uppercase tracking-wider transition-colors"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
