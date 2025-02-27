import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: "Mr. Devang Vartak",
    designation: "President",
    description:
      "The President aims to host a groundbreaking tech event that highlights the latest trends, fosters connections, and sparks innovation. It will be an inclusive space for diverse voices to exchange ideas and drive industry progress.",
    content: "right",
    media: "left",
    img: "/Devang.webp"
  },
  {
    id: 2,
    name: "Mr. Omkar Shinde",
    designation: "Vice-President",
    description:
      "The Vice President envisions a dynamic tech event that encourages innovation, collaboration, and knowledge-sharing. Through engaging talks, workshops, and networking, it will inspire the next wave of advancements in the industry.",
    content: "left",
    media: "right",
    img: "https://via.placeholder.com/600x400?text=OS"
  },
  {
    id: 3,
    name: "Ms. Gracy Yadav",
    designation: "Secretary",
    description:
      "The General Secretary envisions a meticulously organized technical event that operates seamlessly behind the scenes, ensuring a smooth experience for participants. Their vision includes efficient coordination, clear communication, and a focus on logistical details to enhance the overall effectiveness of the event.",
    content: "right",
    media: "left",
    img: "/Gracy.webp"
  },
  {
    id: 4,
    name: "Mr. Aayush Bari",
    designation: "Vice-Secretary",
    description:
      "The Vice General Secretary aims to support the General Secretary's vision for a seamless technical event. They focus on logistical coordination, improving communication, and implementing innovative solutions to enhance participant experience.",
    content: "left",
    media: "right",
    img: "/Aayush.webp"
  },
  {
    id: 5,
    name: "Mr. Dev Sarkar",
    designation: "Treasurer",
    description:
      "The Treasurer envisions a financially sound technical event, ensuring prudent budgeting, transparent financial transactions, and responsible resource allocation. Their goal is to maintain fiscal integrity, enabling the event to thrive and meet its objectives.",
    content: "right",
    media: "left",
    img: "https://via.placeholder.com/600x400?text=DS"
  },
  {
    id: 6,
    name: "Mr. Leon Makasare",
    designation: "Advisor",
    description:
      "The Advisor aims to guide the technical event towards academic excellence, innovation, and industry relevance. They provide strategic insights, mentorship, and foster connections with thought leaders to ensure the event remains a hub for cutting-edge knowledge.",
    content: "left",
    media: "right",
    img: "/kkk.jpg"
  }
];

const TeamCards = () => {
  return (
    <div className="w-screen min-h-screen bg-[#1d1d1d] flex justify-center">
      <div className="w-[90%] h-[full+100px] max-w-7xl py-24">
        <h1 className="text-center py-10 text-4xl text-[#39ff14] font-[Minecraft] sticky top-18 z-0 bg-[#1d1d1d]">
          Megaleio Team
        </h1>
        <ul className="list-none p-0">
          {teamMembers.map((member) => (
            <li 
              key={member.id} 
              className="w-full md:h-[400px] sticky" // Remove fixed height on mobile
              style={{ 
                top: '180px',
                marginTop: `${member.id * 1.5}rem`
              }}
            >
              <div className="w-full h-full bg-black/40 backdrop-blur-lg border-4 border-[#39ff14] rounded-[50px] overflow-hidden transition-transform duration-500 md:hover:scale-105">
                <div className="flex flex-col h-full">
                  {/* Image Section - Always on top for mobile */}
                  <div className="w-full md:hidden h-[300px] flex items-center justify-center p-4">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="h-full object-contain rounded-3xl"
                    />
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex flex-row h-full">
                    {member.content === "right" ? (
                      <>
                        <div className="w-1/2 h-full flex items-center justify-center p-4">
                          <img 
                            src={member.img} 
                            alt={member.name} 
                            className="h-full object-contain rounded-3xl"
                          />
                        </div>
                        <div className="w-1/2 p-8 flex flex-col justify-center">
                          <h3 className="text-2xl md:text-4xl font-[Minecraft] text-white mb-2">
                            {member.name}
                          </h3>
                          <p className="text-lg md:text-xl font-[Minecraft] text-white/90 mb-2">
                            {member.designation}
                          </p>
                          <p className="text-sm md:text-base font-[Minecraft-light] text-white/80 text-justify">
                            {member.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2 p-8 flex flex-col justify-center">
                          <h3 className="text-2xl md:text-4xl font-[Minecraft] text-white mb-2">
                            {member.name}
                          </h3>
                          <p className="text-lg md:text-xl font-[Minecraft] text-white/90 mb-2">
                            {member.designation}
                          </p>
                          <p className="text-sm md:text-base font-[Minecraft-light] text-white/80 text-justify">
                            {member.description}
                          </p>
                        </div>
                        <div className="w-1/2 h-full flex items-center justify-center p-4">
                          <img 
                            src={member.img} 
                            alt={member.name} 
                            className="h-full object-contain rounded-3xl"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile Text Section - Always below image */}
                  <div className="md:hidden p-6 h-72">
                    <h3 className="text-2xl font-[Minecraft] text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg font-[Minecraft] text-white/90 mb-2">
                      {member.designation}
                    </p>
                    <p className="text-sm font-[Minecraft-light] text-white/80">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamCards;
