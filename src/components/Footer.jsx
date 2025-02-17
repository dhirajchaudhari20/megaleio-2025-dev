import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const facultyCoordinators = [
    { name: 'Mr. Swapnil Malipatil', phone: '+91 81473 34657' },
    { name: 'Mrs. Vishakha Rane', phone: '+91 97303 71605' },
  ];

  const studentCoordinators = [
    { name: 'Mr. Devang Vartak', phone: '+91 8080179406' },
    { name: 'Mr. Omkar Shinde', phone: '+91 9975229442' },
    { name: 'Ms. Gracy Yadav', phone: '+91 8767820269' }
  ];

  return (
    <footer className="bg-black/80 text-white py-12 pt-16 mt-4 relative">
      <div className="container mx-auto px-6" data-aos="fade-up">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-[Minecraft] text-[#5FFF00] mb-4">MEGALEIO</h2>
            <img 
              src="/megaleio-logo.webp" 
              alt="Megaleio Logo" 
              className="h-24 mx-auto md:mx-0 drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
            />
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-[Minecraft] text-[#5FFF00] mb-4">Contact Us</h3>
            <div className="space-y-3 font-[Minecraft-light] text-base">
              {/* Faculty Coordinators */}
              <p className="text-lg font-semibold text-[#5FFF00]">Faculty Coordinators</p>
              {facultyCoordinators.map((coordinator, index) => (
                <p key={index} className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[#5FFF00]">☎</span>
                  <span>{coordinator.name}:</span>
                  <a href={`tel:${coordinator.phone}`} 
                     className="hover:text-[#5FFF00] transition-colors">
                    {coordinator.phone}
                  </a>
                </p>
              ))}

              {/* Line Break */}
              <br />

              {/* Student Coordinators */}
              <p className="text-lg font-semibold text-[#5FFF00]">Student Coordinators</p>
              {studentCoordinators.map((student, index) => (
                <p key={index} className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[#5FFF00]">☎</span>
                  <span>{student.name}:</span>
                  <a href={`tel:${student.phone}`} 
                     className="hover:text-[#5FFF00] transition-colors">
                    {student.phone}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-[Minecraft] text-[#5FFF00] mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://instagram.com/megaleio2025"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-[#5FFF00] hover:bg-[#4CD900] text-black p-2 rounded transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-[#5FFF00]/30 font-[Minecraft-light]">
          <p className="text-sm text-[#5FFF00]">
            © 2025 MEGALEIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
