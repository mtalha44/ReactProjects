import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

function PyramidChart2() {
  // Flat data: 10 bars of equal height (used when not hovered)
  const flatData = Array.from({ length: 10 }, (_, i) => ({
    name: i + 1,
    value: 20, // flat height for every bar
  }));

  // Function to generate pyramid-shaped data.
  // When hovered, the section will display fewer bars (e.g., 5) forming a pyramid.
  const getPyramidData = (count = 5, base = 20, peak = 80) => {
    const mid = Math.floor(count / 2);
    return Array.from({ length: count }, (_, i) => {
      let value;
      if (i <= mid) {
        value = base + ((peak - base) / mid) * i;
      } else {
        value = base + ((peak - base) / mid) * (count - 1 - i);
      }
      return { name: i + 1, value };
    });
  };

  // Define the four sections with their headings and descriptions.
  const sections = [
    { label: "99.9%", description: "Details for 99.9% go here." },
    { label: "75%", description: "Details for 75% go here." },
    { label: "350%", description: "Details for 350% go here." },
    { label: "$1M", description: "Estimated savings from improved efficiency." },
  ];

  // State to track which section is hovered (-1 means none)
  const [hoveredSection, setHoveredSection] = useState(-1);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0E1B2A", // Dark background
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {sections.map((section, idx) => {
        // When hovered, display pyramid data; otherwise, show flat data.
        const dataToShow =
          hoveredSection === idx ? getPyramidData() : flatData;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredSection(idx)}
            onMouseLeave={() => setHoveredSection(-1)}
            style={{
              width: "200px",
              textAlign: "center",
              color: "#fff",
              position: "relative",
              cursor: "pointer",
            }}
          >
            {/* Section Heading */}
            <h2 style={{ marginBottom: "10px", fontSize: "1rem" }}>
              {section.label}
            </h2>

            {/* Description (appears only when hovered) */}
            {hoveredSection === idx && (
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "0.8rem",
                  color: "#ccc",
                  opacity: 1,
                  transition: "opacity 0.6s",
                }}
              >
                {section.description}
              </p>
            )}

            {/* Chart Container */}
            <div style={{ width: "100%", height: "200px" }}>
              <ResponsiveContainer>
                <BarChart
                  data={dataToShow}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <XAxis dataKey="name" hide />
                  <YAxis hide domain={[0, 100]} />
                  {/* No Tooltip is rendered, so no values are shown */}
                  <Bar
                    dataKey="value"
                    fill="url(#gradient)"
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PyramidChart2;
