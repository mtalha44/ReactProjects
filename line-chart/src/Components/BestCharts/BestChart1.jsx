import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

function BestChart1() {
  // Configuration for our bars
  const count = 10; // number of bars
  const flatValue = 20; // flat height for all bars when not hovered
  const peakValue = 80; // maximum height for the center bar on hover

  // Generate flat data: all bars have the same height
  const flatData = Array.from({ length: count }, (_, i) => ({
    name: i + 1,
    value: flatValue,
  }));

  // Generate pyramid data from the same number of bars.
  // The center bar(s) will have higher values, and the edges will remain near the base.
  const getPyramidData = (count, base, peak) => {
    const center = (count - 1) / 2;
    return Array.from({ length: count }, (_, i) => {
      const distance = Math.abs(i - center);
      // Ratio decreases linearly from center (ratio = 1) to the edges (ratio = 0)
      const ratio = 1 - (distance / center);
      const value = base + (peak - base) * ratio;
      return { name: i + 1, value };
    });
  };

  // Pre-compute the pyramid data for our fixed count of bars
  const pyramidData = getPyramidData(count, flatValue, peakValue);

  // Four sections with labels and descriptions.
  // (You can adjust these labels and descriptions as needed.)
  const sections = [
    { label: "99.9%", description: "Details for 99.9% go here." },
    { label: "75%", description: "Details for 75% go here." },
    { label: "350%", description: "Details for 350% go here." },
    { label: "$1M", description: "Estimated savings from improved efficiency." },
  ];

  // Track which section is hovered (-1 means none)
  const [hoveredSection, setHoveredSection] = useState(-1);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0E1B2A",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {sections.map((section, idx) => {
        // Use the pyramid data only if this section is hovered; otherwise use flat data.
        const dataToShow = hoveredSection === idx ? pyramidData : flatData;

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

            {/* Description appears only when hovered */}
            {hoveredSection === idx && (
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "0.8rem",
                  color: "#ccc",
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
                  <YAxis hide domain={[0, peakValue + 10]} />
                  {/* The Bar has a fixed barSize so the width doesn’t change */}
                  <Bar
                    dataKey="value"
                    fill="url(#gradient)"
                    animationDuration={600}
                    animationEasing="ease-in-out"
                    barSize={15}
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

export default BestChart1;
