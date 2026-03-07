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
  <div className="w-full my-12 flex flex-col items-center" data-aos="fade-up">
    <div className="flex flex-wrap justify-center gap-8 mt-4 w-full">
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.id}
          href={sponsor.link}
          data-aos="fade-up"
          className={`${boxSize} group relative 
                      border-4 border-[#dc143c]/60 
                      bg-black/60 backdrop-blur-md
                      transition-all duration-300
                      hover:scale-105 hover:shadow-[0_0_25px_rgba(220,20,60,0.4)]
                      flex items-center justify-center
                      p-8 md:p-12
                      after:content-[''] after:absolute after:inset-0
                      after:border-4 after:border-[#dc143c]/20 after:-m-2
                      hover:after:border-[#dc143c]/40
                      before:content-[''] before:absolute before:inset-0
                      before:border-2 before:border-[#dc143c]/10 before:-m-1`}
        >
          {/* Background overlay for each sponsor */}
          <div className="absolute inset-0 z-[-1] bg-black/40 opacity-50"></div>
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
    <div className="w-screen min-h-screen bg-transparent 
                    flex justify-center py-24 perspective-section">
      <div className="w-[90%] max-w-7xl">
        <div className="flex justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-['Cinzel'] text-[#dc143c]
                         px-12 py-6 border-4 border-[#dc143c]/80 
                         bg-black/80 backdrop-blur-md
                         shadow-[0_0_30px_rgba(220,20,60,0.3)]
                         relative flex items-center justify-center min-h-[80px]
                         after:content-[''] after:absolute after:inset-0
                         after:border-4 after:border-[#dc143c]/30 after:-m-2">
            <span className="block text-center tracking-widest">Title Sponsor</span>
          </h2>
        </div>

        <SponsorTier
          sponsors={sponsors.title}
          boxSize="w-[500px] h-[300px] md:w-[600px] md:h-[400px]"
        />
        <div className="flex justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-['Cinzel'] text-[#dc143c]
                         px-12 py-6 border-4 border-[#dc143c]/80 
                         bg-black/80 backdrop-blur-md
                         shadow-[0_0_30px_rgba(220,20,60,0.3)]
                         relative flex items-center justify-center min-h-[80px]
                         after:content-[''] after:absolute after:inset-0
                         after:border-4 after:border-[#dc143c]/30 after:-m-2">
            <span className="block text-center tracking-widest">Powered By</span>
          </h2>
        </div>
        <SponsorTier
          sponsors={sponsors.platinum}
          boxSize="w-[400px] h-[200px] md:w-[500px] md:h-[250px]"
        />

        <div className="flex justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-['Cinzel'] text-[#dc143c]
                         px-12 py-6 border-4 border-[#dc143c]/80 
                         bg-black/80 backdrop-blur-md
                         shadow-[0_0_30px_rgba(220,20,60,0.3)]
                         relative flex items-center justify-center min-h-[80px]
                         after:content-[''] after:absolute after:inset-0
                         after:border-4 after:border-[#dc143c]/30 after:-m-2">
            <span className="block text-center tracking-widest">Sponsors</span>
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
