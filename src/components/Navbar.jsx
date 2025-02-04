import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const navItems = [
    { name: 'About Us', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Megahack', href: '#megahack' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/megaleio-logo.webp" alt="Megaleio" className="h-14 w-auto" />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className="text-white hover:text-[#5FFF00] font-[Minecraft] text-base uppercase tracking-wider transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <img src="/megaleio-logo.webp" alt="Megaleio" className="h-12 w-auto" />
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

        {/* Mobile Menu */}
        <div
          className={`absolute top-full right-0 w-64 bg-black/80 backdrop-blur-lg p-4 rounded-l-lg transition-transform duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className="text-white hover:text-[#5FFF00] font-[Minecraft] text-base uppercase tracking-wider transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
