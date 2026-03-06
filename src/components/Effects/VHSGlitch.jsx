import React from "react";

const VHSGlitch = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9996] overflow-hidden opacity-[0.03]">
            <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes flicker {
          0% { opacity: 0.1; }
          50% { opacity: 0.2; }
          100% { opacity: 0.1; }
        }
        .vhs-scanline {
          animation: scanline 8s linear infinite;
        }
        .vhs-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>

            {/* 📺 Horizontal Scanline */}
            <div className="vhs-scanline absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {/* 📺 Grain / Static Effect */}
            <div className="vhs-flicker absolute inset-0 bg-[url('https://res.cloudinary.com/dgy8v9vpx/image/upload/v1741270845/noise_p0xk9n.png')] bg-repeat" />
        </div>
    );
};

export default VHSGlitch;
