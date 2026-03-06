import React from "react";
import contactBg from "../../assets/display/contactus.webp";

const SpookyContactPoster = () => {
  return (
    <div className="mt-15 md:mt-25 relative min-h-screen w-full bg-black text-[#ff4a22] font-serif overflow-hidden flex flex-col items-center py-12 px-4 selection:bg-red-900 selection:text-white">
      {/* BACKGROUND PLACEHOLDER */}
      {/* Replace this div's background with your actual spooky background image URL */}
      <div
        className="absolute inset-0 z-0 opacity-60 bg-gradient-to-b from-[#3a0000] via-[#0a0000] to-black"
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-8xl tracking-[0.1em] font-bold mb-8 uppercase"
            style={{
              WebkitTextStroke: "2px #ff1111",
              color: "transparent",
              textShadow:
                "0 0 20px rgba(255, 0, 0, 0.9), 0 0 40px rgba(255, 0, 0, 0.5)",
            }}
          >
            Contact Us
          </h1>
          <h2 className="text-[17px] md:text-2xl font-bold tracking-wider text-[#ff5733] drop-shadow-[0_2px_4px_rgba(255,0,0,0.8)]">
            GET IN TOUCH WITH OUR TEAM
          </h2>
        </div>


        {/* FACULTY COORDINATOR SECTION */}
        <div className="w-full max-w-xl flex flex-col items-center mb-12 border-t border-red-900/50 pt-8">
          <h3 className="text-xl md:text-2xl font-bold tracking-widest text-[#ff5733] mb-6 drop-shadow-[0_2px_4px_rgba(255,0,0,0.8)]">
            FACULTY COORDINATOR -
          </h3>
          <div className="w-full flex flex-col gap-3 text-lg md:text-xl font-semibold">
            <div className="flex justify-between items-center w-full px-8 md:px-16">
              <span className="text-[#ff5733]">Swapnil Malipatil</span>
              <span className="text-[#ff7a55]">8147334657</span>
            </div>
            <div className="flex justify-between items-center w-full px-8 md:px-16">
              <span className="text-[#ff5733]">Vishakha Rane</span>
              <span className="text-[#ff7a55]">9730371605</span>
            </div>
          </div>
        </div>

        {/* TEAM MEMBERS LIST */}
        <div className="w-full max-w-xl flex flex-col gap-4 text-base sm:text-lg md:text-xl leading-tight font-semibold mb-12 px-2 sm:px-4 items-center justify-center mb-12 border-t border-red-900/50 pt-8">
          <TeamRow name="Dev Sarkar" role="President" phone="+917028455752" />
          <TeamRow
            name="Gracy Yadav"
            role="Vice President"
            phone="+918767820269"
          />
          <TeamRow
            name="Meghana Kamath"
            role="Secretary"
            phone="+919168397791"
          />
          <TeamRow
            name="Sharvil Patil"
            role="Joint Secretary"
            phone="+917058721858"
          />
          <TeamRow
            name="Devank Mahtre"
            role="Treasurer"
            phone="+917248916210"
          />
          <TeamRow name="Harshita Gharat" role="Advisor" phone="919867707542" />
        </div>
        {/* MAP & ADDRESS SECTION */}
        <div className="w-full max-w-2xl relative bg-[#31221a] p-2 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.8)] border-2 border-[#543021] mb-8">
          {/* MAP IMAGE PLACEHOLDER */}
          <div className="w-full h-64 md:h-80 rounded-sm overflow-hidden relative">

            <iframe
              src="https://www.google.com/maps?q=19.7060402,72.7835079&z=16&output=embed"
              className="w-full h-full border-0 object-cover opacity-100 "
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>

          {/* ADDRESS TEXT (On the parchment texture) */}
          <div className="p-4 bg-[#6c4831] text-[#ffd6b0] text-sm md:text-base leading-relaxed font-medium mt-1">
            <p className="font-bold text-lg mb-1 text-[#ffebd6]">
              St. John College colege of Engineering and Management,
            </p>
            <p>Palghar-Manor Rd, near Shakti Udyog, Industrial Area, Vevoor,</p>
            <p>Palghar, Maharashtra 401404</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the team list rows
const TeamRow = ({ name, role, phone }) => (
  <div className="flex justify-between items-end w-full px-2 md:px-8 border-b border-red-950/30 pb-1">
    <div>
      <span className="text-[#ff5733] font-bold drop-shadow-md">{name}</span>
      <span className="text-[#b43d22] text-sm ml-2">/ {role}</span>
    </div>
    <span className="text-[#ff7a55] font-bold tracking-wider">{phone}</span>
  </div>
);

export default SpookyContactPoster;
