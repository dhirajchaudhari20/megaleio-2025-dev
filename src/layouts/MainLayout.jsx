import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Particles from "../components/Effects/Particles";
import AudioToggle from "../components/Effects/AudioToggle";
import FloatingEventTiles from "../components/Effects/FloatingEventTiles";
import Custom3DCursor from "../components/Effects/Custom3DCursor";
import Preloader from "../components/Effects/Preloader";
import bgVideo from "../assets/stranger-things-clouds.mp4";

const MainLayout = () => {

  return (
    <>
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover opacity-50 blur-[0.5px]"
          style={{ filter: "brightness(0.5) contrast(1.1) saturate(0.7)" }}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
      </div>
      <Custom3DCursor />
      <Particles />
      <Navbar />
      <Outlet />
      <AudioToggle />
      <FloatingEventTiles />
      <Preloader />
    </>
  );
};

export default MainLayout;
