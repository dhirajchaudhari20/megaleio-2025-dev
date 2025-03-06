import { useState } from "react";

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
        backgroundImage: "url('https://i.pinimg.com/originals/be/fc/2f/befc2f780b5b1ca9a8fee1d0548aa084.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => openEditor("c")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Open C Editor
        </button>
        <button
          onClick={() => openEditor("cpp")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Open C++ Editor
        </button>
      </div>

      {editorUrl && (
        <iframe
          src={editorUrl}
          style={{ width: "100vw", height: "80vh", border: "none", marginTop: "20px" }}
          title="JDoodle Editor"
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
