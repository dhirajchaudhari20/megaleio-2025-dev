import { useEffect } from "react";

const JDoodleEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", overflowY: "auto", scrollBehavior: "smooth", paddingTop: "60px" }}>
      <div
        data-pym-src="https://www.jdoodle.com/embed/v1/6cb9ff2931124a17"
        style={{ flex: 1 }}
      ></div>
    </div>
  );
};

export default JDoodleEmbed;
