import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Particles from "../components/Effects/Particles";
import AudioToggle from "../components/Effects/AudioToggle";
import FloatingEventTiles from "../components/Effects/FloatingEventTiles";

const MainLayout = () => {
  return (
    <>
      <Particles />
      <Navbar />
      <Outlet />
      <AudioToggle />
      <FloatingEventTiles />
    </>
  );
};

export default MainLayout;
