import React, { useState } from "react";
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

function PyramidChart() {
  // Pyramid data: grows toward the middle for a “peak”
  const pyramidData = [
    { name: 1, value: 2 },
    { name: 2, value: 5 },
    { name: 3, value: 10 },
    { name: 4, value: 20 },
    { name: 5, value: 35 },
    { name: 6, value: 50 },
    { name: 7, value: 65 },
    { name: 8, value: 80 },
    { name: 9, value: 100 },
    { name: 10, value: 80 },
    { name: 11, value: 65 },
    { name: 12, value: 50 },
    { name: 13, value: 35 },
    { name: 14, value: 20 },
    { name: 15, value: 10 },
    { name: 16, value: 5 },
    { name: 17, value: 2 },
  ];

  // Flat data: all bars have the same height
  const flatData = Array.from({ length: 17 }, (_, i) => ({
    name: i + 1,
    value: 20,
  }));

  // Four sections with headings and descriptions
  const sections = [
    {
      label: "99.999%",
      description: "Section 1 details go here.",
    },
    {
      label: "75%",
      description: "Section 2 details go here.",
    },
    {
      label: "350%",
      description: "Section 3 details go here.",
    },
    {
      label: "$1M",
      description: "Estimated savings from improved efficiency",
    },
  ];

  // Track which section is hovered (-1 if none)
  const [hoveredSection, setHoveredSection] = useState(-1);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0E1B2A", // dark background
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "40px",
      }}
    >
      {sections.map((section, idx) => (
        <div
          key={section.label}
          style={{
            width: "200px",
            position: "relative",
            textAlign: "center",
            color: "#fff",
          }}
          onMouseEnter={() => setHoveredSection(idx)}
          onMouseLeave={() => setHoveredSection(-1)}
        >
          {/* Heading */}
          <h2 style={{ marginBottom: "10px", fontSize: "1rem" }}>
            {section.label}
          </h2>

          {/* Description: only visible if hovered */}
          <p
            style={{
              position: "absolute",
              top: "40px",
              left: 0,
              right: 0,
              margin: "0 auto",
              fontSize: "0.75rem",
              color: "#ccc",
              opacity: hoveredSection === idx ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          >
            {section.description}
          </p>

          {/* Chart */}
          <div style={{ width: "100%", height: "200px" }}>
            <ResponsiveContainer>
              <BarChart
                data={hoveredSection === idx ? pyramidData : flatData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#222",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" fill="url(#whiteGradient)" animationDuration={300} />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="whiteGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PyramidChart;
