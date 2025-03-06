import { useEffect } from "react";

const JDoodleEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <div
        data-pym-src="https://www.jdoodle.com/embed/v1/6cb9ff2931124a17?hideheader=1&hidefooter=1"
        style={{ flex: 1 }}
      />
    </div>
  );
};

export default JDoodleEmbed; 