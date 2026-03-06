import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Particles from "../components/Effects/Particles";
import CustomCursor from "../components/Effects/CustomCursor";
import AudioToggle from "../components/Effects/AudioToggle";
import VHSGlitch from "../components/Effects/VHSGlitch";

const MainLayout = () => {
  return (
    <>
      <VHSGlitch />
      <CustomCursor />
      <Particles />
      <Navbar />
      <Outlet />
      <AudioToggle />
    </>
  );
};

export default MainLayout;
