const sponsors = {
  title: [
    {
      id: 1,
      name: "Title Sponsor 1",
      img: "/INT_Logo.webp",
      link: "#"
    }
  ],
  platinum: [
    {
      id: 1,
      name: "Platinum Sponsor 1",
      img: "/jetking.webp",
      link: "#"
    },
    {
      id: 2,
      name: "Platinum Sponsor 2",
      img: "/Coral.webp",
      link: "#"
    }
  ],
  gold: [
    {
      id: 1,
      name: "Gold Sponsor 1",
      img: "/Datsoft.webp",
      link: "#"
    },
    {
      id: 2,
      name: "Gold Sponsor 2",
      img: "/DJFC.webp",
      link: "#"
    },
    {
      id: 3,
      name: "Gold Sponsor 3",
      img: "/aaradhna.webp",
      link: "#"
    },
    {
      id: 4,
      name: "Gold Sponsor 4",
      img: "/ABGroup.webp",
      link: "#"
    },
    {
      id: 5,
      name: "Gold Sponsor 5",
      img: "/TurningPoint.webp",
      link: "#"
    },
    {
      id: 6,
      name: "Gold Sponsor 6",
      img: "/techComputer.webp",
      link: "#"
    },
    {
      id: 7,
      name: "Gold Sponsor 7",
      img: "/ZainGlobal.webp",
      link: "#"
    },
    {
      id: 8,
      name: "Gold Sponsor 8",
      img: "/unstop.webp",
      link: "#"
    },
    {
      id: 9,
      name: "Gold Sponsor 9",
      img: "/muscle.webp",
      link: "#"
    },
    {
      id: 10,
      name: "Gold Sponsor 10",
      img: "/kea.webp",
      link: "#"
    }
  ]
};

const SponsorTier = ({ sponsors, boxSize = "w-72 h-60" }) => (
  <div className="w-full my-12 flex flex-col items-center">
    
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
              className="w-auto h-auto max-w-full max-h-full object-contain
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
            <span className="block text-center">Title Sponsor</span>
          </h2>
        </div>
        
        <SponsorTier 
          sponsors={sponsors.title}
          boxSize="w-[500px] h-[300px] md:w-[600px] md:h-[400px]"
        />
        <div className="flex justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[Minecraft] text-[#39ff14]
                         px-12 py-6 border-4 border-[#39ff14] 
                         bg-black/70 backdrop-blur-sm
                         shadow-[0_0_20px_#39ff14]
                         relative flex items-center justify-center min-h-[80px]
                         after:content-[''] after:absolute after:inset-0
                         after:border-4 after:border-[#39ff14]/30 after:-m-2">
            <span className="block text-center">Powered By</span>
          </h2>
        </div>
    	<SponsorTier 
          sponsors={sponsors.platinum}
          boxSize="w-[400px] h-[200px] md:w-[500px] md:h-[250px]"
        />
        
		<div className="flex justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-[Minecraft] text-[#39ff14]
                         px-12 py-6 border-4 border-[#39ff14] 
                         bg-black/70 backdrop-blur-sm
                         shadow-[0_0_20px_#39ff14]
                         relative flex items-center justify-center min-h-[80px]
                         after:content-[''] after:absolute after:inset-0
                         after:border-4 after:border-[#39ff14]/30 after:-m-2">
            <span className="block text-center">Sponsors</span>
          </h2>
        </div>
        <SponsorTier 
          sponsors={sponsors.gold}
          boxSize="w-[350px] h-[175px] md:w-[400px] md:h-[200px]"
        />
      </div>
    </div>
  );
};

export default Sponsors;
