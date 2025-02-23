import React from 'react';

const sponsors = {
  title: [
    {
      id: 1,
      name: "Title Sponsor 1",
      img: "/INT_Logo.webp",
      link: "#"
    }
  ],
//   platinum: [
//     {
//       id: 1,
//       name: "Platinum Sponsor 1",
//       img: "https://via.placeholder.com/300x150",
//       link: "#"
//     },
//     {
//       id: 2,
//       name: "Platinum Sponsor 2",
//       img: "https://via.placeholder.com/300x150",
//       link: "#"
//     }
//   ],
//   gold: [
//     {
//       id: 1,
//       name: "Gold Sponsor 1",
//       img: "https://via.placeholder.com/250x100",
//       link: "#"
//     },
//     {
//       id: 2,
//       name: "Gold Sponsor 2",
//       img: "https://via.placeholder.com/250x100",
//       link: "#"
//     }
//   ]
};

const SponsorTier = ({ title, sponsors, boxSize = "w-72 h-60" }) => (
  <div className="w-full my-12 flex flex-col items-center">
    <div className="relative mb-8 flex justify-center">
      <h3 className="text-2xl md:text-3xl font-[Minecraft] text-[#39ff14]
                     px-8 py-3 border-4 border-[#39ff14] 
                     bg-black/70 backdrop-blur-sm
                     shadow-[0_0_10px_#39ff14] 
                     flex items-center justify-center min-h-[60px]
                     after:content-[''] after:absolute after:inset-0
                     after:border-4 after:border-[#39ff14]/30 after:-m-2
                     hover:shadow-[0_0_20px_#39ff14] transition-all duration-300">
        <span className="block text-center">{title}</span>
      </h3>
    </div>
    <div className="flex flex-wrap justify-center gap-8 mt-4 w-full">
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.id}
          href={sponsor.link}
          className={`${boxSize} group relative 
                     border-4 border-[#39ff14] 
                     bg-black/70 backdrop-blur-sm
                     transition-all duration-300
                     hover:scale-105 hover:shadow-[0_0_15px_#39ff14]
                     flex items-center justify-center
                     p-8 md:p-12
                     after:content-[''] after:absolute after:inset-0
                     after:border-4 after:border-[#39ff14]/30 after:-m-2
                     hover:after:border-[#39ff14]/50
                     before:content-[''] before:absolute before:inset-0
                     before:border-2 before:border-[#39ff14]/20 before:-m-1`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={sponsor.img}
              alt={sponsor.name}
              className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain
                         transition-transform duration-300
                         group-hover:scale-105
                         group-hover:filter group-hover:brightness-110"
            />
          </div>
        </a>
      ))}
    </div>
  </div>
);

const Sponsors = () => {
  return (
    <div className="w-screen min-h-screen bg-[#262423] bg-opacity-95 
                    bg-[url('/minecraft-pattern.png')] bg-repeat bg-[length:100px_100px]
                    flex justify-center py-24">
      <div className="w-[90%] max-w-7xl">
        <div className="flex justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[Minecraft] text-[#39ff14]
                         px-12 py-6 border-4 border-[#39ff14] 
                         bg-black/70 backdrop-blur-sm
                         shadow-[0_0_20px_#39ff14]
                         relative flex items-center justify-center min-h-[80px]
                         after:content-[''] after:absolute after:inset-0
                         after:border-4 after:border-[#39ff14]/30 after:-m-2">
            <span className="block text-center">Our Sponsors</span>
          </h2>
        </div>
        
        <SponsorTier 
          title="Title Sponsors" 
          sponsors={sponsors.title}
          boxSize="w-[500px] h-[300px] md:w-[600px] md:h-[400px]"
        />
        
        {/* <SponsorTier 
          title="Platinum Sponsors" 
          sponsors={sponsors.platinum}
          boxSize="w-80 h-40"
        />
        
        <SponsorTier 
          title="Gold Sponsors" 
          sponsors={sponsors.gold}
          boxSize="w-72 h-36"
        /> */}
      </div>
    </div>
  );
};

export default Sponsors;
