import React from "react";

const vizSizeTest = {
  position: "relative",
//   width: 1200,
//   height: 800,
    width: 750,
    height:400,
  overflow: "hidden",
  display: "block",
};

export default function TableauComponent() {
  
  return (
    <div
      className="tableauPlaceholder"
      id="viz1644897011400"
      style={{ position: "relative", width: 800, height: 800 }}
    >
      <object className="tableauViz" style={vizSizeTest}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param
          name="name"
          value="4to_Dashboard_David_Natareno&#47;Dashboard1"
        />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="es-ES" />
      </object>
    </div>
  );
}
