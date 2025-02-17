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
           
            <img 
              src="/megaleio-logo.webp" 
              alt="Megaleio Logo" 
              className="h-24 mx-auto md:mx-0 drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
            />
            <br></br>
            <p>A National Level Intercollegiate Technical Event where innovation meets excellence</p>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-[Minecraft] text-[#5FFF00] mb-4">Contact Us</h3>
            <div className="space-y-3 font-[Minecraft-light] text-base">
              <p className="text-lg font-semibold text-[#5FFF00]">Faculty Coordinators</p>
              {facultyCoordinators.map((coordinator, index) => (
                <p key={index} className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[#5FFF00]">☎</span>
                  <span>{coordinator.name}:</span>
                  <a href={`tel:${coordinator.phone}`} className="hover:text-[#5FFF00] transition-colors">
                    {coordinator.phone}
                  </a>
                </p>
              ))}
              <br />
              <p className="text-lg font-semibold text-[#5FFF00]">Student Coordinators</p>
              {studentCoordinators.map((student, index) => (
                <p key={index} className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[#5FFF00]">☎</span>
                  <span>{student.name}:</span>
                  <a href={`tel:${student.phone}`} className="hover:text-[#5FFF00] transition-colors">
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
              {/* Instagram */}
              <a href="https://instagram.com/megaleio2025" target="_blank" rel="noopener noreferrer"
                 className="bg-[#5FFF00] hover:bg-[#4CD900] text-black p-2 rounded transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919..." />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com/@megaleiosjcem6968?si=8jfVcyREsO4NPEp3" target="_blank" rel="noopener noreferrer"
                 className="bg-red-600 hover:bg-red-500 text-white p-2 rounded transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.876 2.876 0 00-2.019-2.035C19.205 3.75 12 3.75 12 3.75s-7.205 0-9.479.401a2.876 2.876 0 00-2.019 2.035C0 8.459 0 12 0 12s0 3.541.502 5.814a2.876 2.876 0 002.019 2.035C4.795 20.25 12 20.25 12 20.25s7.205 0 9.479-.401a2.876 2.876 0 002.019-2.035C24 15.541 24 12 24 12s0-3.541-.502-5.814zM9.75 15.568V8.432L16 12l-6.25 3.568z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
                 className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.437 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.096 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.629.771-1.629 1.561V12h2.773l-.443 2.891h-2.33v6.987C18.344 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-[#5FFF00]/30 font-[Minecraft-light]">
          <p className="text-sm text-[#5FFF00]">
          © 2025 Megaleio. All rights reserved. | St. John's College of Engineering and Management is the organizer of the event.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
