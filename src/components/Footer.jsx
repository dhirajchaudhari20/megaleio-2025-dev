import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const facultyCoordinators = [
    { name: 'Mr. Swapnil Malipatil', phone: '+91 81473 34657' },
    { name: 'Mrs. Vishakha Rane', phone: '+91 97303 71605' },
  ];

  const studentCoordinators = [
    { name: 'Mr. Devang Vartak', phone: '+91 8080179406' },
    { name: 'Mr. Omkar Shinde', phone: '+91 9975229442' },
    { name: 'Ms. Gracy Yadav', phone: '+91 8767820269' },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.elements.name.value;
    const phone = e.target.elements.phone.value;
    const query = e.target.elements.query.value;

    // Construct payload for SheetDB (matching your Google Sheet columns)
    const payload = {
      data: {
        name,
        phone,
        query,
      },
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/o6l382zzfdp7c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Show success modal with Minecraft theme
      MySwal.fire({
        title: <p className="font-[Minecraft] text-2xl">Success!</p>,
        html: `<div class="font-[Minecraft-light] text-white">Your query has been submitted successfully!</div>`,
        icon: 'success',
        confirmButtonText: 'Cool!',
        customClass: {
          popup: 'bg-black/70 border border-[#5FFF00]/40 rounded p-4',
          title: 'text-white',
          content: 'text-white font-[Minecraft-light]',
          confirmButton: 'bg-[#5FFF00] text-black font-[Minecraft] px-4 py-2 rounded hover:bg-[#5FFF00]/80 transition-colors',
        },
        buttonsStyling: false,
      });

      e.target.reset();
    } catch (error) {
      // Show error modal with Minecraft theme
      MySwal.fire({
        title: <p className="font-[Minecraft] text-2xl">Error!</p>,
        html: `<div class="font-[Minecraft-light] text-white">There was an error submitting your form. Please try again.</div>`,
        icon: 'error',
        confirmButtonText: 'Okay',
        customClass: {
          popup: 'bg-black/70 border border-[#5FFF00]/40 rounded p-4',
          title: 'text-white',
          content: 'text-white font-[Minecraft-light]',
          confirmButton: 'bg-[#5FFF00] text-black font-[Minecraft] px-4 py-2 rounded hover:bg-[#5FFF00]/80 transition-colors',
        },
        buttonsStyling: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contactus" className="bg-black/80 text-white py-12 pt-16 mt-4 relative">
      <div className="container mx-auto px-6" data-aos="fade-up">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 1) Brand Section */}
          <div className="text-center md:text-left">
            <img 
              src="/megaleio-logo.webp" 
              alt="Megaleio Logo" 
              className="h-24 mx-auto md:mx-0 drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
            />
            <br />
            <p className="font-[Minecraft-light]">
              A National Level Intercollegiate Technical Event where innovation meets excellence
            </p>
          </div>

          {/* 2) Contact Section */}
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

          {/* 3) Social + Form Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-[Minecraft] text-[#5FFF00] mb-4">Follow Us</h3>
            
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start space-x-4">
              {/* Instagram */}
              <a 
                href="https://instagram.com/megaleio2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-[#FF00A3] via-[#FF005C] to-[#FF7A00] 
                           hover:from-[#FF1CAC] hover:via-[#FF2C6D] hover:to-[#FF8B1A] 
                           text-white p-2 rounded transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com/@megaleiosjcem6968?si=8jfVcyREsO4NPEp3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-500 text-white p-2 rounded transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.876 2.876 0 00-2.019-2.035C19.205 3.75 12 3.75 12 3.75s-7.205 0-9.479.401a2.876 2.876 0 00-2.019 2.035C0 8.459 0 12 0 12s0 3.541.502 5.814a2.876 2.876 0 002.019 2.035C4.795 20.25 12 20.25 12 20.25s7.205 0 9.479-.401a2.876 2.876 0 002.019-2.035C24 15.541 24 12 24 12s0-3.541-.502-5.814zM9.75 15.568V8.432L16 12l-6.25 3.568z" />
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.437 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.096 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.629.771-1.629 1.561V12h2.773l-.443 2.891h-2.33v6.987C18.344 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>

            {/* Form Section */}
            <form onSubmit={handleFormSubmit} className="mt-4 space-y-3 font-[Minecraft-light]">
              <div>
                <label className="block mb-1 text-sm" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 bg-black/70 text-white border border-[#5FFF00]/40 rounded focus:outline-none focus:border-[#5FFF00] placeholder-gray-400"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 bg-black/70 text-white border border-[#5FFF00]/40 rounded focus:outline-none focus:border-[#5FFF00] placeholder-gray-400"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm" htmlFor="query">
                  Your Query
                </label>
                <textarea
                  id="query"
                  name="query"
                  rows="2"
                  required
                  className="w-full px-3 py-2 bg-black/70 text-white border border-[#5FFF00]/40 rounded focus:outline-none focus:border-[#5FFF00] placeholder-gray-400"
                  placeholder="Ask us anything..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#5FFF00] text-black font-[Minecraft] px-4 py-2 rounded hover:bg-[#5FFF00]/80 transition-colors cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-black"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#5FFF00"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="#5FFF00"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 pt-8 border-t border-[#5FFF00]/30">
          <p className="text-sm text-[#5FFF00] font-[Minecraft-light]">
            © 2025 Megaleio. All rights reserved. | St. John College of Engineering and Management is the organizer of the event.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
