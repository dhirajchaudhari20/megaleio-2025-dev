import { useState } from "react";
import { motion } from "framer-motion";

const JDoodleEditor = () => {
  const [editorUrl, setEditorUrl] = useState("");

  const openEditor = (language) => {
    if (language === "c") {
      setEditorUrl("https://www.jdoodle.com/c-online-compiler");
    } else if (language === "cpp") {
      setEditorUrl("https://www.jdoodle.com/online-compiler-c++");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://i.pinimg.com/originals/be/fc/2f/befc2f780b5b1ca9a8fee1d0548aa084.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        fontFamily: "Minecraft, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#00ff00",
            textShadow: "2px 2px 5px black",
          }}
        >
          Blind C
        </span>
        <motion.button
          onClick={() => openEditor("c")}
          whileHover={{ scale: 1.1 }}
          style={{
            padding: "12px 25px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "3px solid #2E7D32",
            borderRadius: "10px",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.3)",
            fontFamily: "Minecraft, sans-serif",
          }}
        >
          Open C Editor
        </motion.button>
        <motion.button
          onClick={() => openEditor("cpp")}
          whileHover={{ scale: 1.1 }}
          style={{
            padding: "12px 25px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "3px solid #1565C0",
            borderRadius: "10px",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.3)",
            fontFamily: "Minecraft, sans-serif",
          }}
        >
          Open C++ Editor
        </motion.button>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#ffcc00",
            textShadow: "2px 2px 5px black",
          }}
        >
          Code Relay
        </span>
      </div>

      {editorUrl && (
        <iframe
          src={editorUrl}
          style={{
            width: "95vw",
            height: "75vh",
            border: "5px solid #333",
            marginTop: "20px",
            borderRadius: "10px",
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
          }}
          title="SJCEM Editor By Dhiraj"
        ></iframe>
      )}

      <footer
        style={{
          width: "100%",
          padding: "15px 0",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#f8f9fa",
          fontSize: "14px",
          fontWeight: "bold",
          position: "fixed",
          bottom: 0,
          left: 0,
        }}
      >
        &copy; 2025 Developed & Designed by Team Megalio
      </footer>
    </div>
  );
};

export default JDoodleEditor;
