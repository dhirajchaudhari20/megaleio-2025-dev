import { useEffect } from "react";

const JDoodleCppEmbed = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        position: "relative",
      }}
    >
      <iframe
        src="https://www.jdoodle.com/online-compiler-c++"
        style={{ width: "100vw", height: "100vh", border: "none" }}
        title="JDoodle C++ Compiler"
      ></iframe>
      <footer
        style={{
          width: "100%",
          padding: "15px 0",
          textAlign: "center",
          backgroundColor: "#212529",
          color: "#f8f9fa",
          fontSize: "14px",
          fontWeight: "bold",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        &copy; 2025 Developed & Designed by Team Megaleio
      </footer>
    </div>
  );
};

export default JDoodleCppEmbed;
