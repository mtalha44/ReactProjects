import React, { useState } from "react";
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

const initialData = [
  { name: 1, value: 2 },
  { name: 2, value: 3 },
  { name: 3, value: 5 },
  { name: 4, value: 8 },
  { name: 5, value: 12 },
  { name: 6, value: 15 },
  { name: 7, value: 20 },
  { name: 8, value: 30 },
  { name: 9, value: 40 },
  { name: 10, value: 50 },
  { name: 11, value: 60 },
  { name: 12, value: 70 },
  { name: 13, value: 80 },
  { name: 14, value: 90 },
  { name: 15, value: 100 },
  { name: 16, value: 95 },
  { name: 17, value: 85 },
  { name: 18, value: 75 },
  { name: 19, value: 60 },
  { name: 20, value: 45 },
  { name: 21, value: 30 },
  { name: 22, value: 20 },
  { name: 23, value: 10 },
  { name: 24, value: 5 },
  { name: 25, value: 2 },
];

function InteractivePerformanceChart() {
  const [hoverIndex, setHoverIndex] = useState(null);

  // Make the hovered bar taller
  const chartData = initialData.map((entry, i) =>
    i === hoverIndex ? { ...entry, value: entry.value + 20 } : entry
  );

  // Inline styling to mimic the layout in your image
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "600px",
    padding: "20px",
    backgroundColor: "#0E1B2A", // Dark background
    color: "#fff",
  };

  const topRightStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    textAlign: "right",
  };

  const bottomLeftStyle = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    fontWeight: "bold",
  };

  const bottomCenterStyle = {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    fontWeight: "bold",
  };

  const bottomRightStyle = {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      {/* Top-right label: $1M + description */}
      <div style={topRightStyle}>
        <h2 style={{ fontSize: "24px", margin: 0 }}>$1M</h2>
        <p style={{ fontSize: "14px", color: "#ccc", margin: 0 }}>
          Estimated savings from improved efficiency
        </p>
      </div>

      {/* Bottom labels (99.999%, 75%, 350%) */}
      <div style={bottomLeftStyle}>99.999%</div>
      <div style={bottomCenterStyle}>75%</div>
      <div style={bottomRightStyle}>350%</div>

      {/* The bar chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 60, right: 40, left: 40, bottom: 60 }}
          barCategoryGap={0} // Make bars tightly packed
        >
          {/* Hide axes & rely on custom labels */}
          <XAxis dataKey="name" hide />
          <YAxis hide domain={[0, 120]} />
          {/* Tooltip on hover */}
          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              backgroundColor: "#222",
              border: "none",
              color: "#fff",
            }}
          />
          {/* Bars with gradient fill */}
          <Bar
            dataKey="value"
            fill="url(#whiteGradient)"
            onMouseEnter={(_, index) => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            animationDuration={300}
          />
          <defs>
            <linearGradient id="whiteGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InteractivePerformanceChart;
