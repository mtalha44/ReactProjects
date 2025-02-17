import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

function BestChart1() {
  const count = 10; 
  const flatValue = 20; 
  const peakValue = 80; 

  const flatData = Array.from({ length: count }, (_, i) => ({
    name: i + 1,
    value: flatValue,
  }));

  const getPyramidData = (count, base, peak) => {
    const center = (count - 1) / 2;
    return Array.from({ length: count }, (_, i) => {
      const distance = Math.abs(i - center);
      const ratio = 1 - distance / center;
      const value = base + (peak - base) * ratio;
      return { name: i + 1, value };
    });
  };

  const pyramidData = getPyramidData(count, flatValue, peakValue);

  const sections = [
    { label: "99.9%", description: "Details for 99.9% go here." },
    { label: "75%", description: "Details for 75% go here." },
    { label: "350%", description: "Details for 350% go here." },
    { label: "$1M", description: "Estimated savings from improved efficiency." },
  ];

  const [hoveredSection, setHoveredSection] = useState(-1);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0E1B2A",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {sections.map((section, idx) => {
        const dataToShow = hoveredSection === idx ? pyramidData : flatData;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredSection(idx)}
            onMouseLeave={() => setHoveredSection(-1)}
            style={{
              width: "200px", // Reduce width to bring them closer
              textAlign: "center",
              color: "#fff",
              position: "relative",
              cursor: "pointer",
              marginLeft: idx !== 0 ? "-0px" : "0px", // Overlaps sections slightly
            }}
          >
            {/* Section Heading */}
            <h2 style={{ marginBottom: "10px", fontSize: "1rem" }}>
              {section.label}
            </h2>

            {/* Description (Fixed Height to Avoid Moving Charts) */}
            <div style={{ minHeight: "30px" }}>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#ccc",
                  opacity: hoveredSection === idx ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                {section.description}
              </p>
            </div>

            {/* Chart Container */}
            <div style={{ width: "100%", height: "200px" }}>
              <ResponsiveContainer>
                <BarChart data={dataToShow} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide domain={[0, peakValue + 10]} />
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




